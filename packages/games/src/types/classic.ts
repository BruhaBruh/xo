import { CellValue, User, WinnerOrDraw } from './global';
import { Tuple } from './utility';

export type ClassicGameField = Tuple<CellValue, 9>;

export type ClassicGameState = {
  userToMove: User;
  winner: WinnerOrDraw;
  field: ClassicGameField;
};
