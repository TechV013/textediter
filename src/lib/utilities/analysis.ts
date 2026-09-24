/**
 * Text analysis utilities for statistics and readability calculations
 */

/**
 * Count sentences in text
 */
export function countSentences(text: string): number {
  if (!text || text.trim().length === 0) return 0;

  // Split on sentence-ending punctuation followed by space or end of string
  // Handles: . ! ? with optional quotes after them
  const sentences = text
    .trim()
    .split(/[.!?]+[\s\n\r]|[.!?]+$/g)
    .filter((s) => s.trim().length > 0);

  return sentences.length;
}

/**
 * Count paragraphs (blocks of text separated by blank lines)
 */
export function countParagraphs(text: string): number {
  if (!text || text.trim().length === 0) return 0;

  const paragraphs = text
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 0);

  return paragraphs.length;
}

/**
 * Calculate average word length
 */
export function calculateAverageWordLength(text: string): number {
  const words = text.match(/\b[\p{L}\p{N}]+\b/gu) || [];
  if (words.length === 0) return 0;

  const totalLength = words.reduce((sum, word) => sum + word.length, 0);
  return totalLength / words.length;
}

/**
 * Calculate average sentence length (words per sentence)
 */
export function calculateAverageSentenceLength(text: string): number {
  const sentences = countSentences(text);
  if (sentences === 0) return 0;

  const words = text.match(/\b[\p{L}\p{N}]+\b/gu) || [];
  return words.length / sentences;
}

/**
 * Get the longest word in the text
 */
export function getLongestWord(text: string): { word: string; length: number } {
  const words = text.match(/\b[\p{L}\p{N}]+\b/gu) || [];
  if (words.length === 0) return { word: '', length: 0 };

  const longest = words.reduce((max, word) => (word.length > max.length ? word : max), '');
  return { word: longest, length: longest.length };
}

/**
 * Get the longest sentence (by character count) in the text.
 * Sentences are detected with the same split used by `countSentences`.
 */
export function getLongestSentence(text: string): { sentence: string; length: number } {
  const sentences = text
    .trim()
    .split(/[.!?]+[\s\n\r]|[.!?]+$/g)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (sentences.length === 0) return { sentence: '', length: 0 };

  const longest = sentences.reduce((max, s) => (s.length > max.length ? s : max), '');
  return { sentence: longest, length: longest.length };
}

/**
 * Count syllables in a word (approximation for English)
 */
function countSyllables(word: string): number {
  word = word.toLowerCase().trim();
  if (word.length <= 3) return 1;

  // Remove silent e
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');

  // Count vowel groups
  const syllables = word.match(/[aeiouy]{1,2}/g);
  return syllables ? syllables.length : 1;
}

/**
 * Calculate Flesch Reading Ease score
 * Formula: 206.835 - 1.015 * (total words / total sentences) - 84.6 * (total syllables / total words)
 * Score ranges: 90-100 (very easy), 60-70 (standard), 0-30 (very difficult)
 */
export function calculateFleschReadingEase(text: string): number {
  const words = text.match(/\b[\p{L}\p{N}]+\b/gu) || [];
  const totalWords = words.length;

  if (totalWords === 0) return 0;

  const totalSentences = countSentences(text);
  if (totalSentences === 0) return 0;

  const totalSyllables = words.reduce((sum, word) => sum + countSyllables(word), 0);

  const score =
    206.835 - 1.015 * (totalWords / totalSentences) - 84.6 * (totalSyllables / totalWords);

  return Math.max(0, Math.min(100, Math.round(score * 10) / 10));
}

/**
 * Get reading difficulty level based on Flesch Reading Ease score
 */
export function getReadingLevel(score: number): string {
  if (score >= 90) return 'Very Easy (5th grade)';
  if (score >= 80) return 'Easy (6th grade)';
  if (score >= 70) return 'Fairly Easy (7th grade)';
  if (score >= 60) return 'Standard (8th-9th grade)';
  if (score >= 50) return 'Fairly Difficult (10th-12th grade)';
  if (score >= 30) return 'Difficult (College)';
  return 'Very Difficult (College graduate)';
}

/**
 * Calculate reading time in minutes based on average reading speed
 * @param wordCount - Total number of words
 * @param wordsPerMinute - Reading speed (default: 200 wpm)
 */
export function calculateReadingTime(wordCount: number, wordsPerMinute = 200): number {
  if (wordCount === 0) return 0;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Get word frequency map
 * @param text - Input text
 * @param minLength - Minimum word length to include (default: 1)
 * @returns Map of word -> count, sorted by count descending
 */
export function getWordFrequency(
  text: string,
  minLength = 1,
): Array<{ word: string; count: number }> {
  const words = text.match(/\b[\p{L}\p{N}]+\b/gu) || [];
  const frequencyMap = new Map<string, number>();

  words.forEach((word) => {
    const normalized = word.toLowerCase();
    if (normalized.length >= minLength) {
      frequencyMap.set(normalized, (frequencyMap.get(normalized) || 0) + 1);
    }
  });

  return Array.from(frequencyMap.entries())
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Calculate keyword density percentage
 * @param keyword - The keyword to search for
 * @param text - The full text
 * @param caseSensitive - Whether to match case
 */
export function calculateKeywordDensity(
  keyword: string,
  text: string,
  caseSensitive = false,
): number {
  if (!keyword || !text) return 0;

  const words = text.match(/\b[\p{L}\p{N}]+\b/gu) || [];
  if (words.length === 0) return 0;

  const searchKeyword = caseSensitive ? keyword : keyword.toLowerCase();
  const keywordCount = words.filter((word) =>
    caseSensitive ? word === searchKeyword : word.toLowerCase() === searchKeyword,
  ).length;

  return Math.round((keywordCount / words.length) * 10000) / 100;
}
