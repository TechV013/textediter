import { describe, expect, it } from 'vitest';
import { countWordStats, WORD_COUNTER_DEFAULT_OPTIONS } from '../../src/lib/tools/word-counter';

describe('countWordStats', () => {
  it('handles empty input', () => {
    const result = countWordStats('', WORD_COUNTER_DEFAULT_OPTIONS);
    expect(result.output).toBe('');
    expect(result.message).toMatch(/paste/i);
  });

  it('counts words correctly', () => {
    const result = countWordStats('The quick brown fox', WORD_COUNTER_DEFAULT_OPTIONS);
    expect(result.stats).toBeDefined();
    const wordStat = result.stats?.find((s) => s.label === 'Words');
    expect(wordStat?.value).toBe(4);
  });

  it('counts characters with spaces', () => {
    const result = countWordStats('Hello World', WORD_COUNTER_DEFAULT_OPTIONS);
    const charStat = result.stats?.find((s) => s.label === 'Characters (with spaces)');
    expect(charStat?.value).toBe(11);
  });

  it('counts characters without spaces', () => {
    const result = countWordStats('Hello World', WORD_COUNTER_DEFAULT_OPTIONS);
    const charStat = result.stats?.find((s) => s.label === 'Characters (no spaces)');
    expect(charStat?.value).toBe(10);
  });

  it('counts lines correctly', () => {
    const result = countWordStats('Line 1\nLine 2\nLine 3', WORD_COUNTER_DEFAULT_OPTIONS);
    const lineStat = result.stats?.find((s) => s.label === 'Lines');
    expect(lineStat?.value).toBe(3);
  });

  it('counts paragraphs correctly', () => {
    const result = countWordStats('Para 1\n\nPara 2\n\nPara 3', WORD_COUNTER_DEFAULT_OPTIONS);
    const paraStat = result.stats?.find((s) => s.label === 'Paragraphs');
    expect(paraStat?.value).toBe(3);
  });
});
