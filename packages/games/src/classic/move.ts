import { ClassicGameState } from '../types';
import { canMoveClassicGame } from './canMove';
import { getClassicGameWinner } from './getWinner';

export const moveClassicGame = (
  state: ClassicGameState,
  id: number
): ClassicGameState => {
  if (!canMoveClassicGame(state.winner, state.field, id)) return state;

  const newState = structuredClone(state);
  newState.field[id] = state.userToMove;
  newState.userToMove = state.userToMove === 'x' ? 'o' : 'x';
  newState.winner = getClassicGameWinner(newState.field);

  return newState;
};
