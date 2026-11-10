import { createHash } from "crypto";

export const IMAGE_LIMITS = {
  MAX_IMAGES_PER_TURN: 3,
  MAX_IMAGE_BYTES: 8 * 1024 * 1024, // 8 MiB
  MAX_TURN_TOTAL_BYTES: 20 * 1024 * 1024, // 20 MiB
  MAX_IMAGE_PIXELS: 30_000_000, // 30 million pixels
  MIN_DIMENSION_PX: 24,
  MAX_DIMENSION_PX: 12_000,
} as const;

export type SupportedImageMime = "image/jpeg" | "image/png" | "image/webp";

export type ImageInspectionResult =
  | {
      valid: true;
      detectedMime: SupportedImageMime;
      width: number;
      height: number;
      pixelCount: number;
      sizeBytes: number;
      normalizedBuffer: Buffer;
      sha256: string;
      exifStripped: boolean;
      orientation: number;
      qualityHint: "ok" | "low_resolution" | "extreme_aspect";
    }
  | {
      valid: false;
      errorCode:
        | "EMPTY_FILE"
        | "FILE_TOO_LARGE"
        | "UNSUPPORTED_FORMAT"
        | "SPOOFED_DISALLOWED_FILE"
        | "ANIMATED_IMAGE_NOT_SUPPORTED"
        | "CORRUPTED_IMAGE"
        | "PIXEL_LIMIT_EXCEEDED"
        | "IMAGE_TOO_SMALL";
      userMessageVi: string;
      userMessageEn: string;
    };

function detectDisallowedSignature(buf: Buffer): { code: string; label: string } | null {
  if (buf.length >= 2 && buf[0] === 0x4d && buf[1] === 0x5a) {
    return { code: "EXE", label: "tệp thực thi (.exe/.dll)" };
  }
  if (buf.length >= 4 && buf[0] === 0x50 && buf[1] === 0x4b && buf[2] === 0x03 && buf[3] === 0x04) {
    return { code: "ZIP_OFFICE", label: "tệp nén ZIP hoặc tài liệu Office (.docx/.xlsx/.pptx)" };
  }
  if (buf.length >= 5 && buf.subarray(0, 5).toString("ascii") === "%PDF-") {
    return { code: "PDF", label: "tài liệu PDF" };
  }
  if (buf.length >= 6) {
    const gifHeader = buf.subarray(0, 6).toString("ascii");
    if (gifHeader === "GIF87a" || gifHeader === "GIF89a") {
      return { code: "GIF", label: "ảnh GIF" };
    }
  }
  if (buf.length >= 12 && buf.subarray(4, 8).toString("ascii") === "ftyp") {
    const brand = buf.subarray(8, 12).toString("ascii").toLowerCase();
    if (brand.startsWith("hei") || brand.startsWith("mif") || brand.startsWith("avi")) {
      return { code: "HEIC_AVIF", label: "định dạng HEIC/AVIF" };
    }
  }
  const headText = buf.subarray(0, Math.min(buf.length, 256)).toString("utf8").trimStart().toLowerCase();
  if (headText.startsWith("<svg") || (headText.startsWith("<?xml") && headText.includes("<svg"))) {
    return { code: "SVG", label: "ảnh vector SVG" };
  }
  return null;
}

function readExifOrientationFromApp1(app1Payload: Buffer): number {
  try {
    if (app1Payload.length < 14) return 1;
    if (app1Payload.subarray(0, 6).toString("ascii") !== "Exif\0\0") return 1;
    const tiff = app1Payload.subarray(6);
    const endian = tiff.subarray(0, 2).toString("ascii");
    const isLE = endian === "II";
    if (!isLE && endian !== "MM") return 1;
    const readU16 = (off: number) => (isLE ? tiff.readUInt16LE(off) : tiff.readUInt16BE(off));
    const readU32 = (off: number) => (isLE ? tiff.readUInt32LE(off) : tiff.readUInt32BE(off));
    if (readU16(2) !== 0x002a) return 1;
    const ifdOffset = readU32(4);
    if (ifdOffset + 2 > tiff.length) return 1;
    const entries = readU16(ifdOffset);
    for (let i = 0; i < entries; i++) {
      const entryOffset = ifdOffset + 2 + i * 12;
      if (entryOffset + 12 > tiff.length) break;
      const tag = readU16(entryOffset);
      if (tag === 0x0112) {
        const val = readU16(entryOffset + 8);
        if (val >= 1 && val <= 8) return val;
      }
    }
  } catch {
    return 1;
  }
  return 1;
}

