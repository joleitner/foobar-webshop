'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'react-feather';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setTheme(localStorage?.getItem('theme') || 'light');
  }, []);

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    htmlElement?.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return theme === 'dark' ? (
    <Moon onClick={toggleTheme} />
  ) : (
    <Sun onClick={toggleTheme} />
  );
}
