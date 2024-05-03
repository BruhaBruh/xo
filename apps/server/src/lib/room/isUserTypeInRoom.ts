import { UserId } from '@/lib/validation';
import { GameType, Room } from '@/types';
import { User } from '@xo/games';

export const isUserTypeInRoom = <R extends Room<GameType>>(
  room: R,
  userId: UserId,
  type: User
) => {
  return room.info[type].id === userId;
};
