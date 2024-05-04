'use client';

import { createFastContext } from '@/lib/fastContext';
import { socket } from '@/lib/socket';
import { useInfo } from '@/providers/Info';
import {
  OnlyThreeGameState,
  Room,
  canMoveOnlyThreeGame,
  createEmptyOnlyThreeGameState,
} from '@xo/games';
import { useRouter } from 'next/navigation';
import React from 'react';

const { Provider, useStore: useOnlyThreeGame } = createFastContext(
  createEmptyOnlyThreeGameState('x')
);

export const OnlyThreeGameOnlineProvider: React.FC<
  React.PropsWithChildren<{
    state: OnlyThreeGameState;
  }>
> = ({ state, children }) => {
  return <Provider value={state}>{children}</Provider>;
};

export const useOnlyThreeGameOnlineSocket = () => {
  const [info, setInfo] = useInfo();
  const [, setState] = useOnlyThreeGame();
  const router = useRouter();

  const connect = React.useCallback(() => {
    if (!info.userId) return;
    if (!info.nickname) return;
    if (!info.code) return;

    socket.emit('onlythree-connect', {
      userId: info.userId,
      nickname: info.nickname,
      code: info.code,
    });
  }, [info.code, info.nickname, info.userId]);

  const disconnect = React.useCallback(() => {
    socket.emit('onlythree-disconnect');
  }, []);

  React.useEffect(() => {
    if (!info.userId) return;
    if (!info.nickname) return;
    if (!info.code) return;

    const onlythreeConnectListener = (data: unknown) => {
      console.error(data);
      router.replace('/onlythree');
    };

    const roomListener = (room: Room<'onlythree'>) => {
      setInfo(room.info);
      setState(room.state);
    };

    socket.once('onlythree-connect', onlythreeConnectListener);
    socket.on(`onlythree-${info.code}`, roomListener);

    return () => {
      socket.off('onlythree-connect', onlythreeConnectListener);
      socket.off(`onlythree-${info.code}`, roomListener);
    };
  }, [info, router, setInfo, setState]);

  return {
    connect,
    disconnect,
  };
};

export const useOnlyThreeGameOnlineCanMove = () => {
  const [info] = useInfo();
  const [state] = useOnlyThreeGame();

  const canMove = (id: number): boolean => {
    if (info[state.userToMove].id !== info.userId) return false;

    return canMoveOnlyThreeGame(state.winner, state.field, id);
  };

  return canMove;
};

export const useOnlyThreeGameOnlineMove = () => {
  const [info] = useInfo();
  const [state] = useOnlyThreeGame();

  const move = (id: number): void => {
    if (!info.userId) return;
    if (!info.nickname) return;
    if (!info.code) return;
    if (info[state.userToMove].id !== info.userId) return;

    socket.emit(`onlythree-${info.code}`, { type: 'move', id });
  };

  return move;
};

export const useOnlyThreeGameOnlineRestart = () => {
  const [info] = useInfo();

  const restart = (): void => {
    if (!info.userId) return;
    if (!info.nickname) return;
    if (!info.code) return;
    if (info.x.id !== info.userId) return;

    socket.emit(`onlythree-${info.code}`, { type: 'restart' });
  };

  return restart;
};

export const useOnlyThreeGameOnline = () => {
  const [state] = useOnlyThreeGame();
  const canMove = useOnlyThreeGameOnlineCanMove();
  const move = useOnlyThreeGameOnlineMove();
  const restart = useOnlyThreeGameOnlineRestart();

  const functions = { canMove, move, restart };

  return [state, functions] as [typeof state, typeof functions];
};
