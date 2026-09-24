import type { ToolDefinition } from './types';
import {
  WORD_COUNTER_DEFAULT_OPTIONS,
  countWordStats,
  type WordCounterOptions,
} from './word-counter';

function asWordCounterOptions(options: Record<string, unknown>): WordCounterOptions {
  return {
    countSpaces: Boolean(options.countSpaces ?? WORD_COUNTER_DEFAULT_OPTIONS.countSpaces),
  };
}

export const wordCounterTool: ToolDefinition = {
  slug: 'word-counter',
  name: 'Word Counter',
  category: 'analysis',
  shortDescription: 'Count words, characters, lines, and paragraphs.',
  description:
    'Instantly count words, characters (with and without spaces), lines, and paragraphs in your text. Perfect for writers, students, and anyone tracking word counts.',
  seoTitle: 'Word Counter — Count Words and Characters Online | TextFixer',
  metaDescription:
    'Count words, characters, lines, and paragraphs instantly. Free online word counter with detailed statistics. Perfect for essays, articles, and documents.',
  keywords: [
    'word counter',
    'character counter',
    'count words online',
    'word count tool',
    'text counter',
  ],
  searchIntents: ['count words', 'word counter online', 'how many words'],
  process: (input, options) => countWordStats(input, asWordCounterOptions(options)),
  defaultOptions: { ...WORD_COUNTER_DEFAULT_OPTIONS },
  options: [
    {
      type: 'checkbox',
      key: 'countSpaces',
      label: 'Count spaces in characters',
      description: 'Include spaces in character count.',
      defaultValue: true,
    },
  ],
  relatedTools: ['character-counter', 'text-statistics', 'reading-time'],
  howToSteps: [
    'Paste or type your text into the input area.',
    'View instant word, character, line, and paragraph counts.',
    'Toggle space counting if needed.',
  ],
  useCases: [
    'Checking essay or article word counts',
    'Meeting character limits for social media',
    'Tracking writing progress',
    'Verifying document length requirements',
  ],
  examples: [
    {
      title: 'Count a simple sentence',
      input: 'The quick brown fox jumps over the lazy dog.',
      output: 'Words: 9, Characters: 44',
      optionsNote: 'Instant statistics display',
    },
  ],
  faq: [
    {
      question: 'How are words counted?',
      answer:
        'Words are sequences of letters and numbers separated by spaces or punctuation. Hyphenated words count as one word.',
    },
    {
      question: 'What counts as a paragraph?',
      answer:
        'Paragraphs are blocks of text separated by blank lines (two or more newlines in a row).',
    },
  ],
  actionLabel: 'Count Words',
  supportsDownload: false,
};
