"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProgramsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin?tab=offeredPrograms');
  }, [router]);

  return null;
}
