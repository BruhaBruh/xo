import { MatrixGameCellState, MatrixGameField } from '../types';
import { repeat } from '../utility';

const emptyMatrixCell: MatrixGameCellState = {
  winner: null,
  field: repeat(null, 9),
};

export const createEmptyMatrixGameField = (): MatrixGameField =>
  repeat(emptyMatrixCell, 9);
