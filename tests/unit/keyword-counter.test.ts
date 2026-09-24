import { describe, expect, it } from 'vitest';
import { countKeywordFrequency, KEYWORD_COUNTER_DEFAULT_OPTIONS } from '../../src/lib/tools/keyword-counter';

describe('countKeywordFrequency', () => {
  it('handles empty input', () => {
    const result = countKeywordFrequency('', KEYWORD_COUNTER_DEFAULT_OPTIONS);
    expect(result.output).toBe('');
    expect(result.message).toMatch(/paste/i);
  });

  it('counts word frequency', () => {
    const result = countKeywordFrequency('test test hello world test', KEYWORD_COUNTER_DEFAULT_OPTIONS);
    expect(result.output).toContain('test — 3');
  });

  it('filters by minimum length', () => {
    const result = countKeywordFrequency('a an the test hello', { ...KEYWORD_COUNTER_DEFAULT_OPTIONS, minLength: 4 });
    expect(result.output).toContain('test');
    expect(result.output).toContain('hello');
    expect(result.output).not.toContain('the');
  });

  it('limits results to topN', () => {
    const text = 'one two three four five six'.split(' ').join(' ');
    const result = countKeywordFrequency(text, { ...KEYWORD_COUNTER_DEFAULT_OPTIONS, topN: 3 });
    const lines = result.output.split('\n');
    expect(lines.length).toBeLessThanOrEqual(3);
  });

  it('sorts by frequency descending', () => {
    const result = countKeywordFrequency('apple apple apple banana banana cherry', KEYWORD_COUNTER_DEFAULT_OPTIONS);
    const lines = result.output.split('\n');
    expect(lines[0]).toContain('apple');
    expect(lines[1]).toContain('banana');
  });

  it('handles no matching words', () => {
    const result = countKeywordFrequency('a b c', { ...KEYWORD_COUNTER_DEFAULT_OPTIONS, minLength: 5 });
    expect(result.message).toMatch(/no words found/i);
  });
});
