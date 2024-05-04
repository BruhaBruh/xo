import { OnlyThreeGameCell, OnlyThreeGameField } from '../types';
import { repeat } from '../utility';

export const emptyCell: OnlyThreeGameCell = {
  value: null,
  blink: false,
  time: null,
};

export const createEmptyOnlyThreeGameField = (): OnlyThreeGameField =>
  repeat(emptyCell, 9);
