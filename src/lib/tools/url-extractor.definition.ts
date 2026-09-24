import type { ToolDefinition } from './types';
import {
  extractUrls,
  URL_EXTRACTOR_DEFAULT_OPTIONS,
  type UrlExtractorOptions,
} from './url-extractor';

function asUrlExtractorOptions(options: Record<string, unknown>): UrlExtractorOptions {
  return {
    deduplicate: Boolean(options.deduplicate ?? URL_EXTRACTOR_DEFAULT_OPTIONS.deduplicate),
    preserveOrder: Boolean(options.preserveOrder ?? URL_EXTRACTOR_DEFAULT_OPTIONS.preserveOrder),
  };
}

export const urlExtractorTool: ToolDefinition = {
  slug: 'url-extractor',
  name: 'URL Extractor',
  category: 'extraction',
  shortDescription: 'Pull every URL out of any block of text in seconds.',
  description:
    'Paste text containing URLs and extract them into a clean list. Supports http, https, and www-prefixed addresses. Deduplicate results and copy them with one click — entirely in your browser.',
  seoTitle: 'URL Extractor — Extract Links from Text Online | TextFixer',
  metaDescription:
    'Extract URLs from any text for free. Private, fast, and works in your browser. Deduplicate and copy links instantly — no account needed.',
  keywords: [
    'url extractor',
    'extract urls',
    'pull links from text',
    'find urls',
    'link extractor',
    'url finder',
  ],
  searchIntents: ['url extractor online', 'extract urls from text', 'find all links in text'],
  process: (input, options) => extractUrls(input, asUrlExtractorOptions(options)),
  defaultOptions: { ...URL_EXTRACTOR_DEFAULT_OPTIONS },
  options: [
    {
      type: 'checkbox',
      key: 'deduplicate',
      label: 'Remove duplicates',
      description: 'Keep only one copy of each URL.',
      defaultValue: true,
    },
    {
      type: 'checkbox',
      key: 'preserveOrder',
      label: 'Preserve original order',
      description: 'Show URLs in the order they appear in the text.',
      defaultValue: true,
    },
  ],
  relatedTools: ['email-extractor', 'phone-number-extractor', 'json-formatter'],
  howToSteps: [
    'Paste or type text that contains URLs.',
    'Toggle deduplication and sort options if needed.',
    'Press Extract URLs (or Ctrl/Cmd + Enter).',
    'Copy or download the extracted list.',
  ],
  useCases: [
    'Collecting all links from a webpage or document',
    'Pulling product URLs from a spreadsheet column',
    'Gathering references from research notes',
    'Extracting links shared in a chat log',
  ],
  examples: [
    {
      title: 'Extract and deduplicate URLs',
      input: 'Visit https://example.com and also https://example.com/page.\nSee http://test.org as well.',
      output: 'https://example.com\nhttps://example.com/page\nhttp://test.org',
      optionsNote: 'Deduplication enabled.',
    },
  ],
  faq: [
    {
      question: 'Does this tool visit or check the URLs?',
      answer:
        'No. It only identifies text patterns that look like URLs. No network requests are made to verify or load them.',
    },
    {
      question: 'Does it support www-only URLs without http?',
      answer:
        'Yes. URLs starting with www. are detected, even without an explicit http:// or https:// prefix.',
    },
  ],
  actionLabel: 'Extract URLs',
  supportsDownload: true,
};
