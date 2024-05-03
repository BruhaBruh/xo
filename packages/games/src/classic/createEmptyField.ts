import { ClassicGameField } from '../types';
import { repeat } from '../utility';

export const createEmptyClassicGameField = (): ClassicGameField =>
  repeat(null, 9);
