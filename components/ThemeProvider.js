"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';

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
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <ThemeContext.Provider value={{ mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
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