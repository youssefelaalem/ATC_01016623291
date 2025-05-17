// src/components/ThemeToggle.tsx
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage or match system preference
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-white rounded"
    >
      {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
