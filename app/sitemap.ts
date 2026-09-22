import type { MetadataRoute } from 'next';
import { BLOG_ARTICLES } from './blog/articles-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yrdly.ng';
  const lastModified = new Date();

  const blogUrls: MetadataRoute.Sitemap = BLOG_ARTICLES.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/faq`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/events`, lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/marketplace`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/learn-more`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    ...blogUrls,
  ];
}
