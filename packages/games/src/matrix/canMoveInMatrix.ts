import { MatrixGameState } from '../types';

export const canMoveInMatrixMatrixGame = (
  allowedMatrixCellToMove: MatrixGameState['allowedMatrixCellToMove'],
  field: MatrixGameState['field'],
  matrixId: number
): boolean => {
  if (allowedMatrixCellToMove === null) return true;
  if (allowedMatrixCellToMove !== matrixId) return false;
  if (field[matrixId].winner !== null) return false;

  return true;
};
