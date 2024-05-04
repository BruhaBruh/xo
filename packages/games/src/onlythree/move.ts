import { OnlyThreeGameState } from '../types';
import { canMoveOnlyThreeGame } from './canMove';
import { clearLatestMoveOnlyThreeGame } from './clearLatestMove';
import { getOnlyThreeGameWinner } from './getWinner';

export const moveOnlyThreeGame = (
  state: OnlyThreeGameState,
  id: number
): OnlyThreeGameState => {
  if (!canMoveOnlyThreeGame(state.winner, state.field, id)) return state;

  let newState = structuredClone(state);
  newState.field[id].value = newState.userToMove;
  newState.field[id].time = Date.now();
  newState = clearLatestMoveOnlyThreeGame(newState);
  newState.userToMove = state.userToMove === 'x' ? 'o' : 'x';
  newState.winner = getOnlyThreeGameWinner(state.field);
  newState.field[id].value = state.userToMove;
  newState.userToMove = state.userToMove === 'x' ? 'o' : 'x';
  newState.winner = getOnlyThreeGameWinner(newState.field);

  return newState;
};
