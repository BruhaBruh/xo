import { UserId } from '@/lib/validation';
import { GameType, Room } from '@/types';
import { isUserTypeInRoom } from './isUserTypeInRoom';

export const hasUserInRoom = <R extends Room<GameType>>(
  room: R,
  userId: UserId
) => {
  return (
    isUserTypeInRoom(room, userId, 'x') || isUserTypeInRoom(room, userId, 'o')
  );
};
