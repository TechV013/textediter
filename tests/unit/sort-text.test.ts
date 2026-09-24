import { describe, expect, it } from 'vitest';
import { sortTextLines, SORT_TEXT_DEFAULT_OPTIONS } from '../../src/lib/tools/sort-text';

describe('sortTextLines', () => {
  it('handles empty input', () => {
    const result = sortTextLines('', SORT_TEXT_DEFAULT_OPTIONS);
    expect(result.output).toBe('');
    expect(result.message).toMatch(/paste/i);
  });

  it('sorts alphabetically ascending', () => {
    const result = sortTextLines('Zebra\nApple\nBanana', { ...SORT_TEXT_DEFAULT_OPTIONS, sortMode: 'alpha-asc' });
    expect(result.output).toBe('Apple\nBanana\nZebra');
  });

  it('sorts alphabetically descending', () => {
    const result = sortTextLines('Apple\nBanana\nZebra', { ...SORT_TEXT_DEFAULT_OPTIONS, sortMode: 'alpha-desc' });
    expect(result.output).toBe('Zebra\nBanana\nApple');
  });

  it('sorts numerically ascending', () => {
    const result = sortTextLines('100\n5\n42\n7', { ...SORT_TEXT_DEFAULT_OPTIONS, sortMode: 'numeric-asc' });
    expect(result.output).toBe('5\n7\n42\n100');
  });

  it('sorts numerically descending', () => {
    const result = sortTextLines('5\n7\n42\n100', { ...SORT_TEXT_DEFAULT_OPTIONS, sortMode: 'numeric-desc' });
    expect(result.output).toBe('100\n42\n7\n5');
  });

  it('sorts by length ascending', () => {
    const result = sortTextLines('abc\na\nabcdef\nab', { ...SORT_TEXT_DEFAULT_OPTIONS, sortMode: 'length-asc' });
    expect(result.output).toBe('a\nab\nabc\nabcdef');
  });

  it('sorts by length descending', () => {
    const result = sortTextLines('a\nab\nabc\nabcdef', { ...SORT_TEXT_DEFAULT_OPTIONS, sortMode: 'length-desc' });
    expect(result.output).toBe('abcdef\nabc\nab\na');
  });

  it('ignores case when option is set', () => {
    const result = sortTextLines('apple\nApple\nAPPLE', { ...SORT_TEXT_DEFAULT_OPTIONS, ignoreCase: true });
    // When case is ignored, the original order of equal items is preserved
    expect(result.output).toContain('apple');
  });

  it('removes blank lines when option is set', () => {
    const result = sortTextLines('c\n\nb\n\na', { ...SORT_TEXT_DEFAULT_OPTIONS, removeBlankLines: true });
    expect(result.output).toBe('a\nb\nc');
  });

  it('removes duplicates when option is set', () => {
    const result = sortTextLines('banana\napple\nbanana\napple', {
      ...SORT_TEXT_DEFAULT_OPTIONS,
      removeDuplicates: true,
    });
    expect(result.output).toBe('apple\nbanana');
  });

  it('trims whitespace when option is set', () => {
    const result = sortTextLines('  zebra  \n  apple  \n  banana  ', {
      ...SORT_TEXT_DEFAULT_OPTIONS,
      trimWhitespace: true,
    });
    expect(result.output).toBe('apple\nbanana\nzebra');
  });
});
