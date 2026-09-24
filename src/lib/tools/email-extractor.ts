import type { ToolProcessResult } from './types';

export interface EmailExtractorOptions {
  deduplicate: boolean;
  preserveOrder: boolean;
}

export const EMAIL_EXTRACTOR_DEFAULT_OPTIONS: EmailExtractorOptions = {
  deduplicate: true,
  preserveOrder: true,
};

/**
 * Extract email-like strings from text.
 * This identifies patterns that look like email addresses; it does not
 * verify whether any address actually exists or is deliverable.
 */
export function extractEmails(
  input: string,
  options: EmailExtractorOptions,
): ToolProcessResult {
  if (input.length === 0) {
    return {
      output: '',
      message: 'Paste some text to extract emails from.',
    };
  }

  // Unicode-aware: \p{L} matches any Unicode letter
  const pattern = /[\p{L}\d._%+\-]+@[\p{L}\d.\-]+\.[\p{L}]{2,}/gu;
  const raw = input.match(pattern) ?? [];

  let emails = options.preserveOrder ? raw : [...raw].sort((a, b) => a.localeCompare(b));

  if (options.deduplicate) {
    const seen = new Set<string>();
    emails = emails.filter((email) => {
      const lower = email.toLowerCase();
      if (seen.has(lower)) return false;
      seen.add(lower);
      return true;
    });
  }

  const output = emails.join('\n');
  const stats = [
    { label: 'Emails found', value: raw.length },
    { label: 'Unique emails', value: emails.length },
  ];

  const message =
    emails.length === 0
      ? 'No email addresses found in the text.'
      : `Extracted ${emails.length} email address${emails.length === 1 ? '' : 's'}.`;

  return { output, stats, message };
}
