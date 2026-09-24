import type { ToolDefinition } from './types';
import {
  CHARACTER_COUNTER_DEFAULT_OPTIONS,
  countCharacterStats,
  type CharacterCounterOptions,
} from './character-counter';

function asCharacterCounterOptions(options: Record<string, unknown>): CharacterCounterOptions {
  return {
    countSpaces: Boolean(options.countSpaces ?? CHARACTER_COUNTER_DEFAULT_OPTIONS.countSpaces),
    countNewlines: Boolean(options.countNewlines ?? CHARACTER_COUNTER_DEFAULT_OPTIONS.countNewlines),
  };
}

export const characterCounterTool: ToolDefinition = {
  slug: 'character-counter',
  name: 'Character Counter',
  category: 'analysis',
  shortDescription: 'Count characters with detailed breakdown.',
  description:
    'Count total characters, letters, digits, punctuation, spaces, and line breaks. Get detailed statistics about your text composition.',
  seoTitle: 'Character Counter — Count Characters Online | TextFixer',
  metaDescription:
    'Count characters with detailed breakdown. Track letters, digits, spaces, punctuation, and line breaks. Free online character counter tool.',
  keywords: [
    'character counter',
    'count characters',
    'letter counter',
    'character count tool',
    'text character counter',
  ],
  searchIntents: ['count characters', 'character counter online', 'how many characters'],
  process: (input, options) => countCharacterStats(input, asCharacterCounterOptions(options)),
  defaultOptions: { ...CHARACTER_COUNTER_DEFAULT_OPTIONS },
  options: [
    {
      type: 'checkbox',
      key: 'countSpaces',
      label: 'Count spaces',
      description: 'Include spaces in total character count.',
      defaultValue: true,
    },
    {
      type: 'checkbox',
      key: 'countNewlines',
      label: 'Count line breaks',
      description: 'Include line breaks in total character count.',
      defaultValue: true,
    },
  ],
  relatedTools: ['word-counter', 'text-statistics', 'text-cleaner'],
  howToSteps: [
    'Paste or type your text into the input area.',
    'View instant character breakdown.',
    'Toggle space and line break counting if needed.',
  ],
  useCases: [
    'Checking social media character limits (Twitter, SMS)',
    'Analyzing text composition',
    'Tracking character counts for forms and fields',
    'Meeting character requirements for submissions',
  ],
  examples: [
    {
      title: 'Count characters in a sentence',
      input: 'Hello, World!',
      output: 'Total: 13, Without spaces: 11, Letters: 10',
      optionsNote: 'Detailed breakdown provided',
    },
  ],
  faq: [
    {
      question: 'Does it count spaces and line breaks?',
      answer:
        'Yes, by default. You can toggle these options to exclude spaces or line breaks from the count.',
    },
    {
      question: 'What counts as punctuation?',
      answer:
        'Common punctuation marks like periods, commas, semicolons, quotes, parentheses, and hyphens.',
    },
  ],
  actionLabel: 'Count Characters',
  supportsDownload: false,
};
