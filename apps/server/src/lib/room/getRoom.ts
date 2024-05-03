import { redis } from '@/lib/redis';
import { GameType, Room } from '@xo/games';
import { getRoomId } from './getRoomId';

export const getRoom = async <T extends GameType>(
  type: T,
  code: string
): Promise<Room<T> | null> => {
  const roomId = getRoomId(type, code);

  const rawRoom = await redis.get(roomId);
  if (!rawRoom) return null;

  return JSON.parse(rawRoom) as Room<T>;
};
