import { OnlyThreeGameState, User } from '../types';
import { createEmptyOnlyThreeGameField } from './createEmptyField';

export const createEmptyOnlyThreeGameState = (
  userToMove: User = Math.floor(Math.random() * 1000) % 2 === 0 ? 'x' : 'o'
): OnlyThreeGameState => ({
  userToMove,
  winner: null,
  field: createEmptyOnlyThreeGameField(),
});
