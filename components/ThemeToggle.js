"use client";
import { useTheme } from './ThemeProvider';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();

  if (!mounted) {
    return <div className="w-10 h-10"></div>; // Placeholder to prevent layout shift
  }
  
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 text-gray-800 dark:text-gray-200 transition-colors duration-200 hover:text-[#E50914]"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
    </button>
  );
} 