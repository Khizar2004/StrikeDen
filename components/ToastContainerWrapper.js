"use client";
import { ToastContainer } from 'react-toastify';
import { useTheme as useNextTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ToastContainerWrapper() {
  const { theme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ToastContainer 
      position="bottom-right" 
      theme={theme === 'dark' ? 'dark' : 'light'}
      toastClassName={theme === 'dark' ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}
      progressClassName="bg-red-500"
    />
  );
} 