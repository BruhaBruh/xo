'use client';

import { DrawIcon, OIcon, XIcon } from '@/components/ui';
import { cn } from '@/lib/shadcn';
import { CellValue, MatrixGameCellState, Tuple } from '@xo/games';
import React from 'react';
import { Row } from './Row';

export const GameField: React.FC<{
  state: MatrixGameCellState;
  disabled?: boolean;
  canMove: (id: number) => boolean;
  move: (id: number) => void;
}> = ({ state: { field, winner }, disabled, canMove, move }) => (
  <section
    className={cn(
      'relative p-2 divide-y-2 divide-border transition-colors bg-secondary/50',
      !disabled && 'divide-primary/25'
    )}
  >
    <Row
      cells={field.slice(0, 3) as Tuple<CellValue, 3>}
      disabled={disabled}
      canMove={canMove}
      move={move}
      top
    />
    <Row
      cells={field.slice(3, 6) as Tuple<CellValue, 3>}
      disabled={disabled}
      canMove={(id) => canMove(id + 3)}
      move={(id) => move(id + 3)}
    />
    <Row
      cells={field.slice(6, 9) as Tuple<CellValue, 3>}
      disabled={disabled}
      canMove={(id) => canMove(id + 6)}
      move={(id) => move(id + 6)}
      bottom
    />
    {winner !== null && (
      <section className="absolute flex items-center justify-center !border-0 top-0 left-0 right-0 bottom-0">
        {winner === 'draw' && <DrawIcon size="field" className="opacity-75" />}
        {winner === 'x' && <XIcon size="field" className="opacity-75" />}
        {winner === 'o' && <OIcon size="field" className="opacity-75" />}
      </section>
    )}
  </section>
);
