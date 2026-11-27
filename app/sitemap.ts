import type { MetadataRoute } from 'next';
import { BLOG_ARTICLES } from './blog/articles-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yrdly.ng';
  const blogUrls: MetadataRoute.Sitemap = BLOG_ARTICLES.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/whats-new`, lastModified: new Date('2026-10-29T00:00:00.000Z'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/faq`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/events`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/businesses`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/marketplace`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/learn-more`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/trust-and-safety`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/child-safety`, lastModified: new Date('2026-10-26T00:00:00.000Z'), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/cookie-policy`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/terms`, changeFrequency: 'monthly', priority: 0.5 },
    ...blogUrls,
  ];
}
