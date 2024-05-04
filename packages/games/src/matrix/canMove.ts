import { MatrixGameState } from '../types';
import { canMoveInMatrixMatrixGame } from './canMoveInMatrix';

export const canMoveMatrixGame = (
  allowedMatrixCellToMove: MatrixGameState['allowedMatrixCellToMove'],
  field: MatrixGameState['field'],
  matrixId: number,
  id: number
): boolean => {
  if (!canMoveInMatrixMatrixGame(allowedMatrixCellToMove, field, matrixId))
    return false;
  if (field[matrixId].winner !== null) return false;
  if (field[matrixId].field[id] !== null) return false;

  return true;
};
