'use client';

import { createFastContext } from '@/lib/fastContext';
import { RoomInfo } from '@xo/games';

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

export const { Provider: InfoProvider, useStore: useInfo } =
  createFastContext(initialInfo);
