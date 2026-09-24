import { describe, expect, it } from 'vitest';
import {
  countCharacters,
  countWords,
  deduplicateLines,
  normalizeNewlines,
  removeBlankLines,
} from '../../src/lib/utilities/text';
import { searchTools, buildSearchDocuments } from '../../src/lib/tools/search';
import { textCleanerTool } from '../../src/lib/tools/text-cleaner.definition';

describe('text utilities', () => {
  it('normalizes mixed newlines', () => {
    expect(normalizeNewlines('a\r\nb\rc')).toBe('a\nb\nc');
  });

  it('counts unicode characters as code points', () => {
    expect(countCharacters('🙂a')).toBe(2);
  });

  it('counts words with unicode letters', () => {
    expect(countWords('naïve café')).toBe(2);
  });

  it('removes blank lines including whitespace-only', () => {
    expect(removeBlankLines('a\n  \n\nb')).toBe('a\nb');
  });

  it('deduplicates with trim option', () => {
    expect(
      deduplicateLines(' a \na\nb', { trimWhitespace: true, preserveOrder: true }),
    ).toBe(' a \nb');
  });
});

describe('tool search', () => {
  it('finds text cleaner for remove spaces intent', () => {
    const docs = buildSearchDocuments([textCleanerTool]);
    const results = searchTools(docs, 'remove spaces');
    expect(results[0]?.slug).toBe('text-cleaner');
  });
});
