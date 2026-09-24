import type { ToolProcessResult } from './types';

export interface HtmlToTextOptions {
  preserveLineBreaks: boolean;
  trimWhitespace: boolean;
}

export const HTML_TO_TEXT_DEFAULT_OPTIONS: HtmlToTextOptions = {
  preserveLineBreaks: true,
  trimWhitespace: true,
};

export function htmlToText(input: string, options: HtmlToTextOptions): ToolProcessResult {
  if (!input.trim()) {
    return { output: '', message: 'No input provided.' };
  }

  // Add line breaks around block elements
  let text = input
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/tr>/gi, '\n')
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<li[^>]*>/gi, '  - ')
    .replace(/<tr[^>]*>/gi, '')
    .replace(/<th[^>]*>/gi, '')
    .replace(/<td[^>]*>/gi, '  ');

  // Remove script and style tags and their content
  text = text.replace(/<script[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[\s\S]*?<\/style>/gi, '');

  // Remove all remaining HTML tags
  text = text.replace(/<[^>]+>/g, '');

  // Decode common HTML entities
  text = text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

  // Handle whitespace
  if (options.preserveLineBreaks) {
    text = text.replace(/\n{3,}/g, '\n\n');
  } else {
    text = text.replace(/\n/g, ' ');
    text = text.replace(/ {2,}/g, ' ');
  }

  if (options.trimWhitespace) {
    text = text.trim();
  }

  const tagsRemoved = (input.match(/<[^>]+>/g) || []).length;

  return {
    output: text,
    stats: [
      { label: 'HTML tags removed', value: tagsRemoved },
      { label: 'Output length', value: text.length + ' chars' },
    ],
    message: 'HTML stripped. Text extracted.',
  };
}
