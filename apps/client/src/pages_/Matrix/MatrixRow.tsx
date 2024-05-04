'use client';

import { MatrixGameCellState, Tuple } from '@xo/games';
import React from 'react';
import { GameField } from './GameField';

export const MatrixRow: React.FC<{
  cells: Tuple<MatrixGameCellState, 3>;
  canMoveInMatrix: (matrixId: number) => boolean;
  canMove: (matrixId: number, id: number) => boolean;
  move: (matrixId: number, id: number) => void;
}> = ({ cells, canMoveInMatrix, canMove, move }) => (
  <section className="grid grid-cols-3 divide-x-2 divide-border">
    <GameField
      state={cells[0]}
      canMove={(id) => canMove(0, id)}
      move={(id) => move(0, id)}
      disabled={!canMoveInMatrix(0)}
    />
    <GameField
      state={cells[1]}
      canMove={(id) => canMove(1, id)}
      move={(id) => move(1, id)}
      disabled={!canMoveInMatrix(1)}
    />
    <GameField
      state={cells[2]}
      canMove={(id) => canMove(2, id)}
      move={(id) => move(2, id)}
      disabled={!canMoveInMatrix(2)}
    />
  </section>
);
