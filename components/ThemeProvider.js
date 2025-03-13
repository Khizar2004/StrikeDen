"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';

// Create a context to store the mounted state
const ThemeContext = createContext({ mounted: false });

export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={true}>
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </NextThemesProvider>
  );
}

function ThemeContextProvider({ children }) {
  const [mounted, setMounted] = useState(false);
  
  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <ThemeContext.Provider value={{ mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook that combines next-themes with our context
export function useTheme() {
  // Always call hooks in the same order
  const { mounted } = useContext(ThemeContext);
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return { 
    theme, 
    resolvedTheme,
    setTheme, 
    toggleTheme,
    mounted 
  };
} 