import type { ToolProcessResult } from './types';

export interface PhoneNumberExtractorOptions {
  deduplicate: boolean;
  preserveOrder: boolean;
}

export const PHONE_NUMBER_EXTRACTOR_DEFAULT_OPTIONS: PhoneNumberExtractorOptions = {
  deduplicate: true,
  preserveOrder: true,
};

/**
 * Extract potential phone numbers from text.
 *
 * This uses permissive patterns for common international and domestic formats
 * (e.g. +1 555 123 4567, +91 98765 43210, (555) 123-4567, 555-123-4567).
 *
 * IMPORTANT: these are *potential* phone numbers. This tool does NOT verify
 * whether a number is valid or in service. The output wording must always
 * use "potential" rather than "valid".
 */
export function extractPhoneNumbers(
  input: string,
  options: PhoneNumberExtractorOptions,
): ToolProcessResult {
  if (input.length === 0) {
    return {
      output: '',
      message: 'Paste some text to extract phone numbers from.',
    };
  }

  // Patterns for common phone number formats:
  // +<digits> with spaces/dashes/dots between groups
  // (area) number
  // plain digit sequences with separators (spaces, dashes, dots)
  const patterns = [
    /\+\d{1,4}[\s.\-]?\d{2,4}[\s.\-]?\d{2,4}[\s.\-]?\d{2,9}/g,
    /\(\d{1,5}\)[\s.\-]?\d{1,5}[\s.\-]?\d{1,5}/g,
    /\b\d{2,5}[\s.\-]\d{2,5}[\s.\-]\d{2,5}\b/g,
  ];

  const raw: string[] = [];
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(input)) !== null) {
      raw.push(match[0]);
    }
  }

  // Remove matches that are substrings of longer matches
  const filtered = raw.filter((a) =>
    raw.every((b) => a === b || !b.includes(a)),
  );

  // Clean trailing non-digit characters from each match
  const cleaned = filtered.map((m) => m.replace(/[\s.\-]+$/, '').trim());

  // Deduplicate by digit content (strips all non-digits to compare)
  let unique = cleaned;
  if (options.deduplicate) {
    const seen = new Set<string>();
    unique = cleaned.filter((num) => {
      const key = num.replace(/\D/g, '');
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  const result = options.preserveOrder ? [...unique] : [...unique].sort((a, b) => a.localeCompare(b));

  const output = result.join('\n');
  const stats = [
    { label: 'Potential phone numbers', value: result.length },
  ];

  const message =
    result.length === 0
      ? 'No potential phone numbers found in the text.'
      : `Found ${result.length} potential phone number${result.length === 1 ? '' : 's'}.`;

  return { output, stats, message };
}
