'use client';

import { OnlineDialog } from '@/components/widget';
import { GameLayout } from '@/layouts/Game';
import Link from 'next/link';
import React from 'react';

export const MatrixPage: React.FC = () => {
  const [openOnlineDialog, setOpenOnlineDialog] = React.useState(false);

  return (
    <GameLayout title="Matrix Tic-Tac-Toe" withoutVersus>
      <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-96 mx-auto typography-large">
        <Link
          className="p-8 border rounded-xl flex items-center justify-center aspect-square hover:bg-accent hover:text-accent-foreground transition-colors"
          href="/matrix/offline"
        >
          Offline
        </Link>
        <button
          className="p-8 border rounded-xl flex items-center justify-center aspect-square hover:bg-accent hover:text-accent-foreground transition-colors"
          type="button"
          onClick={() => setOpenOnlineDialog(true)}
        >
          Online
        </button>
      </div>
      <OnlineDialog
        open={openOnlineDialog}
        onOpenChange={setOpenOnlineDialog}
        href="/matrix/online"
      />
    </GameLayout>
  );
};
