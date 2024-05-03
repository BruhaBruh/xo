import { ClassicGameState } from '../types';
import { canMove } from './canMove';
import { getWinner } from './getWinner';

export const move = (state: ClassicGameState, id: number): ClassicGameState => {
  if (!canMove(state.winner, state.field, id)) return state;

  const newState = structuredClone(state);
  newState.field[id] = state.userToMove;
  newState.userToMove = state.userToMove === 'x' ? 'o' : 'x';
  newState.winner = getWinner(newState.field);

  return newState;
};
