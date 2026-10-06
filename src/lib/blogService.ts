import { connectToDatabase } from "@/lib/mongodb";
import BlogPostModel, { IBlogPostDocument, IBlogSection } from "@/models/BlogPost";
import { BlogPost, BlogSection, getBlogPosts, getBlogPostById } from "@/components/blog/blogData";

/**
 * Transforms bilingual MongoDB document into localized BlogPost object for frontend
 */
export function formatBlogPost(doc: any, isVi: boolean): BlogPost {
  const sections: BlogSection[] = (doc.sections || []).map((sec: any) => {
    const formattedSec: BlogSection = {
      id: sec.id,
      heading: isVi ? sec.heading_vi : (sec.heading_en || sec.heading_vi),
      paragraphs: isVi ? (sec.paragraphs_vi || []) : (sec.paragraphs_en?.length ? sec.paragraphs_en : sec.paragraphs_vi || []),
    };

    if (sec.callout && (sec.callout.title_vi || sec.callout.title_en)) {
      formattedSec.callout = {
        type: sec.callout.type || "tip",
        title: isVi ? sec.callout.title_vi : (sec.callout.title_en || sec.callout.title_vi),
        text: isVi ? sec.callout.text_vi : (sec.callout.text_en || sec.callout.text_vi),
      };
    }

    if (sec.steps && sec.steps.length > 0) {
      formattedSec.steps = sec.steps.map((st: any) => ({
        step: st.step,
        title: isVi ? st.title_vi : (st.title_en || st.title_vi),
        desc: isVi ? st.desc_vi : (st.desc_en || st.desc_vi),
      }));
    }

    if (sec.codeBlock && sec.codeBlock.code) {
      formattedSec.codeBlock = {
        language: sec.codeBlock.language || "text",
        code: sec.codeBlock.code,
        filename: sec.codeBlock.filename,
      };
    }

    if (sec.table && (sec.table.headers_vi?.length || sec.table.headers_en?.length)) {
      formattedSec.table = {
        headers: isVi ? sec.table.headers_vi : (sec.table.headers_en?.length ? sec.table.headers_en : sec.table.headers_vi),
        rows: isVi ? sec.table.rows_vi : (sec.table.rows_en?.length ? sec.table.rows_en : sec.table.rows_vi),
      };
    }

    return formattedSec;
  });

  let selectedImage = doc.image || "";
  if (isVi) {
    if (doc.image_vi) {
      selectedImage = doc.image_vi;
    } else if (doc.id === "trial-guide" || selectedImage.includes("trial-guide")) {
      selectedImage = "/blog/trial/vn.png";
    }
  } else {
    if (doc.image_en) {
      selectedImage = doc.image_en;
    } else if (doc.id === "trial-guide" || selectedImage.includes("trial-guide")) {
      selectedImage = "/blog/trial/en.png";
    }
  }

  return {
    id: doc.id,
    image: selectedImage,
    title: isVi ? doc.title_vi : (doc.title_en || doc.title_vi),
    category: doc.category,
    categoryName: isVi ? doc.categoryName_vi : (doc.categoryName_en || doc.categoryName_vi),
    excerpt: isVi ? doc.excerpt_vi : (doc.excerpt_en || doc.excerpt_vi),
    date: doc.date,
    readTime: doc.readTime || "5",
    author: doc.author || "Mercy Tech Team",
    authorRole: isVi ? doc.authorRole_vi : (doc.authorRole_en || doc.authorRole_vi),
    featured: Boolean(doc.featured),
    tags: doc.tags || [],
    summary: isVi ? doc.summary_vi : (doc.summary_en || doc.summary_vi),
    content: isVi ? (doc.content_vi || []) : (doc.content_en?.length ? doc.content_en : doc.content_vi || []),
    contentHtml: doc.contentHtml || "",
    sourceUrl: doc.sourceUrl || "",
    sections,
  };
}

/**
 * Seeds MongoDB with the 8 official articles if the collection is empty
 */
