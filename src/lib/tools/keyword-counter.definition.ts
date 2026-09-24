import type { ToolDefinition } from './types';
import {
  KEYWORD_COUNTER_DEFAULT_OPTIONS,
  countKeywordFrequency,
  type KeywordCounterOptions,
} from './keyword-counter';

function asKeywordCounterOptions(options: Record<string, unknown>): KeywordCounterOptions {
  return {
    minLength: Number(options.minLength ?? KEYWORD_COUNTER_DEFAULT_OPTIONS.minLength),
    topN: Number(options.topN ?? KEYWORD_COUNTER_DEFAULT_OPTIONS.topN),
  };
}

export const keywordCounterTool: ToolDefinition = {
  slug: 'keyword-counter',
  name: 'Keyword Counter',
  category: 'analysis',
  shortDescription: 'Count word frequency and find most common words.',
  description:
    'Analyze word frequency in your text. See which words appear most often, ranked by count. Filter by minimum word length and control how many results to show. Perfect for SEO, content analysis, and research.',
  seoTitle: 'Keyword Counter — Word Frequency Analysis | TextFixer',
  metaDescription:
    'Count word frequency and find most common keywords in your text. Analyze word usage for SEO and content optimization. Free keyword counter tool.',
  keywords: [
    'keyword counter',
    'word frequency',
    'word frequency counter',
    'most common words',
    'keyword analysis',
  ],
  searchIntents: ['count word frequency', 'find most common words', 'keyword frequency analysis'],
  process: (input, options) => countKeywordFrequency(input, asKeywordCounterOptions(options)),
  defaultOptions: { ...KEYWORD_COUNTER_DEFAULT_OPTIONS },
  options: [
    {
      type: 'text',
      key: 'minLength',
      label: 'Minimum word length',
      description: 'Ignore words shorter than this (default: 3, to skip "a", "of", "to").',
      defaultValue: '3',
      placeholder: '3',
    },
    {
      type: 'text',
      key: 'topN',
      label: 'Number of results',
      description: 'Show top N most common words (default: 20).',
      defaultValue: '20',
      placeholder: '20',
    },
  ],
  relatedTools: ['keyword-density', 'text-statistics', 'word-counter'],
  howToSteps: [
    'Paste your text into the input area.',
    'Set minimum word length to filter short words.',
    'Choose how many results to show.',
    'View the ranked list of most common words.',
  ],
  useCases: [
    'SEO keyword research and analysis',
    'Finding overused words in writing',
    'Content topic analysis',
    'Research and text mining',
  ],
  examples: [
    {
      title: 'Find most common words',
      input: 'the cat sat on the mat. the cat was happy.',
      output: '1. the — 3\n2. cat — 2\n3. sat — 1',
      optionsNote: 'Minimum length: 3 characters',
    },
  ],
  faq: [
    {
      question: 'Why set a minimum word length?',
      answer:
        'To filter out common short words like "a", "an", "of", "to", "is" that appear frequently but are not meaningful keywords. A minimum of 3-4 characters typically works well.',
    },
    {
      question: 'Are words case-sensitive?',
      answer:
        'No. "Hello", "hello", and "HELLO" are counted as the same word.',
    },
  ],
  actionLabel: 'Count Keywords',
  supportsDownload: true,
};
