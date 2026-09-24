import type { ToolCategory, ToolDefinition } from './types';
import { TOOL_CATEGORY_LABELS } from './types';
import { textCleanerTool } from './text-cleaner.definition';
import { caseConverterTool } from './case-converter.definition';
import { findReplaceTool } from './find-replace.definition';
import { sortTextTool } from './sort-text.definition';
import { addPrefixSuffixTool } from './add-prefix-suffix.definition';
import { addLineNumbersTool } from './add-line-numbers.definition';
import { textToOneLineTool } from './text-to-one-line.definition';
import { wordCounterTool } from './word-counter.definition';
import { characterCounterTool } from './character-counter.definition';
import { textStatisticsTool } from './text-statistics.definition';
import { readingTimeTool } from './reading-time.definition';
import { readabilityCheckerTool } from './readability-checker.definition';
import { keywordCounterTool } from './keyword-counter.definition';
import { keywordDensityTool } from './keyword-density.definition';
import { emailExtractorTool } from './email-extractor.definition';
import { urlExtractorTool } from './url-extractor.definition';
import { phoneNumberExtractorTool } from './phone-number-extractor.definition';
import { textDiffTool } from './text-diff.definition';
import { compareTwoListsTool } from './compare-two-lists.definition';
import { removeExtraSpacesTool } from './remove-extra-spaces.definition';
import { removeLineBreaksTool } from './remove-line-breaks.definition';
import { jsonFormatterTool } from './json-formatter.definition';
import { jsonValidatorTool } from './json-validator.definition';
import { htmlToTextTool } from './html-to-text.definition';
import { invisibleCharacterDetectorTool } from './invisible-character-detector.definition';

/**
 * Central tool registry.
 * Add new tools by importing their definition and appending here.
 */
const tools: ToolDefinition[] = [
  textCleanerTool,
  caseConverterTool,
  findReplaceTool,
  sortTextTool,
  addPrefixSuffixTool,
  addLineNumbersTool,
  textToOneLineTool,
  wordCounterTool,
  characterCounterTool,
  textStatisticsTool,
  readingTimeTool,
  readabilityCheckerTool,
  keywordCounterTool,
  keywordDensityTool,
  emailExtractorTool,
  urlExtractorTool,
  phoneNumberExtractorTool,
  textDiffTool,
  compareTwoListsTool,
  removeExtraSpacesTool,
  removeLineBreaksTool,
  jsonFormatterTool,
  jsonValidatorTool,
  htmlToTextTool,
  invisibleCharacterDetectorTool,
];

const bySlug = new Map(tools.map((tool) => [tool.slug, tool]));

export function getAllTools(): ToolDefinition[] {
  return tools;
}

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return bySlug.get(slug);
}

export function getToolsByCategory(category: ToolCategory): ToolDefinition[] {
  return tools.filter((tool) => tool.category === category);
}

export function getRelatedTools(slugs: string[]): ToolDefinition[] {
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((tool): tool is ToolDefinition => Boolean(tool));
}

/** Popular tools featured on the homepage (order matters). */
export const POPULAR_TOOL_SLUGS = [
  'text-cleaner',
  'word-counter',
  'character-counter',
  'case-converter',
  'text-diff',
  'email-extractor',
  'find-and-replace',
  'sort-text',
  'readability-checker',
  'text-statistics',
] as const;

export function getPopularTools(): ToolDefinition[] {
  return POPULAR_TOOL_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (tool): tool is ToolDefinition => Boolean(tool),
  );
}

export function getCategoryLabel(category: ToolCategory): string {
  return TOOL_CATEGORY_LABELS[category];
}

export type { ToolDefinition };
export { TOOL_CATEGORY_LABELS };
