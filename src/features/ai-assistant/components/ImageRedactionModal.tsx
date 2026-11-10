"use client";

import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Tooltip, Space } from "antd";
import {
  RotateRightOutlined,
  ClearOutlined,
  EyeInvisibleOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

type ImageRedactionModalProps = {
  isOpen: boolean;
  file: File | null;
  onClose: () => void;
  onApply: (editedFile: File) => void;
};

type MaskRect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export function ImageRedactionModal({
  isOpen,
  file,
  onClose,
  onApply,
}: ImageRedactionModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loadedImgRef = useRef<HTMLImageElement | null>(null);

  const [rotationDeg, setRotationDeg] = useState<number>(0);
  const [masks, setMasks] = useState<MaskRect[]>([]);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [currentRect, setCurrentRect] = useState<MaskRect | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isOpen || !file) return;
    setRotationDeg(0);
    setMasks([]);
    setCurrentRect(null);

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      loadedImgRef.current = img;
      redrawCanvas(img, 0, [], null);
    };
    img.src = url;

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [isOpen, file]);

  const redrawCanvas = (
    img: HTMLImageElement | null,
    rot: number,
    rectList: MaskRect[],
    activeRect: MaskRect | null
  ) => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const swapped = rot % 180 !== 0;
    const baseW = swapped ? img.naturalHeight : img.naturalWidth;
    const baseH = swapped ? img.naturalWidth : img.naturalHeight;

    const scale = Math.min(1, 1600 / Math.max(baseW, baseH));
    const targetW = Math.max(1, Math.round(baseW * scale));
    const targetH = Math.max(1, Math.round(baseH * scale));

    canvas.width = targetW;
    canvas.height = targetH;

    ctx.save();
    ctx.translate(targetW / 2, targetH / 2);
    ctx.rotate((rot * Math.PI) / 180);
    const drawW = swapped ? targetH : targetW;
    const drawH = swapped ? targetW : targetH;
    ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();

    ctx.fillStyle = "#101828";
    for (const r of rectList) {
      ctx.fillRect(r.x, r.y, r.w, r.h);
    }

    if (activeRect) {
      ctx.fillStyle = "rgba(16, 24, 40, 0.78)";
      ctx.fillRect(activeRect.x, activeRect.y, activeRect.w, activeRect.h);
      ctx.strokeStyle = "#FF520D";
      ctx.lineWidth = 2;
      ctx.strokeRect(activeRect.x, activeRect.y, activeRect.w, activeRect.h);
    }
  };

  useEffect(() => {
    if (loadedImgRef.current) {
      redrawCanvas(loadedImgRef.current, rotationDeg, masks, currentRect);
    }
  }, [rotationDeg, masks, currentRect]);

  if (!isOpen || !file) return null;

  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const pt = getCanvasCoords(e);
    setDragStart(pt);
    setCurrentRect({ x: pt.x, y: pt.y, w: 0, h: 0 });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragStart) return;
    const pt = getCanvasCoords(e);
    const x = Math.min(dragStart.x, pt.x);
    const y = Math.min(dragStart.y, pt.y);
    const w = Math.abs(pt.x - dragStart.x);
    const h = Math.abs(pt.y - dragStart.y);
    setCurrentRect({ x, y, w, h });
  };

  const handlePointerUp = () => {
    if (currentRect && currentRect.w > 6 && currentRect.h > 6) {
      setMasks((prev) => [...prev, currentRect]);
    }
    setDragStart(null);
    setCurrentRect(null);
  };

  const handleRotate = () => {
    setMasks([]);
    setRotationDeg((prev) => (prev + 90) % 360);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsSaving(true);
    canvas.toBlob(
      (blob) => {
        setIsSaving(false);
        if (!blob) return;
        const baseName = file.name.replace(/\.[^.]+$/, "");
        const nextFile = new File([blob], `${baseName}-edited.png`, {
          type: "image/png",
        });
        onApply(nextFile);
        onClose();
      },
      "image/png",
      0.95
    );
  };

  return (
    <Modal
      open={isOpen}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <EyeInvisibleOutlined style={{ color: "#ea580c", fontSize: "18px" }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: "14.5px", color: "#111827" }}>
              Xoay ảnh & Che thông tin nhạy cảm
            </div>
            <div style={{ fontSize: "11px", color: "#6b7280", fontWeight: 400 }}>
              Kéo chuột hoặc ngón tay lên ảnh để tô đen mật khẩu, OTP, API key hoặc mã cào.
            </div>
          </div>
        </div>
      }
      onCancel={onClose}
      centered
      width={720}
      footer={[
        <div
          key="footer"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}
        >
          <Space>
            <Button icon={<RotateRightOutlined style={{ color: "#ea580c" }} />} onClick={handleRotate}>
              Xoay 90°
            </Button>
            <Button
              icon={<ClearOutlined />}
              onClick={() => setMasks([])}
              disabled={masks.length === 0}
            >
              Bỏ vùng che ({masks.length})
            </Button>
          </Space>
          <Space>
            <Button icon={<CloseOutlined />} onClick={onClose}>
              Hủy
            </Button>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              loading={isSaving}
              onClick={handleSave}
              style={{
                background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                border: "none",
                fontWeight: 600,
              }}
            >
              Áp dụng & Tải lên
            </Button>
          </Space>
        </div>,
      ]}
      destroyOnClose
    >
      <div
        style={{
          maxHeight: "65vh",
          overflow: "auto",
          backgroundColor: "#f1f5f9",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "10px 0",
        }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{
            maxWidth: "100%",
            maxHeight: "55vh",
            objectFit: "contain",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            cursor: "crosshair",
            touchAction: "none",
            backgroundColor: "#ffffff",
          }}
        />
      </div>
    </Modal>
  );
}
