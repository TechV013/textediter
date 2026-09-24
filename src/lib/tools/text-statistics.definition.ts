import type { ToolDefinition } from './types';
import {
  TEXT_STATISTICS_DEFAULT_OPTIONS,
  analyzeTextStatistics,
  type TextStatisticsOptions,
} from './text-statistics';

function asTextStatisticsOptions(options: Record<string, unknown>): TextStatisticsOptions {
  return {
    showAdvanced: Boolean(options.showAdvanced ?? TEXT_STATISTICS_DEFAULT_OPTIONS.showAdvanced),
  };
}

export const textStatisticsTool: ToolDefinition = {
  slug: 'text-statistics',
  name: 'Text Statistics',
  category: 'analysis',
  shortDescription: 'Comprehensive text analytics dashboard.',
  description:
    'Get detailed statistics about your text including word count, character count, sentence count, paragraphs, average word length, average sentence length, and more. A complete analytics dashboard for writers.',
  seoTitle: 'Text Statistics — Comprehensive Text Analytics | TextFixer',
  metaDescription:
    'Analyze your text with comprehensive statistics. Count words, characters, sentences, paragraphs, and get averages. Free text analytics tool.',
  keywords: [
    'text statistics',
    'text analytics',
    'text analysis tool',
    'comprehensive word counter',
    'text metrics',
  ],
  searchIntents: ['text statistics', 'analyze text', 'text analytics'],
  process: (input, options) => analyzeTextStatistics(input, asTextStatisticsOptions(options)),
  defaultOptions: { ...TEXT_STATISTICS_DEFAULT_OPTIONS },
  options: [
    {
      type: 'checkbox',
      key: 'showAdvanced',
      label: 'Show advanced statistics',
      description: 'Display averages and longest word.',
      defaultValue: true,
    },
  ],
  relatedTools: ['word-counter', 'character-counter', 'readability-checker', 'reading-time'],
  howToSteps: [
    'Paste your text into the input area.',
    'View comprehensive statistics instantly.',
    'Toggle advanced statistics if needed.',
  ],
  useCases: [
    'Analyzing writing style and patterns',
    'Getting complete document metrics',
    'Comparing text complexity',
    'Writing progress tracking',
  ],
  examples: [
    {
      title: 'Analyze a paragraph',
      input: 'The quick brown fox jumps over the lazy dog. This is a test sentence.',
      output: 'Words: 15, Sentences: 2, Avg. sentence length: 7.5 words',
      optionsNote: 'Full statistics provided',
    },
  ],
  faq: [
    {
      question: 'What statistics are included?',
      answer:
        'Words, characters (with and without spaces), sentences, paragraphs, lines, average word length, average sentence length, and longest word.',
    },
    {
      question: 'How is average sentence length calculated?',
      answer:
        'Total words divided by total sentences. This metric helps assess text complexity and readability.',
    },
  ],
  actionLabel: 'Analyze Text',
  supportsDownload: false,
};
