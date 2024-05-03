import { GameType, Room } from '@/types';
import { getRoom } from './getRoom';
import { hasEmptyUserInRoom } from './hasEmptyUserInRoom';
import { hasUserInRoom } from './hasUserInRoom';
import { isEmptyUserTypeInRoom } from './isEmptyUserTypeInRoom';
import { isUserTypeInRoom } from './isUserTypeInRoom';
import { saveRoom } from './saveRoom';

export const connectToRoom = async <T extends GameType>(
  type: T,
  code: string,
  userId: string,
  nickname: string
): Promise<Room<T> | null> => {
  const room = await getRoom(type, code);
  if (!room) return null;

  if (hasUserInRoom(room, userId)) {
    if (isUserTypeInRoom(room, userId, 'x')) {
      room.info.x.status = 'connected';
    } else {
      room.info.o.status = 'connected';
    }
  } else {
    if (!hasEmptyUserInRoom(room)) return null;

    if (isEmptyUserTypeInRoom(room, 'x')) {
      room.info.x = {
        id: userId,
        nickname,
        status: 'connected',
      };
    } else {
      room.info.o = {
        id: userId,
        nickname,
        status: 'connected',
      };
    }
  }

  await saveRoom(type, room);

  return room;
};
