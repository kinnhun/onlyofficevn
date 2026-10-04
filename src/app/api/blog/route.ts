import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import BlogPostModel from "@/models/BlogPost";
import { formatBlogPost, seedBlogDatabase } from "@/lib/blogService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "vi";
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const isVi = locale === "vi";

    await connectToDatabase();
    await seedBlogDatabase(false);

    const query: any = {};
    if (category && category !== "all") {
      query.category = category;
    }

    if (search) {
      const regex = new RegExp(search.trim(), "i");
      query.$or = [
        { title_vi: regex },
        { title_en: regex },
        { excerpt_vi: regex },
        { excerpt_en: regex },
        { tags: regex },
      ];
    }

    const docs = await BlogPostModel.find(query).sort({ order: 1, createdAt: -1 }).lean();
    const formatted = docs.map((d) => formatBlogPost(d, isVi));

    return NextResponse.json({
      success: true,
      source: "mongodb",
      count: formatted.length,
      data: formatted,
    });
  } catch (error: any) {
    console.error("API GET /api/blog error:", error);
    return NextResponse.json(
      {
        success: false,
        source: "mongodb",
        error: error.message,
        data: [],
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.id || !body.title_vi) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: id, title_vi" },
        { status: 400 }
      );
    }

    const newDoc = await BlogPostModel.findOneAndUpdate(
      { id: body.id },
      { ...body, slug: body.slug || body.id },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({
      success: true,
      message: "Blog post saved successfully into MongoDB",
      data: newDoc,
    });
  } catch (error: any) {
    console.error("API POST /api/blog error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
