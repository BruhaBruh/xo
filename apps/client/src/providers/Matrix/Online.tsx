'use client';

import { createFastContext } from '@/lib/fastContext';
import { socket } from '@/lib/socket';
import { useInfo } from '@/providers/Info';
import {
  MatrixGameState,
  Room,
  canMoveInMatrixMatrixGame,
  canMoveMatrixGame,
  createEmptyMatrixGameState,
} from '@xo/games';
import { useRouter } from 'next/navigation';
import React from 'react';

const { Provider, useStore: useMatrixGame } = createFastContext(
  createEmptyMatrixGameState('x')
);

export const MatrixGameOnlineProvider: React.FC<
  React.PropsWithChildren<{
    state: MatrixGameState;
  }>
> = ({ state, children }) => {
  return <Provider value={state}>{children}</Provider>;
};

export const useMatrixGameOnlineSocket = () => {
  const [info, setInfo] = useInfo();
  const [, setState] = useMatrixGame();
  const router = useRouter();

  const connect = React.useCallback(() => {
    if (!info.userId) return;
    if (!info.nickname) return;
    if (!info.code) return;

    socket.emit('matrix-connect', {
      userId: info.userId,
      nickname: info.nickname,
      code: info.code,
    });
  }, [info.code, info.nickname, info.userId]);

  const disconnect = React.useCallback(() => {
    socket.emit('matrix-disconnect');
  }, []);

  React.useEffect(() => {
    if (!info.userId) return;
    if (!info.nickname) return;
    if (!info.code) return;

    const matrixConnectListener = (data: unknown) => {
      console.error(data);
      router.replace('/matrix');
    };

    const roomListener = (room: Room<'matrix'>) => {
      setInfo(room.info);
      setState(room.state);
    };

    socket.once('matrix-connect', matrixConnectListener);
    socket.on(`matrix-${info.code}`, roomListener);

    return () => {
      socket.off('matrix-connect', matrixConnectListener);
      socket.off(`matrix-${info.code}`, roomListener);
    };
  }, [info, router, setInfo, setState]);

  return {
    connect,
    disconnect,
  };
};

export const useMatrixGameOnlineCanMoveInMatrix = () => {
  const [info] = useInfo();
  const [state] = useMatrixGame();

  const canMove = (matrixId: number): boolean => {
    if (info[state.userToMove].id !== info.userId) return false;

    return canMoveInMatrixMatrixGame(
      state.allowedMatrixCellToMove,
      state.field,
      matrixId
    );
  };

  return canMove;
};

export const useMatrixGameOnlineCanMove = () => {
  const [info] = useInfo();
  const [state] = useMatrixGame();

  const canMove = (matrixId: number, id: number): boolean => {
    if (info[state.userToMove].id !== info.userId) return false;

    return canMoveMatrixGame(
      state.allowedMatrixCellToMove,
      state.field,
      matrixId,
      id
    );
  };

  return canMove;
};

export const useMatrixGameOnlineMove = () => {
  const [info] = useInfo();
  const [state] = useMatrixGame();

  const move = (matrixId: number, id: number): void => {
    if (!info.userId) return;
    if (!info.nickname) return;
    if (!info.code) return;
    if (info[state.userToMove].id !== info.userId) return;

    socket.emit(`matrix-${info.code}`, { type: 'move', matrixId, id });
  };

  return move;
};

export const useMatrixGameOnlineRestart = () => {
  const [info] = useInfo();

  const restart = (): void => {
    if (!info.userId) return;
    if (!info.nickname) return;
    if (!info.code) return;
    if (info.x.id !== info.userId) return;

    socket.emit(`matrix-${info.code}`, { type: 'restart' });
  };

  return restart;
};

export const useMatrixGameOnline = () => {
  const [state] = useMatrixGame();
  const canMoveInMatrix = useMatrixGameOnlineCanMoveInMatrix();
  const canMove = useMatrixGameOnlineCanMove();
  const move = useMatrixGameOnlineMove();
  const restart = useMatrixGameOnlineRestart();

  const functions = { canMoveInMatrix, canMove, move, restart };

  return [state, functions] as [typeof state, typeof functions];
};
