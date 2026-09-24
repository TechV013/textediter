import type { ToolDefinition } from './types';
import {
  KEYWORD_DENSITY_DEFAULT_OPTIONS,
  analyzeKeywordDensity,
  type KeywordDensityOptions,
} from './keyword-density';

function asKeywordDensityOptions(options: Record<string, unknown>): KeywordDensityOptions {
  return {
    keyword: String(options.keyword ?? KEYWORD_DENSITY_DEFAULT_OPTIONS.keyword),
    caseSensitive: Boolean(options.caseSensitive ?? KEYWORD_DENSITY_DEFAULT_OPTIONS.caseSensitive),
  };
}

export const keywordDensityTool: ToolDefinition = {
  slug: 'keyword-density',
  name: 'Keyword Density Calculator',
  category: 'analysis',
  shortDescription: 'Calculate keyword density percentage for SEO.',
  description:
    'Calculate keyword density percentage in your text. Find out how often a specific keyword appears relative to total word count. Perfect for SEO optimization and content analysis. Recommended density: 0.5% - 2.5%.',
  seoTitle: 'Keyword Density Calculator — SEO Keyword Analysis | TextFixer',
  metaDescription:
    'Calculate keyword density percentage for SEO optimization. Analyze keyword usage and avoid keyword stuffing. Free keyword density tool.',
  keywords: [
    'keyword density',
    'keyword density calculator',
    'seo keyword density',
    'keyword percentage',
    'keyword analysis',
  ],
  searchIntents: ['calculate keyword density', 'keyword density checker', 'seo keyword tool'],
  process: (input, options) => analyzeKeywordDensity(input, asKeywordDensityOptions(options)),
  defaultOptions: { ...KEYWORD_DENSITY_DEFAULT_OPTIONS },
  options: [
    {
      type: 'text',
      key: 'keyword',
      label: 'Keyword',
      description: 'The keyword or phrase to analyze.',
      defaultValue: '',
      placeholder: 'e.g., "marketing"',
    },
    {
      type: 'checkbox',
      key: 'caseSensitive',
      label: 'Case-sensitive matching',
      description: 'Distinguish between "Marketing" and "marketing".',
      defaultValue: false,
    },
  ],
  relatedTools: ['keyword-counter', 'text-statistics', 'word-counter'],
  howToSteps: [
    'Paste your text into the input area.',
    'Enter the keyword you want to analyze.',
    'View the keyword density percentage.',
    'Check the feedback for SEO recommendations.',
  ],
  useCases: [
    'SEO content optimization',
    'Avoiding keyword stuffing penalties',
    'Analyzing competitor content',
    'Meeting SEO keyword targets',
  ],
  examples: [
    {
      title: 'Calculate keyword density',
      input: 'SEO is important. Good SEO helps rankings. Learn SEO today.',
      output: 'Keyword: "SEO", Density: 27.3%, Occurrences: 3, Total words: 11',
      optionsNote: 'Keyword: "SEO"',
    },
  ],
  faq: [
    {
      question: 'What is a good keyword density?',
      answer:
        'For SEO, aim for 0.5% - 2.5% keyword density. Below 0.5% may be too low to rank. Above 2.5% may be considered keyword stuffing and hurt rankings.',
    },
    {
      question: 'How is keyword density calculated?',
      answer:
        'Keyword density = (Number of times keyword appears / Total words) × 100. For example, if a keyword appears 3 times in 100 words, the density is 3%.',
    },
    {
      question: 'Should I use exact match or case-insensitive?',
      answer:
        'For most SEO purposes, use case-insensitive matching. Search engines typically treat "Marketing" and "marketing" as the same keyword.',
    },
  ],
  actionLabel: 'Calculate Density',
  supportsDownload: false,
};
