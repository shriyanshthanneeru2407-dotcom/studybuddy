/**
 * StudyBuddy — Theme Manager
 * Handles dark/light mode toggle with localStorage persistence
 */
(function ThemeManager() {
  const STORAGE_KEY = 'sb-theme';
  const THEMES = { LIGHT: 'light', DARK: 'dark' };

  /** Read saved preference or detect system */
  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === THEMES.DARK || saved === THEMES.LIGHT) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? THEMES.DARK
      : THEMES.LIGHT;
  }

  /** Apply theme to document */
  function applyTheme(theme) {
    if (theme === THEMES.DARK) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleIcons(theme);
    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }

  /** Update all toggle button icons on the page */
  function updateToggleIcons(theme) {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.setAttribute('aria-label', theme === THEMES.DARK ? 'Switch to light mode' : 'Switch to dark mode');
      btn.innerHTML = theme === THEMES.DARK ? ICONS.sun : ICONS.moon;
    });
  }

  /** Toggle between themes */
  function toggle() {
    const current = document.documentElement.getAttribute('data-theme') === 'dark'
      ? THEMES.DARK : THEMES.LIGHT;
    applyTheme(current === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
  }

  const ICONS = {
    sun: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
    moon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  };

  // Apply immediately to avoid flash
  applyTheme(getInitialTheme());

  // Wire up buttons after DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', toggle);
    });
    // In case icons didn't render (DOMContentLoaded was before script)
    updateToggleIcons(document.documentElement.getAttribute('data-theme') === 'dark'
      ? THEMES.DARK : THEMES.LIGHT);
  });

  // Listen to system changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
    }
  });

  // Expose globally
  window.SBTheme = { toggle, applyTheme, getInitialTheme };
})();