function parseAndCleanJpeg(buf: Buffer): {
  ok: boolean;
  width?: number;
  height?: number;
  cleaned?: Buffer;
  orientation?: number;
  exifStripped?: boolean;
} {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8 || buf[2] !== 0xff) {
    return { ok: false };
  }

  const keptChunks: Buffer[] = [Buffer.from([0xff, 0xd8])];
  let offset = 2;
  let width = 0;
  let height = 0;
  let orientation = 1;
  let strippedAny = false;
  let foundSosOrEoi = false;

  const sofMarkers = new Set([
    0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
  ]);
  const stripMarkers = new Set([0xe1, 0xe2, 0xec, 0xed, 0xef, 0xfe]); // APP1(EXIF/XMP), APP2, APP12, APP13(IPTC), APP15, COM

  while (offset < buf.length) {
    if (buf[offset] !== 0xff) {
      return { ok: false };
    }
    while (offset < buf.length && buf[offset] === 0xff) {
      offset++;
    }
    if (offset >= buf.length) break;

    const marker = buf[offset];
    offset++;

    if (marker === 0xd9) {
      // EOI
      keptChunks.push(Buffer.from([0xff, 0xd9]));
      foundSosOrEoi = true;
      break;
    }

    if (marker === 0x00 || (marker >= 0xd0 && marker <= 0xd8)) {
      keptChunks.push(Buffer.from([0xff, marker]));
      continue;
    }

    if (offset + 2 > buf.length) {
      return { ok: false };
    }
    const segLen = buf.readUInt16BE(offset);
    if (segLen < 2 || offset + segLen > buf.length) {
      return { ok: false };
    }

    if (sofMarkers.has(marker)) {
      if (segLen < 7) return { ok: false };
      height = buf.readUInt16BE(offset + 3);
      width = buf.readUInt16BE(offset + 5);
    }

    if (marker === 0xe1) {
      const payload = buf.subarray(offset + 2, offset + segLen);
      const detectedOrientation = readExifOrientationFromApp1(payload);
      if (detectedOrientation !== 1) orientation = detectedOrientation;
    }

    if (marker === 0xda) {
      // SOS: rest of image scan data up to end
      keptChunks.push(Buffer.from([0xff, marker]));
      keptChunks.push(buf.subarray(offset));
      foundSosOrEoi = true;
      break;
    }

    if (stripMarkers.has(marker)) {
      strippedAny = true;
    } else {
      keptChunks.push(Buffer.from([0xff, marker]));
      keptChunks.push(buf.subarray(offset, offset + segLen));
    }

    offset += segLen;
  }

  if (!foundSosOrEoi || width <= 0 || height <= 0) {
    return { ok: false };
  }

  return {
    ok: true,
    width,
    height,
    cleaned: Buffer.concat(keptChunks),
    orientation,
    exifStripped: strippedAny,
  };
}

