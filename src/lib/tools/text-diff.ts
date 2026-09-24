import type { ToolProcessResult } from './types';

export interface TextDiffOptions {
  ignoreWhitespace: boolean;
  ignoreCase: boolean;
}

export const TEXT_DIFF_DEFAULT_OPTIONS: TextDiffOptions = {
  ignoreWhitespace: false,
  ignoreCase: false,
};

/**
 * Compute a unified-style diff between two texts.
 *
 * This uses a longest-common-subsequence (LCS) approach to identify added,
 * removed, and unchanged lines. Output uses `+` / `-` / ` ` prefixes
 * similar to unified diff format, without requiring external dependencies.
 *
 * Everything runs in the browser — no server calls.
 */
export function diffTexts(
  inputA: string,
  inputB: string,
  options: TextDiffOptions,
): ToolProcessResult {
  if (inputA.length === 0 && inputB.length === 0) {
    return { output: '', message: 'Paste text into both fields to compare them.' };
  }
  if (inputA.length === 0) {
    return { output: '', message: 'Paste text into the left field to compare.' };
  }
  if (inputB.length === 0) {
    return { output: '', message: 'Paste text into the right field to compare.' };
  }

  const normalize = (s: string) => {
    let t = s;
    if (options.ignoreCase) t = t.toLowerCase();
    if (options.ignoreWhitespace) t = t.replace(/\s+/g, ' ').trim();
    return t;
  };

  const linesA = inputA.split('\n');
  const linesB = inputB.split('\n');

  const normA = linesA.map(normalize);
  const normB = linesB.map(normalize);

  // LCS DP
  const m = normA.length;
  const n = normB.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (normA[i - 1] === normB[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to build diff
  const diffLines: { tag: 'add' | 'remove' | 'keep'; text: string }[] = [];
  let i = m;
  let j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && normA[i - 1] === normB[j - 1]) {
      diffLines.unshift({ tag: 'keep', text: linesA[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      diffLines.unshift({ tag: 'add', text: linesB[j - 1] });
      j--;
    } else {
      diffLines.unshift({ tag: 'remove', text: linesA[i - 1] });
      i--;
    }
  }

  const output = diffLines
    .map((d) => {
      if (d.tag === 'add') return `+ ${d.text}`;
      if (d.tag === 'remove') return `- ${d.text}`;
      return `  ${d.text}`;
    })
    .join('\n');

  const additions = diffLines.filter((d) => d.tag === 'add').length;
  const deletions = diffLines.filter((d) => d.tag === 'remove').length;
  const unchanged = diffLines.filter((d) => d.tag === 'keep').length;

  const stats = [
    { label: 'Lines added', value: additions },
    { label: 'Lines removed', value: deletions },
    { label: 'Lines unchanged', value: unchanged },
  ];

  const totalChanges = additions + deletions;
  const message =
    totalChanges === 0
      ? 'The two texts are identical.'
      : `Found ${totalChanges} difference${totalChanges === 1 ? '' : 's'} (${additions} added, ${deletions} removed).`;

  return { output, stats, message };
}
