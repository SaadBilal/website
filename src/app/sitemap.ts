import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/data/blog";
export const dynamic = 'force-static';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://saadbilal.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: siteUrl, priority: 1.0, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/about`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/experience`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/projects`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/tech-stack`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/blog`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${siteUrl}/contact`, priority: 0.7, changeFrequency: "yearly" as const },
  ];

  const blogPages = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [
    ...staticPages.map((page) => ({
      url: page.url,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...blogPages,
  ];
}
