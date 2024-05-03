import { ClassicGameState } from '../types';

export const canMoveClassicGame = (
  winner: ClassicGameState['winner'],
  field: ClassicGameState['field'],
  id: number
): boolean => {
  if (field[id] === undefined) return false;
  if (field[id] !== null) return false;
  if (winner !== null) return false;

  return true;
};
