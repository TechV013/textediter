import { describe, expect, it } from 'vitest';
import { cleanText, TEXT_CLEANER_DEFAULT_OPTIONS } from '../../src/lib/tools/text-cleaner';

describe('cleanText', () => {
  it('handles empty input', () => {
    const result = cleanText('', TEXT_CLEANER_DEFAULT_OPTIONS);
    expect(result.output).toBe('');
    expect(result.message).toMatch(/paste/i);
  });

  it('trims, collapses spaces, and removes blank lines by default', () => {
    const input = 'Hello,   world!\n\n  Extra   spaces  ';
    const result = cleanText(input, TEXT_CLEANER_DEFAULT_OPTIONS);
    expect(result.output).toBe('Hello, world!\nExtra spaces');
  });

  it('normalizes CRLF line endings', () => {
    const result = cleanText('a  \r\n\r\nb  ', {
      ...TEXT_CLEANER_DEFAULT_OPTIONS,
      removeBlankLines: true,
      removeExtraSpaces: true,
      trimWhitespace: true,
    });
    expect(result.output).toBe('a\nb');
  });

  it('removes duplicate lines while preserving order', () => {
    const result = cleanText('b\na\nb\nc', {
      ...TEXT_CLEANER_DEFAULT_OPTIONS,
      removeBlankLines: false,
      removeExtraSpaces: false,
      trimWhitespace: false,
      removeDuplicateLines: true,
    });
    expect(result.output).toBe('b\na\nc');
  });

  it('ignores case for duplicates when enabled', () => {
    const result = cleanText('Hello\nhello\nHELLO', {
      ...TEXT_CLEANER_DEFAULT_OPTIONS,
      removeBlankLines: false,
      removeExtraSpaces: false,
      trimWhitespace: false,
      removeDuplicateLines: true,
      ignoreCaseDuplicates: true,
    });
    expect(result.output).toBe('Hello');
  });

  it('removes duplicate words', () => {
    const result = cleanText('one two one three two', {
      ...TEXT_CLEANER_DEFAULT_OPTIONS,
      removeBlankLines: false,
      removeExtraSpaces: true,
      trimWhitespace: true,
      removeDuplicateWords: true,
      removeDuplicateLines: false,
    });
    expect(result.output).toBe('one two three');
  });

  it('joins lines when removeLineBreaks is enabled', () => {
    const result = cleanText('line one\nline two', {
      ...TEXT_CLEANER_DEFAULT_OPTIONS,
      removeLineBreaks: true,
    });
    expect(result.output).toBe('line one line two');
  });

  it('handles Unicode and emoji without crashing', () => {
    const input = 'café 🙂\n\ncafé 🙂';
    const result = cleanText(input, {
      ...TEXT_CLEANER_DEFAULT_OPTIONS,
      removeDuplicateLines: true,
    });
    expect(result.output).toContain('café');
    expect(result.output).toContain('🙂');
    expect(result.stats?.find((s) => s.label === 'Final lines')?.value).toBe(1);
  });

  it('removes punctuation when requested', () => {
    const result = cleanText('Hello, world!', {
      ...TEXT_CLEANER_DEFAULT_OPTIONS,
      removePunctuation: true,
      removeBlankLines: false,
    });
    expect(result.output).toBe('Hello world');
  });

  it('reports character stats', () => {
    const result = cleanText('abc', TEXT_CLEANER_DEFAULT_OPTIONS);
    const removed = result.stats?.find((s) => s.label === 'Characters removed');
    expect(removed?.value).toBe(0);
  });
});
