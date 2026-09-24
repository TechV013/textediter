/**
 * Case transformation utilities for text manipulation.
 * Handles various case transformations while preserving Unicode characters.
 */

/**
 * Convert text to UPPERCASE
 */
export function toUpperCase(text: string): string {
  return text.toLocaleUpperCase();
}

/**
 * Convert text to lowercase
 */
export function toLowerCase(text: string): string {
  return text.toLocaleLowerCase();
}

/**
 * Convert text to Title Case (capitalize first letter of each word)
 * Example: "hello world" -> "Hello World"
 */
export function toTitleCase(text: string): string {
  return text.replace(/\b\w+/gu, (word) => {
    return word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase();
  });
}

/**
 * Convert text to Sentence case (capitalize first letter of each sentence)
 * Example: "hello world. this is nice." -> "Hello world. This is nice."
 */
export function toSentenceCase(text: string): string {
  // Split by sentence-ending punctuation followed by whitespace
  return text.replace(/(^|[.!?]\s+)(\w)/g, (_match, separator, firstChar) => {
    return separator + firstChar.toLocaleUpperCase();
  });
}

/**
 * Convert text to aLtErNaTiNg CaSe
 * Example: "hello world" -> "hElLo wOrLd"
 */
export function toAlternatingCase(text: string): string {
  let shouldUpper = false;
  return Array.from(text)
    .map((char) => {
      // Only alternate on actual letters
      if (/\p{L}/u.test(char)) {
        const result = shouldUpper ? char.toLocaleUpperCase() : char.toLocaleLowerCase();
        shouldUpper = !shouldUpper;
        return result;
      }
      return char;
    })
    .join('');
}

/**
 * Convert text to iNVERSE cASE (swap the case of each character)
 * Example: "Hello World" -> "hELLO wORLD"
 */
export function toInverseCase(text: string): string {
  return Array.from(text)
    .map((char) => {
      if (char === char.toLocaleUpperCase() && char !== char.toLocaleLowerCase()) {
        return char.toLocaleLowerCase();
      } else if (char === char.toLocaleLowerCase() && char !== char.toLocaleUpperCase()) {
        return char.toLocaleUpperCase();
      }
      return char;
    })
    .join('');
}

/**
 * Capitalize Each Word (same as Title Case but explicitly named)
 * Example: "hello world" -> "Hello World"
 */
export function capitalizeEachWord(text: string): string {
  return toTitleCase(text);
}
