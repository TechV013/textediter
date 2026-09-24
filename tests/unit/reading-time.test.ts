import { describe, expect, it } from 'vitest';
import { estimateReadingTime, READING_TIME_DEFAULT_OPTIONS } from '../../src/lib/tools/reading-time';

describe('estimateReadingTime', () => {
  it('handles empty input', () => {
    const result = estimateReadingTime('', READING_TIME_DEFAULT_OPTIONS);
    expect(result.output).toBe('');
    expect(result.message).toMatch(/paste/i);
  });

  it('calculates reading time for 200 words', () => {
    const text = 'word '.repeat(200);
    const result = estimateReadingTime(text, READING_TIME_DEFAULT_OPTIONS);
    const timeStat = result.stats?.find((s) => s.label === 'Reading time');
    expect(timeStat?.value).toBe('1 min');
  });

  it('rounds up reading time', () => {
    const text = 'word '.repeat(250);
    const result = estimateReadingTime(text, READING_TIME_DEFAULT_OPTIONS);
    const timeStat = result.stats?.find((s) => s.label === 'Reading time');
    expect(timeStat?.value).toBe('2 min');
  });

  it('respects custom reading speed', () => {
    const text = 'word '.repeat(300);
    const result = estimateReadingTime(text, { wordsPerMinute: 300 });
    const timeStat = result.stats?.find((s) => s.label === 'Reading time');
    expect(timeStat?.value).toBe('1 min');
  });
});