export async function seedBlogDatabase(force = false) {
  await connectToDatabase();

  const count = await BlogPostModel.countDocuments();
  if (count > 0 && !force) {
    return { seeded: false, count, message: "Database already contains articles" };
  }

  const postsVi = getBlogPosts(true);
  const postsEn = getBlogPosts(false);

  const seedDocuments = postsVi.map((vi, index) => {
    const en = postsEn.find((p) => p.id === vi.id) || vi;

    const sections: IBlogSection[] = (vi.sections || []).map((secVi) => {
      const secEn = en.sections?.find((s) => s.id === secVi.id) || secVi;
      return {
        id: secVi.id,
        heading_vi: secVi.heading,
        heading_en: secEn.heading,
        paragraphs_vi: secVi.paragraphs,
        paragraphs_en: secEn.paragraphs,
        callout: secVi.callout
          ? {
              type: secVi.callout.type,
              title_vi: secVi.callout.title,
              title_en: secEn.callout?.title || secVi.callout.title,
              text_vi: secVi.callout.text,
              text_en: secEn.callout?.text || secVi.callout.text,
            }
          : undefined,
        steps: secVi.steps?.map((stVi, sIdx) => {
          const stEn = secEn.steps?.[sIdx] || stVi;
          return {
            step: stVi.step,
            title_vi: stVi.title,
            title_en: stEn.title,
            desc_vi: stVi.desc,
            desc_en: stEn.desc,
          };
        }),
        codeBlock: secVi.codeBlock
          ? {
              language: secVi.codeBlock.language,
              code: secVi.codeBlock.code,
              filename: secVi.codeBlock.filename,
            }
          : undefined,
        table: secVi.table
          ? {
              headers_vi: secVi.table.headers,
              headers_en: secEn.table?.headers || secVi.table.headers,
              rows_vi: secVi.table.rows,
              rows_en: secEn.table?.rows || secVi.table.rows,
            }
          : undefined,
      };
    });

    return {
      id: vi.id,
      slug: vi.id,
      image: vi.image || "",
      image_vi: vi.image || "",
      image_en: en.image || vi.image || "",
      title_vi: vi.title,
      title_en: en.title,
      category: vi.category,
      categoryName_vi: vi.categoryName,
      categoryName_en: en.categoryName,
      excerpt_vi: vi.excerpt,
      excerpt_en: en.excerpt,
      date: vi.date,
      readTime: vi.readTime,
      author: vi.author,
      authorRole_vi: vi.authorRole,
      authorRole_en: en.authorRole,
      featured: Boolean(vi.featured),
      order: index,
      tags: vi.tags || [],
      summary_vi: vi.summary,
      summary_en: en.summary,
      content_vi: vi.content,
      content_en: en.content,
      sections,
    };
  });

  for (const doc of seedDocuments) {
    await BlogPostModel.findOneAndUpdate({ id: doc.id }, doc, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }

  const finalCount = await BlogPostModel.countDocuments();
  return { seeded: true, count: finalCount, message: `Successfully seeded ${finalCount} articles into MongoDB` };
}

/**
 * Fetch all posts strictly from MongoDB
 */
export async function getDbBlogPosts(locale: string = "vi"): Promise<BlogPost[]> {
  const isVi = locale === "vi";

  await connectToDatabase();
  await seedBlogDatabase(false);

  const docs = await BlogPostModel.find({}).sort({ order: 1, createdAt: -1 }).lean();
  return (docs || []).map((doc) => formatBlogPost(doc, isVi));
}

/**
 * Fetch single post by ID or Slug strictly from MongoDB
 */
export async function getDbBlogPostBySlug(slug: string, locale: string = "vi"): Promise<BlogPost | undefined> {
  const isVi = locale === "vi";

  await connectToDatabase();
  await seedBlogDatabase(false);

  const doc = await BlogPostModel.findOne({
    $or: [{ id: slug }, { slug: slug }],
  }).lean();

  if (!doc) {
    return undefined;
  }

  return formatBlogPost(doc, isVi);
}
