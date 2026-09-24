const THEME_KEY = 'tf-theme';

function getPreferredTheme(): 'light' | 'dark' {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // ignore
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: 'light' | 'dark') {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.querySelectorAll('[data-theme-toggle]').forEach((el) => {
    el.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    el.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  });
}

export function initTheme() {
  applyTheme(getPreferredTheme());

  document.querySelectorAll('[data-theme-toggle]').forEach((el) => {
    el.addEventListener('click', () => {
      const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        // ignore quota / private mode
      }
      applyTheme(next);
    });
  });
}

initTheme();
