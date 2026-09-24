import { describe, expect, it } from 'vitest';
import { extractUrls, URL_EXTRACTOR_DEFAULT_OPTIONS } from '../../src/lib/tools/url-extractor';

describe('extractUrls', () => {
  it('handles empty input', () => {
    const result = extractUrls('', URL_EXTRACTOR_DEFAULT_OPTIONS);
    expect(result.output).toBe('');
    expect(result.message).toMatch(/paste/i);
  });

  it('extracts an https URL', () => {
    const result = extractUrls('Visit https://example.com today', URL_EXTRACTOR_DEFAULT_OPTIONS);
    expect(result.output).toBe('https://example.com');
  });

  it('extracts an http URL', () => {
    const result = extractUrls('See http://test.org', URL_EXTRACTOR_DEFAULT_OPTIONS);
    expect(result.output).toBe('http://test.org');
  });

  it('extracts www-only URLs', () => {
    const result = extractUrls('Go to www.example.com', URL_EXTRACTOR_DEFAULT_OPTIONS);
    expect(result.output).toBe('www.example.com');
  });

  it('strips trailing punctuation', () => {
    const result = extractUrls(
      'Visit https://example.com.',
      URL_EXTRACTOR_DEFAULT_OPTIONS,
    );
    expect(result.output).toBe('https://example.com');
  });

  it('strips trailing closing parens', () => {
    const result = extractUrls(
      'See https://example.com/page (details here)',
      URL_EXTRACTOR_DEFAULT_OPTIONS,
    );
    expect(result.output).toBe('https://example.com/page');
  });

  it('deduplicates by default', () => {
    const result = extractUrls(
      'https://a.com and https://a.com',
      URL_EXTRACTOR_DEFAULT_OPTIONS,
    );
    expect(result.output).toBe('https://a.com');
  });

  it('deduplicates case-insensitively', () => {
    const result = extractUrls(
      'HTTPS://A.COM and https://a.com',
      URL_EXTRACTOR_DEFAULT_OPTIONS,
    );
    expect(result.output).toBe('HTTPS://A.COM');
  });

  it('extracts multiple URLs', () => {
    const result = extractUrls(
      'See https://a.com and http://b.org',
      URL_EXTRACTOR_DEFAULT_OPTIONS,
    );
    expect(result.output).toContain('https://a.com');
    expect(result.output).toContain('http://b.org');
  });

  it('reports zero when no URLs found', () => {
    const result = extractUrls('no urls here', URL_EXTRACTOR_DEFAULT_OPTIONS);
    expect(result.output).toBe('');
    const stat = result.stats?.find((s) => s.label === 'URLs found');
    expect(stat?.value).toBe(0);
  });

  it('preserves original order by default', () => {
    const result = extractUrls(
      'second https://b.com first https://a.com',
      URL_EXTRACTOR_DEFAULT_OPTIONS,
    );
    const lines = result.output.split('\n');
    expect(lines[0]).toBe('https://b.com');
    expect(lines[1]).toBe('https://a.com');
  });
});
