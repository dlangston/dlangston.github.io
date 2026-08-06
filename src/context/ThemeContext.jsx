import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(undefined);

function getSystemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(() => {
    // Use saved preference when available, otherwise follow system.
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || saved === 'light' ? saved : 'system';
  });

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      return true;
    }
    if (saved === 'light') {
      return false;
    }
    return getSystemPrefersDark();
  });

  useEffect(() => {
    if (themeMode !== 'system') {
      setIsDark(themeMode === 'dark');
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (event) => {
      setIsDark(event.matches);
    };

    // Sync immediately and then listen for OS theme updates.
    setIsDark(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [themeMode]);

  useEffect(() => {
    // Update DOM
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    if (themeMode === 'system') {
      localStorage.removeItem('theme');
      return;
    }
    localStorage.setItem('theme', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    // Any manual toggle opts out of system-follow and flips explicit mode.
    setThemeMode((prevMode) => {
      const darkNow = prevMode === 'system' ? getSystemPrefersDark() : prevMode === 'dark';
      return darkNow ? 'light' : 'dark';
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
