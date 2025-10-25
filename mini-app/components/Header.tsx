'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Token Price Mini App
        </Link>
        <nav>
          <Button variant="ghost" asChild>
            <Link href="/about">About</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
