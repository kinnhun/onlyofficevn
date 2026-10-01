import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "Kich-Hoat-Demo-OnlyOffice-Mercy.bat");
  
  if (!fs.existsSync(filePath)) {
    // Fallback to parent dir if needed
    const fallbackPath = path.join(process.cwd(), "..", "Kich-Hoat-Demo-OnlyOffice-Mercy (4).bat");
    if (fs.existsSync(fallbackPath)) {
      const fileBuffer = fs.readFileSync(fallbackPath);
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Disposition": 'attachment; filename="Kich-Hoat-Demo-OnlyOffice-Mercy.bat"',
          "Content-Type": "application/octet-stream",
          "Cache-Control": "no-cache",
        },
      });
    }
    return new NextResponse("File not found", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Disposition": 'attachment; filename="Kich-Hoat-Demo-OnlyOffice-Mercy.bat"',
      "Content-Type": "application/octet-stream",
      "Cache-Control": "no-cache",
    },
  });
}
