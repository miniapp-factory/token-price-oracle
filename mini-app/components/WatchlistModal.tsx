'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';
import { readContractFn, writeContractFn } from '@/lib/contract';

export default function WatchlistModal({ open, onClose }) {
  const { address } = useAccount();
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const fetchWatchlist = async () => {
    if (!address) return;
    const list = await readContractFn('getWatchlist', [address]);
    setWatchlist(list);
  };

  useEffect(() => {
    if (open) fetchWatchlist();
  }, [open]);

  const addToken = async () => {
    if (!address || !input) return;
    await writeContractFn('addToken', [address, input.toUpperCase()]);
    setInput('');
    fetchWatchlist();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Watchlist</DialogTitle>
          <DialogDescription>Tokens you are watching.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {watchlist.map((t) => (
            <div key={t} className="p-2 rounded bg-muted">
              {t}
            </div>
          ))}
        </div>
        <div className="flex space-x-2 mt-4">
          <input
            type="text"
            placeholder="Add token"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded border p-2"
          />
          <Button onClick={addToken}>Add</Button>
        </div>
        <DialogClose className="mt-4">Close</DialogClose>
      </DialogContent>
    </Dialog>
  );
}
