'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'react-feather';

export default function ThemeToggle() {
  const htmlElement = document.querySelector('html');
  const [theme, setTheme] = useState(
    htmlElement?.getAttribute('data-theme') || 'light'
  );

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    htmlElement?.setAttribute('data-theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return theme === 'dark' ? (
    <Moon onClick={toggleTheme} />
  ) : (
    <Sun onClick={toggleTheme} />
  );
}
