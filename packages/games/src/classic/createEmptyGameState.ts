import { ClassicGameState, User } from '../types';
import { createEmptyField } from './createEmptyField';

export const createEmptyClassicGameState = (
  userToMove: User = Math.floor(Math.random() * 1000) % 2 === 0 ? 'x' : 'o'
): ClassicGameState => ({
  userToMove,
  winner: null,
  field: createEmptyField(),
});
