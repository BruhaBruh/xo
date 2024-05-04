'use client';

import { createFastContext } from '@/lib/fastContext';
import {
  canMoveOnlyThreeGame,
  createEmptyOnlyThreeGameState,
  moveOnlyThreeGame,
} from '@xo/games';
import React from 'react';

const { Provider, useStore: useOnlyThreeGame } = createFastContext(
  createEmptyOnlyThreeGameState('x')
);

export const OnlyThreeGameOfflineProvider: React.FC<
  React.PropsWithChildren
> = ({ children }) => {
  const state = React.useMemo(() => createEmptyOnlyThreeGameState('x'), []);

  return <Provider value={state}>{children}</Provider>;
};

export const useOnlyThreeGameOfflineCanMove = () => {
  const [state] = useOnlyThreeGame();

  const canMove = (id: number): boolean => {
    return canMoveOnlyThreeGame(state.winner, state.field, id);
  };

  return canMove;
};

export const useOnlyThreeGameOfflineMove = () => {
  const [state, setState] = useOnlyThreeGame();

  const move = (id: number): void => {
    const newState = moveOnlyThreeGame(state, id);
    if (newState === state) return;
    setState(newState);
  };

  return move;
};

export const useOnlyThreeGameOfflineRestart = () => {
  const [, setState] = useOnlyThreeGame();

  const restart = (): void => {
    setState(createEmptyOnlyThreeGameState());
  };

  return restart;
};

export const useOnlyThreeGameOffline = () => {
  const [state] = useOnlyThreeGame();
  const canMove = useOnlyThreeGameOfflineCanMove();
  const move = useOnlyThreeGameOfflineMove();
  const restart = useOnlyThreeGameOfflineRestart();

  const functions = { canMove, move, restart };

  return [state, functions] as [typeof state, typeof functions];
};
