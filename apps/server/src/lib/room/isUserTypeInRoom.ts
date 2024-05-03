import { GameType, Room, User, UserId } from '@xo/games';

export const isUserTypeInRoom = <R extends Room<GameType>>(
  room: R,
  userId: UserId,
  type: User
) => {
  return room.info[type].id === userId;
};
