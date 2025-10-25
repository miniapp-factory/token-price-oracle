'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ShareButton({ text }: { text: string }) {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(!!navigator.share);
  }, []);

  const handleShare = async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({
        title: document.title,
        text,
        url: window.location.href,
      });
    } catch (err) {
      console.error('Share failed', err);
    }
  };

  if (!supported) return null;

  return (
    <Button onClick={handleShare} variant="outline">
      Share this page
    </Button>
  );
}
