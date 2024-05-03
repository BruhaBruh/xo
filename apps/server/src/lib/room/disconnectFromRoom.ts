import { GameType, Room } from '@/types';
import { getRoom } from './getRoom';
import { hasUserInRoom } from './hasUserInRoom';
import { isUserTypeInRoom } from './isUserTypeInRoom';
import { saveRoom } from './saveRoom';

export const disconnectFromRoom = async <T extends GameType>(
  type: T,
  code: string,
  userId: string
): Promise<Room<T> | null> => {
  const room = await getRoom(type, code);
  if (!room) return null;
  if (!hasUserInRoom(room, userId)) return null;

  if (isUserTypeInRoom(room, userId, 'x')) {
    room.info.x.status = 'disconnected';
  } else {
    room.info.o.status = 'disconnected';
  }

  await saveRoom(type, room);

  return room;
};
