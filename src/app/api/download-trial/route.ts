import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect(
    "https://onlyoffice.mercytechglobal.com/Setup-OnlyOffice-Mercy.exe",
    302
  );
}

