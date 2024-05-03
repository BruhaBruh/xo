import { redis } from '@/lib/redis';
import { GameType, Room } from '@xo/games';
import { getRoomId } from './getRoomId';

export const saveRoom = async <T extends GameType>(type: T, room: Room<T>) => {
  const roomId = getRoomId(type, room.info.code);

  await redis.setEx(roomId, 60 * 5, JSON.stringify(room));
};
