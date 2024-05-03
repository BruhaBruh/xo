'use client';

import { createFastContext } from '@/lib/fastContext';
import {
  canMoveClassicGame,
  createEmptyClassicGameState,
  moveClassicGame,
} from '@xo/games';
import React from 'react';

const { Provider, useStore: useClassicGame } = createFastContext(
  createEmptyClassicGameState('x')
);

export const ClassicGameOfflineProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const state = React.useMemo(() => createEmptyClassicGameState('x'), []);

  return <Provider value={state}>{children}</Provider>;
};

export const useClassicGameOfflineCanMove = () => {
  const [state] = useClassicGame();

  const canMove = (id: number): boolean => {
    return canMoveClassicGame(state.winner, state.field, id);
  };

  return canMove;
};

export const useClassicGameOfflineMove = () => {
  const [state, setState] = useClassicGame();

  const move = (id: number): void => {
    const newState = moveClassicGame(state, id);
    if (newState === state) return;
    setState(newState);
  };

  return move;
};

export const useClassicGameOfflineRestart = () => {
  const [, setState] = useClassicGame();

  const restart = (): void => {
    setState(createEmptyClassicGameState());
  };

  return restart;
};

export const useClassicGameOffline = () => {
  const [state] = useClassicGame();
  const canMove = useClassicGameOfflineCanMove();
  const move = useClassicGameOfflineMove();
  const restart = useClassicGameOfflineRestart();

  const functions = { canMove, move, restart };

  return [state, functions] as [typeof state, typeof functions];
};
