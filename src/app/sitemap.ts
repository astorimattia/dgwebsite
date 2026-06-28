import type { MetadataRoute } from 'next'
import { stories } from '@/lib/stories'

const BASE_URL = 'https://mattiaastori.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/stories`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ]

  const storyRoutes: MetadataRoute.Sitemap = stories.map((story) => ({
    url: `${BASE_URL}/stories/${story.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...storyRoutes]
}
