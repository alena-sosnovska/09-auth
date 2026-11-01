'use client';

import { useState, useEffect, startTransition } from 'react';
import { useRouter } from 'next/navigation';

type LayoutProps = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: LayoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    router.refresh();
    startTransition(() => {
      setLoading(false);
    });
  }, [router]);
  return <>{loading ? <div>Loading...</div> : children}</>;
}
