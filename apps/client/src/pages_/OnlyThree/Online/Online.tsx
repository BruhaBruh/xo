'use client';

import { Input, InputField, Label, OIcon, XIcon } from '@/components/ui';
import { BackRestart } from '@/components/widget';
import { GameLayout } from '@/layouts/Game';
import { cn } from '@/lib/shadcn';
import { useInfo } from '@/providers/Info';
import {
  useOnlyThreeGameOnline,
  useOnlyThreeGameOnlineSocket,
} from '@/providers/OnlyThree';
import React from 'react';
import { GameField } from '../GameField';

export const OnlyThreeOnlinePage: React.FC = () => {
  const [info] = useInfo();

  const [{ field, userToMove, winner }, { move, canMove, restart }] =
    useOnlyThreeGameOnline();

  const { connect, disconnect } = useOnlyThreeGameOnlineSocket();

  React.useEffect(() => {
    connect();

    return () => disconnect();
  }, [connect, disconnect]);

  return (
    <GameLayout
      title="Only Three Tic-Tac-Toe"
      xNickname={info.x.status === 'waiting' ? 'Waiting' : info.x.nickname}
      xStatus={info.x.status}
      oNickname={info.o.status === 'waiting' ? 'Waiting' : info.o.nickname}
      oStatus={info.o.status}
    >
      {info.x.status !== 'waiting' && info.o.status !== 'waiting' && (
        <>
          <GameField field={field} move={move} canMove={canMove}>
            {winner !== null && (
              <div
                className={cn(
                  'flex flex-col items-center justify-center absolute top-0 right-0 left-0 bottom-0 z-10 !border-0 bg-secondary/75',
                  winner === 'x' && 'text-blue-500',
                  winner === 'o' && 'text-red-500'
                )}
              >
                <h2 className="typography-h1 font-bold">WON</h2>
                <div className="w-full max-w-[calc(100%-12rem)] aspect-square flex items-center justify-center">
                  {winner === 'x' && <XIcon size="field" />}
                  {winner === 'o' && <OIcon size="field" />}
                </div>
              </div>
            )}
          </GameField>
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
      <InputField className="max-w-max mx-auto mt-2">
        <Label htmlFor="code">Code</Label>
        <Input id="code" readOnly value={info.code} />
      </InputField>
    </GameLayout>
  );
};
