import { ClassicGameState } from './classic';
import { User, WinnerOrDraw } from './global';
import { Tuple } from './utility';

export type MatrixGameCellState = Omit<ClassicGameState, 'userToMove'>;

export type MatrixGameField = Tuple<MatrixGameCellState, 9>;

export type MatrixGameState = {
  userToMove: User;
  winner: WinnerOrDraw;
  allowedMatrixCellToMove: number | null;
  field: MatrixGameField;
};
