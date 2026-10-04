import { MetadataRoute } from "next";
import { getBlogPosts } from "@/components/blog/blogData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://onlyoffice.vn";
  const now = new Date();

  // Primary static routes with their priority & update frequency
  const pages = [
    { path: "", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/docs", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/document-editor", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/spreadsheet-editor", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/presentation-editor", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/pdf-editor", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/form-creator", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/diagram-viewer", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/pricing", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/demo", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/partners", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "daily" as const },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    // Vietnamese default route (e.g. https://onlyoffice.vn/document-editor)
    sitemapEntries.push({
      url: `${baseUrl}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          vi: `${baseUrl}${page.path}`,
          en: `${baseUrl}/en${page.path}`,
          "x-default": `${baseUrl}${page.path}`,
        },
      },
    });

    // English route (e.g. https://onlyoffice.vn/en/document-editor)
    sitemapEntries.push({
      url: `${baseUrl}/en${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority * 0.95,
      alternates: {
        languages: {
          vi: `${baseUrl}${page.path}`,
          en: `${baseUrl}/en${page.path}`,
          "x-default": `${baseUrl}${page.path}`,
        },
      },
    });
  }

  // Dynamic Blog Posts
  const blogPosts = getBlogPosts(true);
  for (const post of blogPosts) {
    const postPath = `/blog/${post.id}`;
    sitemapEntries.push({
      url: `${baseUrl}${postPath}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
      alternates: {
        languages: {
          vi: `${baseUrl}${postPath}`,
          en: `${baseUrl}/en${postPath}`,
          "x-default": `${baseUrl}${postPath}`,
        },
      },
    });

    sitemapEntries.push({
      url: `${baseUrl}/en${postPath}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: {
          vi: `${baseUrl}${postPath}`,
          en: `${baseUrl}/en${postPath}`,
          "x-default": `${baseUrl}${postPath}`,
        },
      },
    });
  }

  return sitemapEntries;
}