function parseAndCleanPng(buf: Buffer): {
  ok: boolean;
  animated?: boolean;
  width?: number;
  height?: number;
  cleaned?: Buffer;
  exifStripped?: boolean;
} {
  const pngSig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (buf.length < 33 || !buf.subarray(0, 8).equals(pngSig)) {
    return { ok: false };
  }

  const keptChunks: Buffer[] = [pngSig];
  let offset = 8;
  let width = 0;
  let height = 0;
  let sawIhdr = false;
  let sawIdat = false;
  let sawIend = false;
  let strippedAny = false;

  const stripChunkTypes = new Set(["eXIf", "tEXt", "zTXt", "iTXt", "tIME"]);

  while (offset + 8 <= buf.length) {
    const length = buf.readUInt32BE(offset);
    const type = buf.subarray(offset + 4, offset + 8).toString("ascii");
    const totalChunkSize = 12 + length;

    if (offset + totalChunkSize > buf.length) {
      return { ok: false };
    }

    if (type === "acTL") {
      return { ok: false, animated: true };
    }

    if (type === "IHDR") {
      if (length !== 13) return { ok: false };
      width = buf.readUInt32BE(offset + 8);
      height = buf.readUInt32BE(offset + 12);
      sawIhdr = true;
    } else if (type === "IDAT") {
      sawIdat = true;
    } else if (type === "IEND") {
      sawIend = true;
    }

    if (stripChunkTypes.has(type)) {
      strippedAny = true;
    } else {
      keptChunks.push(buf.subarray(offset, offset + totalChunkSize));
    }

    offset += totalChunkSize;
    if (type === "IEND") break;
  }

  if (!sawIhdr || !sawIdat || !sawIend || width <= 0 || height <= 0) {
    return { ok: false };
  }

  return {
    ok: true,
    width,
    height,
    cleaned: Buffer.concat(keptChunks),
    exifStripped: strippedAny,
  };
}

function parseAndCleanWebp(buf: Buffer): {
  ok: boolean;
  animated?: boolean;
  width?: number;
  height?: number;
  cleaned?: Buffer;
  exifStripped?: boolean;
} {
  if (
    buf.length < 20 ||
    buf.subarray(0, 4).toString("ascii") !== "RIFF" ||
    buf.subarray(8, 12).toString("ascii") !== "WEBP"
  ) {
    return { ok: false };
  }

  let offset = 12;
  let width = 0;
  let height = 0;
  let strippedAny = false;
  const keptSubchunks: Buffer[] = [];

  while (offset + 8 <= buf.length) {
    const fourCC = buf.subarray(offset, offset + 4).toString("ascii");
    const chunkSize = buf.readUInt32LE(offset + 4);
    const paddedSize = chunkSize + (chunkSize % 2);

    if (offset + 8 + chunkSize > buf.length) {
      return { ok: false };
    }

    if (fourCC === "ANIM" || fourCC === "ANMF") {
      return { ok: false, animated: true };
    }

    if (fourCC === "VP8X") {
      if (chunkSize < 10) return { ok: false };
      const flags = buf[offset + 8];
      if ((flags & 0x02) !== 0) {
        return { ok: false, animated: true };
      }
      width = 1 + buf.readUIntLE(offset + 12, 3);
      height = 1 + buf.readUIntLE(offset + 15, 3);
      // Clear EXIF (0x08) and XMP (0x04) flags in VP8X copy
      const chunkCopy = Buffer.from(buf.subarray(offset, Math.min(buf.length, offset + 8 + paddedSize)));
      chunkCopy[8] = flags & ~0x0c;
      keptSubchunks.push(chunkCopy);
    } else if (fourCC === "VP8 ") {
      if (chunkSize >= 10 && width === 0) {
        const frameTag = buf[offset + 8];
        const isKeyframe = (frameTag & 0x01) === 0;
        if (
          isKeyframe &&
          buf[offset + 11] === 0x9d &&
          buf[offset + 12] === 0x01 &&
          buf[offset + 13] === 0x2a
        ) {
          width = buf.readUInt16LE(offset + 14) & 0x3fff;
          height = buf.readUInt16LE(offset + 16) & 0x3fff;
        }
      }
      keptSubchunks.push(buf.subarray(offset, Math.min(buf.length, offset + 8 + paddedSize)));
    } else if (fourCC === "VP8L") {
      if (chunkSize >= 5 && width === 0 && buf[offset + 8] === 0x2f) {
        const b1 = buf[offset + 9];
        const b2 = buf[offset + 10];
        const b3 = buf[offset + 11];
        const b4 = buf[offset + 12];
        width = 1 + (((b2 & 0x3f) << 8) | b1);
        height = 1 + (((b4 & 0x0f) << 10) | (b3 << 2) | ((b2 & 0xc0) >> 6));
      }
      keptSubchunks.push(buf.subarray(offset, Math.min(buf.length, offset + 8 + paddedSize)));
    } else if (fourCC === "EXIF" || fourCC === "XMP ") {
      strippedAny = true;
    } else {
      keptSubchunks.push(buf.subarray(offset, Math.min(buf.length, offset + 8 + paddedSize)));
    }

    offset += 8 + paddedSize;
  }

  if (width <= 0 || height <= 0 || keptSubchunks.length === 0) {
    return { ok: false };
  }

  const body = Buffer.concat(keptSubchunks);
  const riffHeader = Buffer.alloc(12);
  riffHeader.write("RIFF", 0, "ascii");
  riffHeader.writeUInt32LE(4 + body.length, 4);
  riffHeader.write("WEBP", 8, "ascii");

  return {
    ok: true,
    width,
    height,
    cleaned: Buffer.concat([riffHeader, body]),
    exifStripped: strippedAny,
  };
}

