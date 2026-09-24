import { describe, expect, it } from 'vitest';
import { convertCase, CASE_CONVERTER_DEFAULT_OPTIONS } from '../../src/lib/tools/case-converter';

describe('convertCase', () => {
  it('handles empty input', () => {
    const result = convertCase('', CASE_CONVERTER_DEFAULT_OPTIONS);
    expect(result.output).toBe('');
    expect(result.message).toMatch(/paste/i);
  });

  it('converts to uppercase', () => {
    const result = convertCase('hello world', { caseType: 'upper' });
    expect(result.output).toBe('HELLO WORLD');
  });

  it('converts to lowercase', () => {
    const result = convertCase('HELLO WORLD', { caseType: 'lower' });
    expect(result.output).toBe('hello world');
  });

  it('converts to title case', () => {
    const result = convertCase('hello world from textfixer', { caseType: 'title' });
    expect(result.output).toBe('Hello World From Textfixer');
  });

  it('converts to sentence case', () => {
    const result = convertCase('hello world. this is nice. welcome here.', { caseType: 'sentence' });
    expect(result.output).toBe('Hello world. This is nice. Welcome here.');
  });

  it('converts to alternating case', () => {
    const result = convertCase('hello', { caseType: 'alternating' });
    expect(result.output).toBe('hElLo');
  });

  it('converts to inverse case', () => {
    const result = convertCase('Hello World', { caseType: 'inverse' });
    expect(result.output).toBe('hELLO wORLD');
  });

  it('handles Unicode characters', () => {
    const result = convertCase('café résumé', { caseType: 'upper' });
    expect(result.output).toBe('CAFÉ RÉSUMÉ');
  });

  it('preserves punctuation and numbers', () => {
    const result = convertCase('hello, world! 123', { caseType: 'upper' });
    expect(result.output).toBe('HELLO, WORLD! 123');
  });

  it('handles multiline text', () => {
    const result = convertCase('hello\nworld', { caseType: 'upper' });
    expect(result.output).toBe('HELLO\nWORLD');
  });

  it('returns character and line stats', () => {
    const result = convertCase('hello world', { caseType: 'upper' });
    expect(result.stats).toBeDefined();
    expect(result.stats?.find((s) => s.label === 'Characters')?.value).toBe(11);
    expect(result.stats?.find((s) => s.label === 'Lines')?.value).toBe(1);
  });
});
