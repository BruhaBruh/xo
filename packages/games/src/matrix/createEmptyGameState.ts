import { MatrixGameState, User } from '../types';
import { createEmptyMatrixGameField } from './createEmptyField';

export const createEmptyMatrixGameState = (
  userToMove: User = Math.floor(Math.random() * 1000) % 2 === 0 ? 'x' : 'o'
): MatrixGameState => ({
  userToMove,
  winner: null,
  allowedMatrixCellToMove: null,
  field: createEmptyMatrixGameField(),
});
