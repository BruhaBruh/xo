import { ClassicGameField } from '../types';
import { repeat } from '../utility';

export const createEmptyField = (): ClassicGameField => repeat(null, 9);
