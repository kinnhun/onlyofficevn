import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "Setup-OnlyOffice-Mercy.exe");

  if (!fs.existsSync(filePath)) {
    return new NextResponse("File not found", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Disposition": 'attachment; filename="Setup-OnlyOffice-Mercy.exe"',
      "Content-Type": "application/vnd.microsoft.portable-executable",
      "Cache-Control": "no-cache",
    },
  });
}
