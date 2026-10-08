import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlogSection {
  id: string;
  heading_vi: string;
  heading_en: string;
  paragraphs_vi: string[];
  paragraphs_en: string[];
  callout?: {
    type: "tip" | "warning" | "highlight" | "quote";
    title_vi: string;
    title_en: string;
    text_vi: string;
    text_en: string;
  };
  steps?: {
    step: string;
    title_vi: string;
    title_en: string;
    desc_vi: string;
    desc_en: string;
  }[];
  codeBlock?: {
    language: string;
    code: string;
    filename?: string;
  };
  table?: {
    headers_vi: string[];
    headers_en: string[];
    rows_vi: string[][];
    rows_en: string[][];
  };
}

export interface IBlogPostDocument extends Document {
  id: string;
  slug?: string;
  image: string;
  image_vi?: string;
  image_en?: string;
  title_vi: string;
  title_en: string;
  category: string;
  categoryName_vi: string;
  categoryName_en: string;
  excerpt_vi: string;
  excerpt_en: string;
  date: string;
  readTime: string;
  author: string;
  authorRole_vi?: string;
  authorRole_en?: string;
  featured: boolean;
  order?: number;
  tags: string[];
  summary_vi?: string;
  summary_en?: string;
  content_vi: string[];
  content_en: string[];
  isMainFeatured?: boolean;
  contentHtml?: string;
  contentHtml_vi?: string;
  contentHtml_en?: string;
  sourceUrl?: string;
  sections: IBlogSection[];
  createdAt: Date;
  updatedAt: Date;
}

const BlogSectionSchema = new Schema<IBlogSection>(
  {
    id: { type: String, required: true },
    heading_vi: { type: String, required: true },
    heading_en: { type: String, default: "" },
    paragraphs_vi: [{ type: String }],
    paragraphs_en: [{ type: String }],
    callout: {
      type: { type: String, enum: ["tip", "warning", "highlight", "quote"] },
      title_vi: { type: String },
      title_en: { type: String },
      text_vi: { type: String },
      text_en: { type: String },
    },
    steps: [
      {
        step: { type: String },
        title_vi: { type: String },
        title_en: { type: String },
        desc_vi: { type: String },
        desc_en: { type: String },
      },
    ],
    codeBlock: {
      language: { type: String },
      code: { type: String },
      filename: { type: String },
    },
    table: {
      headers_vi: [{ type: String }],
      headers_en: [{ type: String }],
      rows_vi: [[{ type: String }]],
      rows_en: [[{ type: String }]],
    },
  },
  { _id: false }
);

const BlogPostSchema = new Schema<IBlogPostDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, index: true },
    image: { type: String, default: "" },
    image_vi: { type: String, default: "" },
    image_en: { type: String, default: "" },
    title_vi: { type: String, required: true },
    title_en: { type: String, default: "" },
    category: {
      type: String,
      required: true,
      index: true,
    },
    categoryName_vi: { type: String, required: true },
    categoryName_en: { type: String, default: "" },
    excerpt_vi: { type: String, required: true },
    excerpt_en: { type: String, default: "" },
    date: { type: String, required: true },
    readTime: { type: String, default: "5" },
    author: { type: String, default: "Mercy Tech Team" },
    authorRole_vi: { type: String, default: "Đội ngũ Kỹ sư Chuyển đổi số" },
    authorRole_en: { type: String, default: "Digital Transformation Team" },
    featured: { type: Boolean, default: false, index: true },
    isMainFeatured: { type: Boolean, default: false, index: true },
    order: { type: Number, default: 0 },
    tags: [{ type: String, index: true }],
    summary_vi: { type: String },
    summary_en: { type: String },
    content_vi: [{ type: String }],
    content_en: [{ type: String }],
    contentHtml: { type: String },
    contentHtml_vi: { type: String },
    contentHtml_en: { type: String },
    sourceUrl: { type: String },
    sections: [BlogSectionSchema],
  },
  {
    timestamps: true,
    collection: "blog_posts",
  }
);

export const BlogPostModel: Model<IBlogPostDocument> =
  mongoose.models.BlogPost ||
  mongoose.model<IBlogPostDocument>("BlogPost", BlogPostSchema);

export default BlogPostModel;
