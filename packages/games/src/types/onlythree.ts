import { CellValue, User, Winner } from './global';
import { Tuple } from './utility';

export type OnlyThreeGameCell = {
  value: CellValue;
  blink: boolean;
  time: number | null;
};

export type OnlyThreeGameField = Tuple<OnlyThreeGameCell, 9>;

export type OnlyThreeGameState = {
  userToMove: User;
  winner: Winner;
  field: OnlyThreeGameField;
};
