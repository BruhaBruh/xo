'use client';

import { createFastContext } from '@/lib/fastContext';
import {
  canMoveInMatrixMatrixGame,
  canMoveMatrixGame,
  createEmptyMatrixGameState,
  moveMatrixGame,
} from '@xo/games';
import React from 'react';

const { Provider, useStore: useMatrixGame } = createFastContext(
  createEmptyMatrixGameState('x')
);

export const MatrixGameOfflineProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const state = React.useMemo(() => createEmptyMatrixGameState('x'), []);

  return <Provider value={state}>{children}</Provider>;
};

export const useMatrixGameOfflineCanMoveInMatrix = () => {
  const [state] = useMatrixGame();

  const canMove = (matrixId: number): boolean => {
    return canMoveInMatrixMatrixGame(
      state.allowedMatrixCellToMove,
      state.field,
      matrixId
    );
  };

  return canMove;
};

export const useMatrixGameOfflineCanMove = () => {
  const [state] = useMatrixGame();

  const canMove = (matrixId: number, id: number): boolean => {
    return canMoveMatrixGame(
      state.allowedMatrixCellToMove,
      state.field,
      matrixId,
      id
    );
  };

  return canMove;
};

export const useMatrixGameOfflineMove = () => {
  const [state, setState] = useMatrixGame();

  const move = (matrixId: number, id: number): void => {
    const newState = moveMatrixGame(state, matrixId, id);
    if (newState === state) return;
    setState(newState);
  };

  return move;
};

export const useMatrixGameOfflineRestart = () => {
  const [, setState] = useMatrixGame();

  const restart = (): void => {
    setState(createEmptyMatrixGameState());
  };

  return restart;
};

export const useMatrixGameOffline = () => {
  const [state] = useMatrixGame();
  const canMoveInMatrix = useMatrixGameOfflineCanMoveInMatrix();
  const canMove = useMatrixGameOfflineCanMove();
  const move = useMatrixGameOfflineMove();
  const restart = useMatrixGameOfflineRestart();

  const functions = { canMoveInMatrix, canMove, move, restart };

  return [state, functions] as [typeof state, typeof functions];
};
