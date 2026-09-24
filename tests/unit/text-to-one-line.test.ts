import { describe, expect, it } from 'vitest';
import { textToOneLine, TEXT_TO_ONE_LINE_DEFAULT_OPTIONS } from '../../src/lib/tools/text-to-one-line';

describe('textToOneLine', () => {
  it('handles empty input', () => {
    const result = textToOneLine('', TEXT_TO_ONE_LINE_DEFAULT_OPTIONS);
    expect(result.output).toBe('');
    expect(result.message).toMatch(/paste/i);
  });

  it('joins lines with default separator (space)', () => {
    const result = textToOneLine('Hello\nWorld\nTest', TEXT_TO_ONE_LINE_DEFAULT_OPTIONS);
    expect(result.output).toBe('Hello World Test');
  });

  it('joins lines with custom separator', () => {
    const result = textToOneLine('Apple\nBanana\nOrange', { ...TEXT_TO_ONE_LINE_DEFAULT_OPTIONS, separator: ', ' });
    expect(result.output).toBe('Apple, Banana, Orange');
  });

  it('joins lines with no separator', () => {
    const result = textToOneLine('Hello\nWorld', { ...TEXT_TO_ONE_LINE_DEFAULT_OPTIONS, separator: '' });
    expect(result.output).toBe('HelloWorld');
  });

  it('trims lines before joining when option is set', () => {
    const result = textToOneLine('  Hello  \n  World  ', { ...TEXT_TO_ONE_LINE_DEFAULT_OPTIONS, trimLines: true });
    expect(result.output).toBe('Hello World');
  });

  it('does not trim when option is disabled', () => {
    const result = textToOneLine('  Hello  \n  World  ', { ...TEXT_TO_ONE_LINE_DEFAULT_OPTIONS, trimLines: false });
    expect(result.output).toBe('  Hello     World  ');
  });

  it('removes blank lines when option is set', () => {
    const result = textToOneLine('Hello\n\n\nWorld', { ...TEXT_TO_ONE_LINE_DEFAULT_OPTIONS, removeBlankLines: true });
    expect(result.output).toBe('Hello World');
  });

  it('preserves blank lines by default', () => {
    const result = textToOneLine('Hello\n\nWorld', { ...TEXT_TO_ONE_LINE_DEFAULT_OPTIONS, removeBlankLines: false });
    expect(result.output).toBe('Hello  World');
  });

  it('combines trim and remove blank lines', () => {
    const result = textToOneLine('  Hello  \n\n  World  \n\n  Test  ', {
      ...TEXT_TO_ONE_LINE_DEFAULT_OPTIONS,
      trimLines: true,
      removeBlankLines: true,
    });
    expect(result.output).toBe('Hello World Test');
  });
});
