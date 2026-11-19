import React from 'react';
import { notFound } from 'next/navigation';
import * as cheerio from 'cheerio';
import mirror from '@/data/apsrtc-mirror.json';
import { toLocalOfficialHref } from '@/data/apsrtc';
import MirrorPageClient from '@/components/MirrorPageClient';

type MirrorPage = {
  title: string;
  sourceUrl: string;
  path: string;
  html: string;
};

type MirrorManifest = {
  generatedAt: string;
  source: string;
  pageCount: number;
  assetCount: number;
  pages: Record<string, MirrorPage>;
};

const manifest = mirror as MirrorManifest;

function getMirrorKey(slug?: string[]) {
  if (!slug || slug.length === 0) return '/index.php';
  const rawPath = `/${slug.join('/')}`;
  const candidates = [
    rawPath,
    encodeURI(rawPath),
    decodeURI(rawPath),
  ];
  return candidates.find((candidate) => manifest.pages[candidate]) || (rawPath === '/' ? '/index.php' : rawPath);
}

export function generateStaticParams() {
  return Object.keys(manifest.pages).map((path) => ({
    slug: path === '/index.php' ? [] : path.slice(1).split('/').map((part) => {
      try {
        return decodeURIComponent(part);
      } catch {
        return part;
      }
    }),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const page = manifest.pages[getMirrorKey(slug)];
  return {
    title: page ? `${page.title} - APSRTC` : 'APSRTC',
  };
}

function cleanMirrorHtml(rawHtml: string): string {
  if (!rawHtml) return '';
  
  const $ = cheerio.load(rawHtml);
  
  // 1. Remove all h1, script, and style tags to prevent hydration style mismatch issues
  $('h1').remove();
  $('script').remove();
  $('style').remove();
  
  // 2. Remove redundant "Back" links (e.g., <a href="...">Back</a>)
  $('a').each((_, elem) => {
    const text = $(elem).text().trim().toLowerCase();
    if (text === 'back' || text === 'go back') {
      const parent = $(elem).parent();
      if (parent.children().length === 1 && (parent.is('div') || parent.is('p') || parent.is('td'))) {
        parent.remove();
      } else {
        $(elem).remove();
      }
    }
  });

  // 3. Remove empty paragraph tags
  $('p').each((_, elem) => {
    const html = $(elem).html()?.trim();
    if (!html || html === '&nbsp;' || html === '') {
      $(elem).remove();
    }
  });
  
  // 4. Remove empty table rows
  $('tr').each((_, elem) => {
    const text = $(elem).text().replace(/\s+/g, '').replace(/&nbsp;/g, '').trim();
    if (text === '' && $(elem).find('img').length === 0) {
      $(elem).remove();
    }
  });

  // 5. Handle tables: intelligently classify data tables vs layout tables
  $('table').each((_, tableElem) => {
    const border = $(tableElem).attr('border');
    const hasTh = $(tableElem).find('th').length > 0;
    const hasTheadOrTfoot = $(tableElem).find('thead, tfoot').length > 0;
    const firstRowBolds = $(tableElem).find('tr').first().find('b, strong').length > 0;
    const rowCount = $(tableElem).find('tr').length;
    
    // Correct table classification: data tables have header rows or explicit borders.
    // An arbitrary rowCount > 3 check is extremely unsafe as layout tables regularly have 4+ rows.
    const isDataTable = (border && border !== '0') || hasTh || hasTheadOrTfoot || (firstRowBolds && rowCount > 1);
    
    if (isDataTable) {
      $(tableElem).addClass('apsrtc-data-table');
      $(tableElem).removeClass('apsrtc-layout-table');
    } else {
      $(tableElem).addClass('apsrtc-layout-table');
      $(tableElem).removeClass('apsrtc-data-table');
    }
  });

  // 5.5 Map layout attributes (align, valign) to standard modern classes
  $('*[align]').each((_, elem) => {
    const alignVal = $(elem).attr('align')?.toLowerCase();
    if (alignVal === 'center') {
      $(elem).addClass('apsrtc-align-center');
    } else if (alignVal === 'right') {
      $(elem).addClass('apsrtc-align-right');
    } else if (alignVal === 'justify') {
      $(elem).addClass('apsrtc-align-justify');
    }
  });

  $('*[valign]').each((_, elem) => {
    const valignVal = $(elem).attr('valign')?.toLowerCase();
    if (valignVal === 'top') {
      $(elem).addClass('apsrtc-valign-top');
    } else if (valignVal === 'middle') {
      $(elem).addClass('apsrtc-valign-middle');
    } else if (valignVal === 'bottom') {
      $(elem).addClass('apsrtc-valign-bottom');
    }
  });

  // 5.6 Strip legacy styling tags, colors, and layout-breaking attributes
  $('font').each((_, elem) => {
    $(elem).replaceWith(function() {
      return $('<span>').append($(this).contents());
    });
  });

  $('center').each((_, elem) => {
    $(elem).replaceWith(function() {
      return $('<div class="apsrtc-center">').append($(this).contents());
    });
  });

  $('blink').each((_, elem) => {
    $(elem).replaceWith(function() {
      return $('<span>').append($(this).contents());
    });
  });

  // Strip layout attributes
  $('*').removeAttr('bgcolor');
  $('*').removeAttr('background');
  $('*').removeAttr('bordercolor');
  $('*').removeAttr('align');
  $('*').removeAttr('valign');
  $('table, tr, td, th, div, p').removeAttr('width');
  $('table, tr, td, th, div, p').removeAttr('height');

  // Strip inline family/size styles, and remove layout-breaking absolute positioning
  $('*').each((_, elem) => {
    const style = $(elem).attr('style');
    if (style) {
      let cleanedStyle = style
        .replace(/font-family:[^;]+;?/gi, '')
        .replace(/font-size:[^;]+;?/gi, '')
        .replace(/background-color:[^;]+;?/gi, '')
        .replace(/color:\s*(blue|red|green|black|#000000);?/gi, '');

      // Strip absolute positioning (from Dreamweaver/FrontPage absolute layers)
      if (cleanedStyle.toLowerCase().includes('position:')) {
        cleanedStyle = cleanedStyle
          .replace(/position:\s*absolute;?/gi, '')
          .replace(/left:\s*[^;]+;?/gi, '')
          .replace(/top:\s*[^;]+;?/gi, '')
          .replace(/right:\s*[^;]+;?/gi, '')
          .replace(/bottom:\s*[^;]+;?/gi, '')
          .replace(/z-index:\s*[^;]+;?/gi, '')
          .replace(/width:\s*[^;]+;?/gi, '')
          .replace(/height:\s*[^;]+;?/gi, '');
      }

      // Strip inline width and height from table/layout elements to ensure mobile responsiveness
      const tagName = $(elem).prop('tagName')?.toLowerCase();
      if (tagName && ['table', 'tr', 'td', 'th', 'tbody', 'thead', 'div', 'p', 'span'].includes(tagName)) {
        cleanedStyle = cleanedStyle
          .replace(/width:\s*[^;]+;?/gi, '')
          .replace(/height:\s*[^;]+;?/gi, '');
      }

      if (cleanedStyle.trim()) {
        $(elem).attr('style', cleanedStyle);
      } else {
        $(elem).removeAttr('style');
      }
    }
  });

  // 6. Fix links inside the snapshotted HTML and open documents in a new tab
  $('a').each((_, elem) => {
    const href = $(elem).attr('href');
    if (href) {
      const newHref = toLocalOfficialHref(href);
      $(elem).attr('href', newHref);
      
      const isDoc = /\.(pdf|docx?|xlsx?|pptx?|zip|rar)$/i.test(newHref.split('?')[0]);
      if (isDoc) {
        $(elem).attr('target', '_blank');
        $(elem).attr('rel', 'noopener noreferrer');
      }
    }
  });

  // 7. Fix image paths inside the snapshotted HTML
  $('img').each((_, elem) => {
    const src = $(elem).attr('src');
    if (src) {
      const decodedSrc = decodeURIComponent(src);
      if (decodedSrc.includes('Award MD sir.JPG')) {
        $(elem).attr('src', '/apsrtc/images/Award MD sir.JPG');
      } else if (decodedSrc.includes('apsrtclivetrack.JPG')) {
        $(elem).attr('src', '/apsrtc/images/Live Track.jpg');
      } else if (decodedSrc.includes('ASRTU 2024-2025.jpg')) {
        $(elem).attr('src', '/apsrtc/images/asrtu-fuel-effiency-awards.gif');
      } else if (decodedSrc.includes('APSRTC Skoch Award 2024.jpg') || decodedSrc.includes('Skoch Awards 2024.JPG')) {
        $(elem).attr('src', '/apsrtc/Skoch Awards 2024.JPG');
      } else if (decodedSrc.includes('APARTC won 5 ASRTU')) {
        $(elem).attr('src', '/apsrtc/ASRTU310120202020-01-31 at 17.14.02.jpeg');
      } else if (decodedSrc.includes('Screenshot 2021-08-26 at 12.57.jpg') || decodedSrc.includes('Screenshot 2021-08-26')) {
        $(elem).attr('src', '/apsrtc/images/Screenshot 2021-08-26 at 12.57_1.jpg');
      } else if (decodedSrc.includes('New Award.jpg')) {
        $(elem).attr('src', '/apsrtc/apsrtc Award.jpg');
      } else if (decodedSrc.includes('worldrecanim.gif')) {
        $(elem).attr('src', '/apsrtc/images/guinness_img.gif');
      } else if (!src.startsWith('/') && !src.startsWith('http')) {
        $(elem).attr('src', `/apsrtc/${src}`);
      }
    }
  });

  return $('body').html() || rawHtml;
}

export default async function ApsrtcMirrorPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const page = manifest.pages[getMirrorKey(slug)];

  if (!page) {
    notFound();
  }

  const cleanedHtml = cleanMirrorHtml(page.html);

  return (
    <MirrorPageClient page={page} cleanedHtml={cleanedHtml} />
  );
}
