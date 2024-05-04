'use client';

import { OIcon, XIcon } from '@/components/ui';
import { cn } from '@/lib/shadcn';
import { CellValue, Tuple } from '@xo/games';
import React from 'react';

export const Row: React.FC<{
  cells: Tuple<CellValue, 3>;
  disabled?: boolean;
  canMove: (id: number) => boolean;
  move: (id: number) => void;
  top?: boolean;
  bottom?: boolean;
}> = ({ cells, disabled, canMove, move, top, bottom }) => (
  <section
    className={cn(
      'grid grid-cols-3 divide-x-2 divide-border transition-colors',
      !disabled && 'divide-primary/25 bg-primary/5',
      top && 'overflow-hidden rounded-t-lg',
      bottom && 'overflow-hidden rounded-b-lg'
    )}
  >
    {cells.map((cell, i) => (
      <button
        // eslint-disable-next-line react/no-array-index-key
        key={`cell-${i}`}
        disabled={!canMove(i) || disabled}
        type="button"
        className="flex items-center justify-center aspect-square hover:bg-background/25 disabled:hover:bg-transparent transition-colors"
        onClick={() => move(i)}
      >
        {cell === 'x' && <XIcon size="field" />}
        {cell === 'o' && <OIcon size="field" />}
      </button>
    ))}
  </section>
);
