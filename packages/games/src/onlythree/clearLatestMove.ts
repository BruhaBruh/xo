import { OnlyThreeGameState, User } from '../types';
import { emptyCell } from './createEmptyField';

export const clearLatestMoveOnlyThreeGame = (
  state: OnlyThreeGameState
): OnlyThreeGameState => {
  const users: User[] = ['x', 'o'];

  const newState = structuredClone(state);

  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];

    const userCells = newState.field
      .map((v, index) => ({ ...v, index }))
      .filter((v) => v.value === user && v.time !== null)
      .map((v) => ({ index: v.index, time: v.time! }))
      .sort((a, b) => a.time - b.time);

    if (userCells.length < 3) continue;

    let fieldIndexToBlink = userCells[0].index;

    if (userCells.length === 4) {
      newState.field[userCells[0].index] = structuredClone(emptyCell);
      fieldIndexToBlink = userCells[1].index;
    }

    newState.field[fieldIndexToBlink].blink = true;
  }

  return newState;
};
