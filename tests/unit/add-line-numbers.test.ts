import { describe, expect, it } from 'vitest';
import { addLineNumbers, ADD_LINE_NUMBERS_DEFAULT_OPTIONS } from '../../src/lib/tools/add-line-numbers';

describe('addLineNumbers', () => {
  it('handles empty input', () => {
    const result = addLineNumbers('', ADD_LINE_NUMBERS_DEFAULT_OPTIONS);
    expect(result.output).toBe('');
    expect(result.message).toMatch(/paste/i);
  });

  it('adds line numbers with default options', () => {
    const result = addLineNumbers('Apple\nBanana\nOrange', ADD_LINE_NUMBERS_DEFAULT_OPTIONS);
    expect(result.output).toBe('1. Apple\n2. Banana\n3. Orange');
  });

  it('starts from custom number', () => {
    const result = addLineNumbers('Hello\nWorld', { ...ADD_LINE_NUMBERS_DEFAULT_OPTIONS, startNumber: 10 });
    expect(result.output).toBe('10. Hello\n11. World');
  });

  it('uses custom separator', () => {
    const result = addLineNumbers('One\nTwo', { ...ADD_LINE_NUMBERS_DEFAULT_OPTIONS, separator: ': ' });
    expect(result.output).toBe('1: One\n2: Two');
  });

  it('pads numbers when enabled', () => {
    const result = addLineNumbers('A\nB\nC\nD\nE\nF\nG\nH\nI\nJ', { ...ADD_LINE_NUMBERS_DEFAULT_OPTIONS, padding: true });
    expect(result.output).toBe(' 1. A\n 2. B\n 3. C\n 4. D\n 5. E\n 6. F\n 7. G\n 8. H\n 9. I\n10. J');
  });

  it('does not pad when disabled', () => {
    const result = addLineNumbers('A\nB\nC\nD\nE\nF\nG\nH\nI\nJ', { ...ADD_LINE_NUMBERS_DEFAULT_OPTIONS, padding: false });
    expect(result.output).toBe('1. A\n2. B\n3. C\n4. D\n5. E\n6. F\n7. G\n8. H\n9. I\n10. J');
  });

  it('skips blank lines when option is set', () => {
    const result = addLineNumbers('Hello\n\nWorld', { ...ADD_LINE_NUMBERS_DEFAULT_OPTIONS, skipBlankLines: true });
    expect(result.output).toBe('1. Hello\n\n2. World');
  });

  it('numbers blank lines by default', () => {
    const result = addLineNumbers('Hello\n\nWorld', { ...ADD_LINE_NUMBERS_DEFAULT_OPTIONS, skipBlankLines: false });
    expect(result.output).toBe('1. Hello\n2. \n3. World');
  });
});