export function inspectAndNormalizeImageBuffer(buf: Buffer): ImageInspectionResult {
  if (!buf || buf.length === 0) {
    return {
      valid: false,
      errorCode: "EMPTY_FILE",
      userMessageVi: "Tệp ảnh trống hoặc không có dữ liệu. Vui lòng chọn ảnh chụp màn hình hợp lệ.",
      userMessageEn: "The image file is empty. Please attach a valid screenshot.",
    };
  }

  if (buf.length > IMAGE_LIMITS.MAX_IMAGE_BYTES) {
    return {
      valid: false,
      errorCode: "FILE_TOO_LARGE",
      userMessageVi: "Dung lượng ảnh vượt quá giới hạn 8 MiB/ảnh. Anh/chị vui lòng cắt gọn vùng màn hình cần hỗ trợ rồi gửi lại nhé.",
      userMessageEn: "Image exceeds the 8 MiB per-file limit. Please crop to the relevant screen area and try again.",
    };
  }

  const disallowed = detectDisallowedSignature(buf);
  if (disallowed) {
    return {
      valid: false,
      errorCode: "SPOOFED_DISALLOWED_FILE",
      userMessageVi: `Hệ thống phát hiện đây là ${disallowed.label}, chưa hỗ trợ xử lý trực tiếp. Anh/chị vui lòng gửi ảnh chụp màn hình định dạng JPEG, PNG hoặc WebP tĩnh nhé.`,
      userMessageEn: `Unsupported file content detected (${disallowed.code}). Please upload a static JPEG, PNG, or WebP screenshot.`,
    };
  }

  let detectedMime: SupportedImageMime | null = null;
  let width = 0;
  let height = 0;
  let normalizedBuffer: Buffer | null = null;
  let exifStripped = false;
  let orientation = 1;

  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    const res = parseAndCleanJpeg(buf);
    if (!res.ok || !res.cleaned || !res.width || !res.height) {
      return {
        valid: false,
        errorCode: "CORRUPTED_IMAGE",
        userMessageVi: "Ảnh JPEG bị lỗi hoặc không thể giải mã hoàn chỉnh. Vui lòng chụp lại màn hình và gửi lại.",
        userMessageEn: "The JPEG image is corrupted or incomplete. Please take a new screenshot and retry.",
      };
    }
    detectedMime = "image/jpeg";
    width = res.width;
    height = res.height;
    normalizedBuffer = res.cleaned;
    exifStripped = Boolean(res.exifStripped);
    orientation = res.orientation || 1;
  } else if (
    buf.length >= 8 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47
  ) {
    const res = parseAndCleanPng(buf);
    if (res.animated) {
      return {
        valid: false,
        errorCode: "ANIMATED_IMAGE_NOT_SUPPORTED",
        userMessageVi: "Chưa hỗ trợ ảnh động (APNG). Anh/chị vui lòng gửi ảnh chụp màn hình tĩnh định dạng PNG, JPEG hoặc WebP.",
        userMessageEn: "Animated PNGs are not supported yet. Please upload a static PNG, JPEG, or WebP screenshot.",
      };
    }
    if (!res.ok || !res.cleaned || !res.width || !res.height) {
      return {
        valid: false,
        errorCode: "CORRUPTED_IMAGE",
        userMessageVi: "Ảnh PNG bị hỏng hoặc không thể giải mã. Vui lòng chụp lại màn hình và gửi lại.",
        userMessageEn: "The PNG image could not be decoded. Please upload a valid screenshot.",
      };
    }
    detectedMime = "image/png";
    width = res.width;
    height = res.height;
    normalizedBuffer = res.cleaned;
    exifStripped = Boolean(res.exifStripped);
  } else if (
    buf.length >= 12 &&
    buf.subarray(0, 4).toString("ascii") === "RIFF" &&
    buf.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    const res = parseAndCleanWebp(buf);
    if (res.animated) {
      return {
        valid: false,
        errorCode: "ANIMATED_IMAGE_NOT_SUPPORTED",
        userMessageVi: "Chưa hỗ trợ ảnh WebP động. Anh/chị vui lòng gửi ảnh chụp màn hình tĩnh (JPEG, PNG hoặc WebP tĩnh).",
        userMessageEn: "Animated WebP images are not supported. Please send a static JPEG, PNG, or WebP screenshot.",
      };
    }
    if (!res.ok || !res.cleaned || !res.width || !res.height) {
      return {
        valid: false,
        errorCode: "CORRUPTED_IMAGE",
        userMessageVi: "Ảnh WebP không hợp lệ hoặc bị hỏng dữ liệu. Vui lòng thử chụp lại ảnh khác.",
        userMessageEn: "The WebP image could not be decoded. Please try another screenshot.",
      };
    }
    detectedMime = "image/webp";
    width = res.width;
    height = res.height;
    normalizedBuffer = res.cleaned;
    exifStripped = Boolean(res.exifStripped);
  } else {
    return {
      valid: false,
      errorCode: "UNSUPPORTED_FORMAT",
      userMessageVi: "Định dạng tệp chưa được hỗ trợ ở phiên bản hiện tại. Hệ thống chỉ nhận ảnh tĩnh JPEG, PNG và WebP (tối đa 3 ảnh/lượt, mỗi ảnh tối đa 8 MiB).",
      userMessageEn: "Unsupported file format. Only static JPEG, PNG, and WebP images are accepted (up to 3 images, max 8 MiB each).",
    };
  }

  const pixelCount = width * height;
  if (
    pixelCount > IMAGE_LIMITS.MAX_IMAGE_PIXELS ||
    width > IMAGE_LIMITS.MAX_DIMENSION_PX ||
    height > IMAGE_LIMITS.MAX_DIMENSION_PX
  ) {
    return {
      valid: false,
      errorCode: "PIXEL_LIMIT_EXCEEDED",
      userMessageVi: `Độ phân giải ảnh quá lớn (${width}×${height} px, vượt giới hạn 30 triệu điểm ảnh). Anh/chị vui lòng cắt nhỏ vùng thông báo cần kiểm tra trước khi gửi nhé.`,
      userMessageEn: `Image resolution (${width}×${height} px) exceeds the 30 megapixel limit. Please crop to the relevant area.`,
    };
  }

  if (width < IMAGE_LIMITS.MIN_DIMENSION_PX || height < IMAGE_LIMITS.MIN_DIMENSION_PX) {
    return {
      valid: false,
      errorCode: "IMAGE_TOO_SMALL",
      userMessageVi: `Kích thước ảnh quá nhỏ (${width}×${height} px) nên không thể đọc được chữ. Anh/chị vui lòng chụp rõ vùng hộp thoại hoặc thông báo lỗi nhé.`,
      userMessageEn: `Image is too small (${width}×${height} px) to read text clearly. Please capture a clearer screenshot.`,
    };
  }

  let qualityHint: "ok" | "low_resolution" | "extreme_aspect" = "ok";
  if (width < 200 || height < 90) {
    qualityHint = "low_resolution";
  } else if (width / height > 10 || height / width > 10) {
    qualityHint = "extreme_aspect";
  }

  const sha256 = createHash("sha256").update(normalizedBuffer).digest("hex");

  return {
    valid: true,
    detectedMime,
    width,
    height,
    pixelCount,
    sizeBytes: normalizedBuffer.length,
    normalizedBuffer,
    sha256,
    exifStripped: true || exifStripped,
    orientation,
    qualityHint,
  };
}

