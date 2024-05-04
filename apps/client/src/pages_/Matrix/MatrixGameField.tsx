'use client';

import { MatrixGameCellState, MatrixGameState, Tuple } from '@xo/games';
import React from 'react';
import { MatrixRow } from './MatrixRow';

export const MatrixGameField: React.FC<
  React.PropsWithChildren<{
    field: MatrixGameState['field'];
    canMoveInMatrix: (matrixId: number) => boolean;
    canMove: (matrixId: number, id: number) => boolean;
    move: (matrixId: number, id: number) => void;
  }>
> = ({ field, canMoveInMatrix, canMove, move, children }) => (
  <section className="max-w-full mx-auto mb-12 overflow-hidden divide-y-2 w-96 divide-border rounded-xl border relative">
    <MatrixRow
      cells={field.slice(0, 3) as Tuple<MatrixGameCellState, 3>}
      canMoveInMatrix={canMoveInMatrix}
      canMove={canMove}
      move={move}
    />
    <MatrixRow
      cells={field.slice(3, 6) as Tuple<MatrixGameCellState, 3>}
      canMoveInMatrix={(matrixId) => canMoveInMatrix(matrixId + 3)}
      canMove={(matrixId, id) => canMove(matrixId + 3, id)}
      move={(matrixId, id) => move(matrixId + 3, id)}
    />
    <MatrixRow
      cells={field.slice(6, 9) as Tuple<MatrixGameCellState, 3>}
      canMoveInMatrix={(matrixId) => canMoveInMatrix(matrixId + 6)}
      canMove={(matrixId, id) => canMove(matrixId + 6, id)}
      move={(matrixId, id) => move(matrixId + 6, id)}
    />
    {children}
  </section>
);
