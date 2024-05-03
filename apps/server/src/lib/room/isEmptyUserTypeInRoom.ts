import { GameType, Room, User } from '@xo/games';

export const isEmptyUserTypeInRoom = <R extends Room<GameType>>(
  room: R,
  type: User
): boolean => {
  return !room.info[type].id;
};
