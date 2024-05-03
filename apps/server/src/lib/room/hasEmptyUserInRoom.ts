import { GameType, Room } from '@/types';
import { isEmptyUserTypeInRoom } from './isEmptyUserTypeInRoom';

export const hasEmptyUserInRoom = <R extends Room<GameType>>(
  room: R
): boolean => {
  return isEmptyUserTypeInRoom(room, 'x') || isEmptyUserTypeInRoom(room, 'o');
};
