import { NextRequest, NextResponse } from "next/server";
import { seedBlogDatabase } from "@/lib/blogService";

export async function POST(request: NextRequest) {
  try {
    const result = await seedBlogDatabase(true);
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const result = await seedBlogDatabase(false);
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
