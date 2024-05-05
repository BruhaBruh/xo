'use client';

import { socket } from '@/lib/socket';
import React from 'react';

export const useSocket = () => {
  const [isConnected, setIsConnected] = React.useState(socket.connected);

  const [transport, setTransport] = React.useState(
    socket.io.engine.transport.name
  );

  React.useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on('upgrade', (t: { name: string }) => {
        setTransport(t.name);
      });
    };

    if (socket.connected) {
      onConnect();
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport('N/A');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return { isConnected, transport };
};
