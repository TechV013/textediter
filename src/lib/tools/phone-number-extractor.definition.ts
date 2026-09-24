import type { ToolDefinition } from './types';
import {
  extractPhoneNumbers,
  PHONE_NUMBER_EXTRACTOR_DEFAULT_OPTIONS,
  type PhoneNumberExtractorOptions,
} from './phone-number-extractor';

function asPhoneNumberExtractorOptions(options: Record<string, unknown>): PhoneNumberExtractorOptions {
  return {
    deduplicate: Boolean(options.deduplicate ?? PHONE_NUMBER_EXTRACTOR_DEFAULT_OPTIONS.deduplicate),
    preserveOrder: Boolean(options.preserveOrder ?? PHONE_NUMBER_EXTRACTOR_DEFAULT_OPTIONS.preserveOrder),
  };
}

export const phoneNumberExtractorTool: ToolDefinition = {
  slug: 'phone-number-extractor',
  name: 'Phone Number Extractor',
  category: 'extraction',
  shortDescription: 'Find potential phone numbers hiding in any block of text.',
  description:
    'Paste text and identify patterns that look like phone numbers in common international and domestic formats. Results are labelled "potential" because the tool does not validate whether a number is real or in service. Everything stays in your browser.',
  seoTitle: 'Phone Number Extractor — Find Phone Numbers Online | TextFixer',
  metaDescription:
    'Find potential phone numbers in any text. Free, private tool that works in your browser. Copy or download results — no signup.',
  keywords: [
    'phone number extractor',
    'extract phone numbers',
    'find phone numbers',
    'phone finder',
    'phone number scanner',
  ],
  searchIntents: [
    'phone number extractor online',
    'extract phone numbers from text',
    'find phone numbers in text',
  ],
  process: (input, options) =>
    extractPhoneNumbers(input, asPhoneNumberExtractorOptions(options)),
  defaultOptions: { ...PHONE_NUMBER_EXTRACTOR_DEFAULT_OPTIONS },
  options: [
    {
      type: 'checkbox',
      key: 'deduplicate',
      label: 'Remove duplicates',
      description: 'Keep only one copy of each number.',
      defaultValue: true,
    },
    {
      type: 'checkbox',
      key: 'preserveOrder',
      label: 'Preserve original order',
      description: 'Show numbers in the order they appear in the text.',
      defaultValue: true,
    },
  ],
  relatedTools: ['email-extractor', 'url-extractor', 'text-cleaner'],
  howToSteps: [
    'Paste or type text that may contain phone numbers.',
    'Toggle deduplication and sort options if needed.',
    'Press Extract Phone Numbers (or Ctrl/Cmd + Enter).',
    'Copy or download the extracted list.',
  ],
  useCases: [
    'Collecting phone numbers from a copied contact list',
    'Pulling numbers from an invoice or receipt',
    'Extracting phone numbers from a webpage or document',
    'Gathering contact info from notes or chat logs',
  ],
  examples: [
    {
      title: 'Extract US and international numbers',
      input: 'Call +1 555 123 4567 or +91 98765 43210. Fax: (555) 987-6543.',
      output: '+1 555 123 4567\n+91 98765 43210\n(555) 987-6543',
      optionsNote: 'Deduplication enabled.',
    },
  ],
  faq: [
    {
      question: 'Does this verify that the phone numbers are real?',
      answer:
        'No. The tool identifies text patterns that look like phone numbers. It does not check whether a number is assigned, in service, or reachable.',
    },
    {
      question: 'What formats are detected?',
      answer:
        'The tool looks for common international formats (e.g. +1 555 123 4567), parenthesised area codes, and numbers separated by spaces, hyphens, or dots. It is not exhaustive for every country format.',
    },
  ],
  actionLabel: 'Extract Phone Numbers',
  supportsDownload: true,
};
