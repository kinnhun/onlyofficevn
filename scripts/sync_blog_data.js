const fs = require('fs');
const path = require('path');

const clonedPosts = JSON.parse(fs.readFileSync(path.join(__dirname, 'cloned_onlyoffice_posts.json'), 'utf8'));

console.log(`Read ${clonedPosts.length} posts from cloned_onlyoffice_posts.json`);

const blogDataContent = `export interface BlogSection {
  id: string;
  heading: string;
  paragraphs: string[];
  callout?: {
    type: "tip" | "warning" | "highlight" | "quote";
    title: string;
    text: string;
  };
  steps?: {
    step: string;
    title: string;
    desc: string;
  }[];
  codeBlock?: {
    language: string;
    code: string;
    filename?: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryName: string;
  categoryIcon?: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  authorRole?: string;
  featured?: boolean;
  isMainFeatured?: boolean;
  tags?: string[];
  content: string[];
  contentHtml?: string;
  sourceUrl?: string;
  summary?: string;
  image: string;
  sections?: BlogSection[];
}

export interface PressItem {
  id: string;
  title: string;
  date: string;
  source: string;
  url: string;
}

export interface BlogCategoryInfo {
  id: string;
  slug: string;
  name: string;
  icon: string;
}

export const BLOG_CATEGORIES: Record<string, { vi: string; en: string; icon: string }> = {
  "back-to-school": {
    vi: "Mùa tựu trường",
    en: "Back to school",
    icon: "https://static-blog.onlyoffice.com/images/category-topics/back-to-school.svg",
  },
  "onlyoffice-16th-anniversary": {
    vi: "Kỷ niệm 16 năm ONLYOFFICE",
    en: "ONLYOFFICE 16th Anniversary",
    icon: "https://static-blog.onlyoffice.com/images/category-topics/16.svg",
  },
  "product-releases": {
    vi: "Phát hành sản phẩm",
    en: "Product releases",
    icon: "https://static-blog.onlyoffice.com/images/category-topics/product-releases.svg",
  },
  "for-developers": {
    vi: "Dành cho nhà phát triển",
    en: "For developers",
    icon: "https://static-blog.onlyoffice.com/images/category-topics/for-developers.svg",
  },
  "for-business": {
    vi: "Dành cho doanh nghiệp",
    en: "For business",
    icon: "https://static-blog.onlyoffice.com/images/category-topics/for-business.svg",
  },
};

export const IN_THE_PRESS: PressItem[] = [
  {
    id: "press-1",
    title: "ONLYOFFICE Docs Developer review: an embedded office suite for your app",
    date: "1 Sep 2026",
    source: "KrowdBase",
    url: "https://www.krowdbase.com/post/onlyoffice-docs-developer-review",
  },
  {
    id: "press-2",
    title: "I replaced Excel with this open-source alternative for a week—I wasn’t ready for the difference",
    date: "28 Aug 2026",
    source: "How-To Geek",
    url: "https://www.howtogeek.com/microsoft-excel-replaced-with-onlyoffice-spreadsheet/",
  },
  {
    id: "press-3",
    title: "Why European institutions are choosing self-hosted ONLYOFFICE over Microsoft 365",
    date: "15 Aug 2026",
    source: "TechRadar Pro",
    url: "https://www.onlyoffice.com/blog",
  },
];

const RAW_CLONED_POSTS = ${JSON.stringify(clonedPosts, null, 2)};

export function getBlogPosts(isVi: boolean): BlogPost[] {
  return RAW_CLONED_POSTS.map((doc: any) => ({
    id: doc.id,
    slug: doc.slug || doc.id,
    image: doc.image || "https://static-blog.onlyoffice.com/wp-content/uploads/2026/10/01164202/IMG_6017.png",
    title: isVi ? doc.title_vi : doc.title_en,
    category: doc.category,
    categoryName: isVi ? doc.categoryName_vi : doc.categoryName_en,
    excerpt: isVi ? doc.excerpt_vi : doc.excerpt_en,
    date: doc.date,
    readTime: doc.readTime || "5",
    author: doc.author,
    authorRole: isVi ? doc.authorRole_vi : doc.authorRole_en,
    featured: Boolean(doc.featured),
    isMainFeatured: Boolean(doc.isMainFeatured),
    tags: doc.tags || [],
    summary: isVi ? doc.summary_vi : doc.summary_en,
    content: isVi ? doc.content_vi : doc.content_en,
    contentHtml: doc.contentHtml || "",
    sections: doc.sections || [],
  }));
}

export function getBlogPostById(idOrSlug: string, isVi: boolean): BlogPost | undefined {
  const posts = getBlogPosts(isVi);
  return posts.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'components', 'blog', 'blogData.ts'), blogDataContent);
console.log('✅ Updated src/components/blog/blogData.ts with all 60 cloned OnlyOffice posts!');
