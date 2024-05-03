'use client';

import { createFastContext } from '@/lib/fastContext';
import { RoomInfo } from '@xo/games';
import React from 'react';

const initialInfo: {
  userId: string;
  nickname: string;
} & RoomInfo = {
  userId: '',
  nickname: '',
  code: '',
  x: {
    id: '',
    nickname: '',
    status: 'waiting',
  },
  o: {
    id: '',
    nickname: '',
    status: 'waiting',
  },
};

const { Provider, useStore: useInfo } = createFastContext(initialInfo);

export { useInfo };

export const InfoProvider: React.FC<
  React.PropsWithChildren<{
    room: RoomInfo;
    userId: string;
    nickname: string;
  }>
> = ({ room, userId, nickname, children }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = React.useMemo(() => ({ ...room, userId, nickname }), []);

  return <Provider value={value}>{children}</Provider>;
};
