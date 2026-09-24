import type { ToolDefinition } from './types';
import {
  extractEmails,
  EMAIL_EXTRACTOR_DEFAULT_OPTIONS,
  type EmailExtractorOptions,
} from './email-extractor';

function asEmailExtractorOptions(options: Record<string, unknown>): EmailExtractorOptions {
  return {
    deduplicate: Boolean(options.deduplicate ?? EMAIL_EXTRACTOR_DEFAULT_OPTIONS.deduplicate),
    preserveOrder: Boolean(options.preserveOrder ?? EMAIL_EXTRACTOR_DEFAULT_OPTIONS.preserveOrder),
  };
}

export const emailExtractorTool: ToolDefinition = {
  slug: 'email-extractor',
  name: 'Email Extractor',
  category: 'extraction',
  shortDescription: 'Extract all email addresses from any text instantly.',
  description:
    'Paste any text and extract every email address it contains. Deduplication is on by default so you get a clean, unique list. Everything runs locally in your browser — no text is uploaded.',
  seoTitle: 'Email Extractor — Extract Emails from Text Online | TextFixer',
  metaDescription:
    'Extract email addresses from any text with this free, private online tool. Deduplicate results and copy them in seconds. No signup required.',
  keywords: [
    'email extractor',
    'extract emails',
    'find email addresses',
    'email finder',
    'pull emails from text',
    'email scraper',
  ],
  searchIntents: ['email extractor online', 'extract emails from text', 'find all emails in text'],
  process: (input, options) => extractEmails(input, asEmailExtractorOptions(options)),
  defaultOptions: { ...EMAIL_EXTRACTOR_DEFAULT_OPTIONS },
  options: [
    {
      type: 'checkbox',
      key: 'deduplicate',
      label: 'Remove duplicates',
      description: 'Keep only one copy of each email address.',
      defaultValue: true,
    },
    {
      type: 'checkbox',
      key: 'preserveOrder',
      label: 'Preserve original order',
      description: 'Show emails in the order they appear in the text.',
      defaultValue: true,
    },
  ],
  relatedTools: ['url-extractor', 'phone-number-extractor', 'text-cleaner'],
  howToSteps: [
    'Paste or type text that contains email addresses.',
    'Toggle deduplication and sort options if needed.',
    'Press Extract Emails (or Ctrl/Cmd + Enter).',
    'Copy or download the extracted list.',
  ],
  useCases: [
    'Collecting contact emails from a newsletter or webpage',
    'Pulling email addresses from a copied document',
    'Cleaning up a contact list exported from a spreadsheet',
    'Finding emails in long email threads',
  ],
  examples: [
    {
      title: 'Extract unique emails',
      input: 'Contact us at hello@example.com or support@test.com.\nReach out to hello@example.com again.',
      output: 'hello@example.com\nsupport@test.com',
      optionsNote: 'Deduplication enabled.',
    },
  ],
  faq: [
    {
      question: 'Does this verify that the email addresses exist?',
      answer:
        'No. The tool identifies patterns that look like email addresses. It does not send any verification messages or check whether an address is deliverable.',
    },
    {
      question: 'Is my text uploaded to a server?',
      answer:
        'No. Extraction happens entirely in your browser. Your text is never sent to a TextFixer server.',
    },
  ],
  actionLabel: 'Extract Emails',
  supportsDownload: true,
};
