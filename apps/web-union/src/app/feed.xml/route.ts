import { NextResponse } from 'next/server';
import { fetchDocs } from '@/lib/firestore';
import { Blog, FileDocument } from '@/lib/types';
import { stripHtml } from '@/lib/utils';

export const revalidate = 300; // 5-minute cache

const SITE_URL = 'https://apptdunion.me';
const SITE_NAME = 'APPTD Employees Union';
const SITE_DESC = 'Official blog and information portal for APPTD Employees Union';

function escXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function blogItem(b: Blog): string {
  const desc = escXml(b.excerpt || stripHtml(b.content).substring(0, 200));
  const date = b.created_at instanceof Date ? b.created_at.toUTCString() : new Date(b.created_at).toUTCString();
  return `<item>
    <title>${escXml(b.title)}</title>
    <link>${SITE_URL}/blog/${escXml(b.slug)}</link>
    <description>${desc}</description>
    <pubDate>${date}</pubDate>
    <guid isPermaLink="true">${SITE_URL}/blog/${escXml(b.slug)}</guid>
    <category>${escXml(b.category || 'General')}</category>
    ${b.cover_image ? `<enclosure url="${escXml(b.cover_image)}" type="image/jpeg" length="0"/>` : ''}
  </item>`;
}

function fileItem(f: FileDocument, section: string): string {
  const date = (() => { try { return new Date(f.date + 'T00:00:00').toUTCString(); } catch { return new Date().toUTCString(); } })();
  return `<item>
    <title>${escXml(f.title)}</title>
    <link>${escXml(f.fileUrl)}</link>
    <description>${escXml(f.title)} - ${f.fileType?.toUpperCase() || 'File'}</description>
    <pubDate>${date}</pubDate>
    <guid isPermaLink="false">${escXml(f.id || f.title)}</guid>
    <category>${section}</category>
  </item>`;
}

export async function GET() {
  const [blogs, circulars, unionAffairs] = await Promise.allSettled([
    fetchDocs<Blog>('blogs', 'created_at'),
    fetchDocs<FileDocument>('circulars', 'date'),
    fetchDocs<FileDocument>('union_affairs', 'date'),
  ]);

  const blogItems = blogs.status === 'fulfilled' ? blogs.value.map(blogItem).join('\n') : '';
  const circularItems = circulars.status === 'fulfilled' ? circulars.value.map(f => fileItem(f, 'Circulars')).join('\n') : '';
  const unionItems = unionAffairs.status === 'fulfilled' ? unionAffairs.value.map(f => fileItem(f, 'Union Affairs')).join('\n') : '';

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escXml(SITE_DESC)}</description>
    <language>en-IN</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${blogItems}
    ${circularItems}
    ${unionItems}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
