import type { ToolProcessResult } from './types';

export interface UrlExtractorOptions {
  deduplicate: boolean;
  preserveOrder: boolean;
}

export const URL_EXTRACTOR_DEFAULT_OPTIONS: UrlExtractorOptions = {
  deduplicate: true,
  preserveOrder: true,
};

/**
 * Extract URLs from text.
 * Supports http://, https://, and bare "www." prefixed URLs.
 * Trailing punctuation (periods, commas, closing parens) is stripped to
 * avoid false positives. No network requests are made.
 */
export function extractUrls(
  input: string,
  options: UrlExtractorOptions,
): ToolProcessResult {
  if (input.length === 0) {
    return {
      output: '',
      message: 'Paste some text to extract URLs from.',
    };
  }

  const pattern = /\b(?:https?:\/\/|www\.)[^\s<>"')\]]+/gi;
  const rawMatches = input.match(pattern) ?? [];

  const urls = rawMatches.map((url) => {
    let cleaned = url;
    // Strip trailing punctuation that is likely not part of the URL
    cleaned = cleaned.replace(/[.,;:!?)\]}>'"]+$/, '');
    return cleaned;
  });

  let result = options.preserveOrder ? urls : [...urls].sort((a, b) => a.localeCompare(b));

  if (options.deduplicate) {
    const seen = new Set<string>();
    result = result.filter((url) => {
      const lower = url.toLowerCase();
      if (seen.has(lower)) return false;
      seen.add(lower);
      return true;
    });
  }

  const output = result.join('\n');
  const stats = [
    { label: 'URLs found', value: urls.length },
    { label: 'Unique URLs', value: result.length },
  ];

  const message =
    result.length === 0
      ? 'No URLs found in the text.'
      : `Extracted ${result.length} URL${result.length === 1 ? '' : 's'}.`;

  return { output, stats, message };
}
