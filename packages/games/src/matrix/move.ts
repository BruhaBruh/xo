import { MatrixGameState } from '../types';
import { canMoveMatrixGame } from './canMove';
import { getMatrixGameFieldWinner } from './getFieldWinner';
import { getMatrixGameWinner } from './getWinner';

export const moveMatrixGame = (
  state: MatrixGameState,
  matrixId: number,
  id: number
): MatrixGameState => {
  if (
    !canMoveMatrixGame(state.allowedMatrixCellToMove, state.field, matrixId, id)
  )
    return state;

  const newState = structuredClone(state);
  newState.field[matrixId].field[id] = newState.userToMove;

  newState.field[matrixId].winner = getMatrixGameFieldWinner(
    state.field[matrixId].field
  );

  newState.allowedMatrixCellToMove =
    newState.field[id].winner === null ? id : null;
  newState.userToMove = newState.userToMove === 'x' ? 'o' : 'x';
  newState.winner = getMatrixGameWinner(newState.field);

  return newState;
};
