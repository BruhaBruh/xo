'use client';

import { createFastContext } from '@/lib/fastContext';
import { socket } from '@/lib/socket';
import { useInfo } from '@/providers/Info';
import {
  ClassicGameState,
  Room,
  canMoveClassicGame,
  createEmptyClassicGameState,
} from '@xo/games';
import { useRouter } from 'next/navigation';
import React from 'react';

const { Provider, useStore: useClassicGame } = createFastContext(
  createEmptyClassicGameState('x')
);

export const ClassicGameOnlineProvider: React.FC<
  React.PropsWithChildren<{
    state: ClassicGameState;
  }>
> = ({ state, children }) => {
  return <Provider value={state}>{children}</Provider>;
};

export const useClassicGameOnlineSocket = () => {
  const [info, setInfo] = useInfo();
  const [, setState] = useClassicGame();
  const router = useRouter();
  const connectIsSended = React.useRef(false);

  React.useEffect(() => {
    if (!info.userId) return;
    if (!info.nickname) return;
    if (!info.code) return;

    const classicConnectListener = (data: unknown) => {
      console.error(data);
      connectIsSended.current = false;
      router.replace('/classic');
    };

    const roomListener = (room: Room<'classic'>) => {
      setInfo(room.info);
      setState(room.state);
    };

    socket.once('classic-connect', classicConnectListener);
    socket.on(`classic-${info.code}`, roomListener);

    if (!connectIsSended.current) {
      socket.emit('classic-connect', {
        userId: info.userId,
        nickname: info.nickname,
        code: info.code,
      });
      connectIsSended.current = true;
    }

    return () => {
      socket.off('classic-connect', classicConnectListener);
      socket.off(`classic-${info.code}`, roomListener);
    };
  }, [info, router, setInfo, setState]);
};

export const useClassicGameOnlineCanMove = () => {
  const [info] = useInfo();
  const [state] = useClassicGame();

  const canMove = (id: number): boolean => {
    if (info[state.userToMove].id !== info.userId) return false;

    return canMoveClassicGame(state.winner, state.field, id);
  };

  return canMove;
};

export const useClassicGameOnlineMove = () => {
  const [info] = useInfo();
  const [state] = useClassicGame();

  const move = (id: number): void => {
    if (!socket) return;
    if (!info.userId) return;
    if (!info.nickname) return;
    if (!info.code) return;
    if (info[state.userToMove].id !== info.userId) return;

    socket.emit(`classic-${info.code}`, { type: 'move', id });
  };

  return move;
};

export const useClassicGameOnlineRestart = () => {
  const [info] = useInfo();

  const restart = (): void => {
    if (!socket) return;
    if (!info.userId) return;
    if (!info.nickname) return;
    if (!info.code) return;
    if (info.x.id !== info.userId) return;

    socket.emit(`classic-${info.code}`, { type: 'restart' });
  };

  return restart;
};

export const useClassicGameOnline = () => {
  const [state] = useClassicGame();
  const canMove = useClassicGameOnlineCanMove();
  const move = useClassicGameOnlineMove();
  const restart = useClassicGameOnlineRestart();

  const functions = { canMove, move, restart };

  return [state, functions] as [typeof state, typeof functions];
};
