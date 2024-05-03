import { GameType } from '@/types';

export const getRoomId = <T extends GameType, Code extends string>(
  type: T,
  code: Code
): `${T}:${Code}` => `${type}:${code}`;
