export async function copyText(text: string): Promise<{ ok: boolean; error?: string }> {
  if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
    return { ok: false, error: 'Clipboard API is not available in this browser.' };
  }
  try {
    await navigator.clipboard.writeText(text);
    return { ok: true };
  } catch {
    return { ok: false, error: 'Could not copy. Check clipboard permissions.' };
  }
}
