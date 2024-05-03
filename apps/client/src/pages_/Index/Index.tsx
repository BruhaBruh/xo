'use client';

import Link from 'next/link';
import React from 'react';

export const IndexPage: React.FC = () => (
  <>
    <h1 className="mx-auto mb-12 text-center typography-h1">
      Tic-Tac-Toe games
    </h1>
    <section className="grid md:grid-cols-3 gap-4 md:gap-8">
      <Link
        href="/classic"
        className="flex items-center justify-center p-8 border rounded-xl typography-h2 hover:bg-accent hover:text-accent-foreground"
      >
        Classic
      </Link>
      <Link
        href="/matrix"
        className="flex items-center justify-center p-8 border rounded-xl typography-h2 hover:bg-accent hover:text-accent-foreground"
      >
        Matrix
      </Link>
      <Link
        href="/onlythree"
        className="flex items-center justify-center p-8 border rounded-xl typography-h2 hover:bg-accent hover:text-accent-foreground"
      >
        Only Three
      </Link>
    </section>
  </>
);
