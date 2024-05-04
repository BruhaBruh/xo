'use client';

import { OnlyThreeGameCell, OnlyThreeGameField, Tuple } from '@xo/games';
import React from 'react';
import { Row } from './Row';

export const GameField: React.FC<
  React.PropsWithChildren<{
    field: OnlyThreeGameField;
    move: (id: number) => void;
    canMove: (id: number) => boolean;
  }>
> = ({ field, move, canMove, children }) => (
  <section className="max-w-full mx-auto mb-4 overflow-hidden divide-y-2 w-96 divide-border rounded-xl border bg-secondary/50 relative">
    <Row
      cells={field.slice(0, 3) as Tuple<OnlyThreeGameCell, 3>}
      move={move}
      canMove={canMove}
    />
    <Row
      cells={field.slice(3, 6) as Tuple<OnlyThreeGameCell, 3>}
      move={(id) => move(id + 3)}
      canMove={(id) => canMove(id + 3)}
    />
    <Row
      cells={field.slice(6, 9) as Tuple<OnlyThreeGameCell, 3>}
      move={(id) => move(id + 6)}
      canMove={(id) => canMove(id + 6)}
    />
    {children}
  </section>
);
