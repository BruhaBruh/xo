'use client';

import { Button } from '@/components/ui';
import Link from 'next/link';
import React from 'react';

export const BackRestart: React.FC<{
  onRestart: () => void;
  showRestart?: boolean;
}> = ({ onRestart, showRestart = true }) => (
  <section className="flex items-center justify-center gap-4">
    <Button variant="link" asChild>
      <Link href="/">Back</Link>
    </Button>
    {showRestart && <Button onClick={onRestart}>Restart</Button>}
  </section>
);
