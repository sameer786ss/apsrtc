import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/admin/' },
    sitemap: ['https://apptdunion.me/sitemap.xml', 'https://apptdunion.me/feed.xml'],
  };
}
