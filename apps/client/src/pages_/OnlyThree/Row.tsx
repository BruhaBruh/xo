'use client';

import { OIcon, XIcon } from '@/components/ui';
import { cn } from '@/lib/shadcn';
import { OnlyThreeGameCell, Tuple } from '@xo/games';
import React from 'react';

export const Row: React.FC<{
  cells: Tuple<OnlyThreeGameCell, 3>;
  move: (id: number) => void;
  canMove: (id: number) => boolean;
}> = ({ cells, move, canMove }) => (
  <section className="grid grid-cols-3 divide-x-2 divide-border">
    {cells.map((cell, i) => (
      <button
        // eslint-disable-next-line react/no-array-index-key
        key={`cell-${i}`}
        disabled={!canMove(i)}
        type="button"
        className="flex items-center justify-center aspect-square hover:bg-background/25 disabled:hover:bg-transparent transition-colors"
        onClick={() => move(i)}
      >
        {cell.value === 'x' && (
          <XIcon size="field" className={cn(cell.blink && 'animate-blink')} />
        )}
        {cell.value === 'o' && (
          <OIcon size="field" className={cn(cell.blink && 'animate-blink')} />
        )}
      </button>
    ))}
  </section>
);
