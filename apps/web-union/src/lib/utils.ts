/** Strip all HTML tags from a string, collapse whitespace */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** Generate a plain-text excerpt from HTML content */
export function generateExcerpt(html: string, maxLen = 160): string {
  const plain = stripHtml(html);
  return plain.length <= maxLen ? plain : `${plain.substring(0, maxLen)}…`;
}

/** Format a Firestore date string or Date object for display */
export function formatDate(date: Date | string | null | undefined, locale = 'en-IN'): string {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
}
