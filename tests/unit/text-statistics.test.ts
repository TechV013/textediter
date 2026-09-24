import { describe, expect, it } from 'vitest';
import { analyzeTextStatistics, TEXT_STATISTICS_DEFAULT_OPTIONS } from '../../src/lib/tools/text-statistics';

describe('analyzeTextStatistics', () => {
  it('handles empty input', () => {
    const result = analyzeTextStatistics('', TEXT_STATISTICS_DEFAULT_OPTIONS);
    expect(result.output).toBe('');
    expect(result.message).toMatch(/paste/i);
  });

  it('calculates basic statistics', () => {
    const result = analyzeTextStatistics('Hello world', TEXT_STATISTICS_DEFAULT_OPTIONS);
    expect(result.stats).toBeDefined();
    const wordStat = result.stats?.find((s) => s.label === 'Words');
    expect(wordStat?.value).toBe(2);
  });

  it('counts sentences correctly', () => {
    const result = analyzeTextStatistics('Hello. World! Test?', TEXT_STATISTICS_DEFAULT_OPTIONS);
    const sentenceStat = result.stats?.find((s) => s.label === 'Sentences');
    expect(sentenceStat?.value).toBe(3);
  });

  it('counts paragraphs correctly', () => {
    const result = analyzeTextStatistics('Para 1\n\nPara 2', TEXT_STATISTICS_DEFAULT_OPTIONS);
    const paraStat = result.stats?.find((s) => s.label === 'Paragraphs');
    expect(paraStat?.value).toBe(2);
  });

  it('calculates average word length', () => {
    const result = analyzeTextStatistics('cat dog', TEXT_STATISTICS_DEFAULT_OPTIONS);
    const avgStat = result.stats?.find((s) => s.label === 'Avg. word length');
    expect(avgStat?.value).toContain('3.0');
  });

  it('finds longest word', () => {
    const result = analyzeTextStatistics('short longest mid', TEXT_STATISTICS_DEFAULT_OPTIONS);
    const longestStat = result.stats?.find((s) => s.label === 'Longest word');
    expect(longestStat?.value).toContain('longest');
  });
});
