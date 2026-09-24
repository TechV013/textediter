import { describe, expect, it } from 'vitest';
import { addPrefixSuffix, ADD_PREFIX_SUFFIX_DEFAULT_OPTIONS } from '../../src/lib/tools/add-prefix-suffix';

describe('addPrefixSuffix', () => {
  it('handles empty input', () => {
    const result = addPrefixSuffix('', ADD_PREFIX_SUFFIX_DEFAULT_OPTIONS);
    expect(result.output).toBe('');
    expect(result.message).toMatch(/paste/i);
  });

  it('requires prefix or suffix', () => {
    const result = addPrefixSuffix('hello', { prefix: '', suffix: '', applyToNonEmptyOnly: true });
    expect(result.output).toBe('hello');
    expect(result.message).toMatch(/prefix|suffix/i);
  });

  it('adds prefix to each line', () => {
    const result = addPrefixSuffix('Apple\nBanana\nOrange', { prefix: '- ', suffix: '', applyToNonEmptyOnly: true });
    expect(result.output).toBe('- Apple\n- Banana\n- Orange');
  });

  it('adds suffix to each line', () => {
    const result = addPrefixSuffix('hello\nworld', { prefix: '', suffix: ';', applyToNonEmptyOnly: true });
    expect(result.output).toBe('hello;\nworld;');
  });

  it('adds both prefix and suffix', () => {
    const result = addPrefixSuffix('hello\nworld', { prefix: '"', suffix: '"', applyToNonEmptyOnly: true });
    expect(result.output).toBe('"hello"\n"world"');
  });

  it('skips blank lines by default', () => {
    const result = addPrefixSuffix('hello\n\nworld', { prefix: '- ', suffix: '', applyToNonEmptyOnly: true });
    expect(result.output).toBe('- hello\n\n- world');
  });

  it('applies to blank lines when option is set', () => {
    const result = addPrefixSuffix('hello\n\nworld', { prefix: '- ', suffix: '', applyToNonEmptyOnly: false });
    expect(result.output).toBe('- hello\n- \n- world');
  });
});
