'use client';

import { DrawIcon, OIcon, XIcon } from '@/components/ui';
import { BackRestart } from '@/components/widget';
import { GameLayout } from '@/layouts/Game';
import { cn } from '@/lib/shadcn';
import { useClassicGameOffline } from '@/providers/Classic';
import React from 'react';
import { GameField } from '../GameField';

export const ClassicOfflinePage: React.FC = () => {
  const [{ field, userToMove, winner }, { move, canMove, restart }] =
    useClassicGameOffline();

  React.useEffect(() => {
    restart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GameLayout title="Classic Tic-Tac-Toe">
      <GameField field={field} move={move} canMove={canMove}>
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
      </GameField>
      {winner === null && (
        <h2 className="flex flex-col items-center justify-center gap-2 typography-small mb-4">
          <span>Turn</span>
          {userToMove === 'x' && <XIcon className="h-8 w-8" />}
          {userToMove === 'o' && <OIcon className="h-8 w-8" />}
        </h2>
      )}
      <BackRestart onRestart={restart} />
    </GameLayout>
  );
};
