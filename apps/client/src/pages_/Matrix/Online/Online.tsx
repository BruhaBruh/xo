'use client';

import { DrawIcon, OIcon, XIcon } from '@/components/ui';
import { BackRestart, CodeLinkCopy } from '@/components/widget';
import { GameLayout } from '@/layouts/Game';
import { cn } from '@/lib/shadcn';
import { useInfo } from '@/providers/Info';
import {
  useMatrixGameOnline,
  useMatrixGameOnlineSocket,
} from '@/providers/Matrix';
import React from 'react';
import { MatrixGameField } from '../MatrixGameField';

export const MatrixOnlinePage: React.FC = () => {
  const [info] = useInfo();

  const [
    { field, userToMove, winner },
    { move, canMoveInMatrix, canMove, restart },
  ] = useMatrixGameOnline();

  const { connect, disconnect } = useMatrixGameOnlineSocket();

  React.useEffect(() => {
    connect();

    return () => disconnect();
  }, [connect, disconnect]);

  return (
    <GameLayout
      title="Matrix Tic-Tac-Toe"
      xNickname={info.x.status === 'waiting' ? 'Waiting' : info.x.nickname}
      xStatus={info.x.status}
      oNickname={info.o.status === 'waiting' ? 'Waiting' : info.o.nickname}
      oStatus={info.o.status}
    >
      {info.x.status !== 'waiting' && info.o.status !== 'waiting' && (
        <>
          <MatrixGameField
            field={field}
            move={move}
            canMove={canMove}
            canMoveInMatrix={canMoveInMatrix}
          >
            {winner !== null && (
              <div
                className={cn(
                  'flex flex-col items-center justify-center absolute top-0 right-0 left-0 bottom-0 z-10 !border-0 bg-secondary/75',
                  winner === 'draw' && 'text-secondary-foreground',
                  winner === 'x' && 'text-blue-500',
                  winner === 'o' && 'text-red-500'
                )}
              >
                <h2 className="typography-h1 font-bold">
                  {winner === 'draw' ? 'DRAW' : 'WON'}
                </h2>
                <div className="w-full max-w-[calc(100%-12rem)] aspect-square flex items-center justify-center">
                  {winner === 'draw' && <DrawIcon size="field" />}
                  {winner === 'x' && <XIcon size="field" />}
                  {winner === 'o' && <OIcon size="field" />}
                </div>
              </div>
            )}
          </MatrixGameField>
          {winner === null && (
            <h2 className="flex flex-col items-center justify-center gap-2 typography-small mb-4">
              <span>Turn</span>
              {userToMove === 'x' && <XIcon className="h-8 w-8" />}
              {userToMove === 'o' && <OIcon className="h-8 w-8" />}
            </h2>
          )}
          <BackRestart
            showRestart={info.x.id === info.userId}
            onRestart={restart}
          />
        </>
      )}
      <CodeLinkCopy code={info.code} />
    </GameLayout>
  );
};
