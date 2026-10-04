import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import BlogPostModel from "@/models/BlogPost";
import { formatBlogPost, seedBlogDatabase } from "@/lib/blogService";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "vi";
    const isVi = locale === "vi";

    await connectToDatabase();
    await seedBlogDatabase(false);

    const doc = await BlogPostModel.findOne({
      $or: [{ id: slug }, { slug: slug }],
    }).lean();

    if (!doc) {
      return NextResponse.json(
        { success: false, source: "mongodb", error: "Post not found in MongoDB" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      source: "mongodb",
      data: formatBlogPost(doc, isVi),
    });
  } catch (error: any) {
    console.error("API GET /api/blog/[slug] error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const body = await request.json();

    await connectToDatabase();

    const updated = await BlogPostModel.findOneAndUpdate(
      { $or: [{ id: slug }, { slug }] },
      { ...body, updatedAt: new Date() },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: "Post not found to update" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Post updated successfully in MongoDB",
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    await connectToDatabase();

    const deleted = await BlogPostModel.findOneAndDelete({
      $or: [{ id: slug }, { slug }],
    });

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Post ${slug} deleted successfully from MongoDB`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
