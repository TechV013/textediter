import { describe, expect, it } from 'vitest';
import { diffTexts, TEXT_DIFF_DEFAULT_OPTIONS } from '../../src/lib/tools/text-diff';

describe('diffTexts', () => {
  it('returns empty when both inputs are empty', () => {
    const result = diffTexts('', '', TEXT_DIFF_DEFAULT_OPTIONS);
    expect(result.output).toBe('');
  });

  it('reports identical texts', () => {
    const result = diffTexts('hello\nworld', 'hello\nworld', TEXT_DIFF_DEFAULT_OPTIONS);
    expect(result.output).toBe('  hello\n  world');
    expect(result.message).toMatch(/identical/i);
  });

  it('detects added lines', () => {
    const result = diffTexts('hello', 'hello\nworld', TEXT_DIFF_DEFAULT_OPTIONS);
    expect(result.output).toContain('+ world');
  });

  it('detects removed lines', () => {
    const result = diffTexts('hello\nworld', 'hello', TEXT_DIFF_DEFAULT_OPTIONS);
    expect(result.output).toContain('- world');
  });

  it('detects changed lines', () => {
    const result = diffTexts(
      'Hello world\nGoodbye.',
      'Hello world\nFarewell.',
      TEXT_DIFF_DEFAULT_OPTIONS,
    );
    expect(result.output).toContain('- Goodbye.');
    expect(result.output).toContain('+ Farewell.');
  });

  it('ignores whitespace when option is set', () => {
    const result = diffTexts(
      'hello   world',
      'hello world',
      { ...TEXT_DIFF_DEFAULT_OPTIONS, ignoreWhitespace: true },
    );
    expect(result.output).toBe('  hello   world');
  });

  it('ignores case when option is set', () => {
    const result = diffTexts(
      'Hello World',
      'hello world',
      { ...TEXT_DIFF_DEFAULT_OPTIONS, ignoreCase: true },
    );
    expect(result.output).toBe('  Hello World');
  });

  it('shows stats for additions and deletions', () => {
    const result = diffTexts('a\nb', 'a\nc', TEXT_DIFF_DEFAULT_OPTIONS);
    const added = result.stats?.find((s) => s.label === 'Lines added');
    const removed = result.stats?.find((s) => s.label === 'Lines removed');
    expect(added?.value).toBe(1);
    expect(removed?.value).toBe(1);
  });

  it('handles empty left input', () => {
    const result = diffTexts('', 'hello', TEXT_DIFF_DEFAULT_OPTIONS);
    expect(result.message).toMatch(/left/i);
  });

  it('handles empty right input', () => {
    const result = diffTexts('hello', '', TEXT_DIFF_DEFAULT_OPTIONS);
    expect(result.message).toMatch(/right/i);
  });
});
