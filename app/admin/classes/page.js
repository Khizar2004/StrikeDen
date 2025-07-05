'use client';  //this file exists so that if someone goes to /classes, it will redirect to /admin?tab=offeredClasses
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ClassesAdminPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to admin page with classes tab selected
    router.push('/admin?tab=offeredClasses');
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
    </div>
  );
} 