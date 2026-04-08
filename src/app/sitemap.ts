import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = [
    'og-image-guide',
    'social-card-best-practices',
    'meta-tags-for-seo',
    'og-image-design-tips',
  ];

  return [
    {
      url: 'https://makemyog.app',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://makemyog.app/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogSlugs.map((slug) => ({
      url: `https://makemyog.app/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
