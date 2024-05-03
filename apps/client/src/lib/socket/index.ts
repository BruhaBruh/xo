'use client';

import { io } from 'socket.io-client';

export const socket = io(
  process.env.NEXT_PUBLIC_SERVER_URL!.startsWith('https://')
    ? `wss://${process.env.NEXT_PUBLIC_SERVER_URL!.substring(8)}`
    : `ws://${process.env.NEXT_PUBLIC_SERVER_URL!.substring(7)}`
);
