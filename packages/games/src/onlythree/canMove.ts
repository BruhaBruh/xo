import { OnlyThreeGameState } from '../types';

export const canMoveOnlyThreeGame = (
  winner: OnlyThreeGameState['winner'],
  field: OnlyThreeGameState['field'],
  id: number
): boolean => {
  if (field[id] === undefined) return false;
  if (field[id].value !== null) return false;
  if (winner !== null) return false;

  return true;
};
