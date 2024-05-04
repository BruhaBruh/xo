import { MatrixGameCellState, Tuple, User, WinnerOrDraw } from '../types';

export const getMatrixGameFieldWinner = (
  field: MatrixGameCellState['field']
): WinnerOrDraw => {
  const winnerLines: Tuple<number, 3>[] = [
    // first row
    [0, 1, 2],
    // second row
    [3, 4, 5],
    // third row
    [6, 7, 8],
    // first column
    [0, 3, 6],
    // second column
    [1, 4, 7],
    // third column
    [2, 5, 8],
    // diagonal from top left to bottom right
    [0, 4, 8],
    // diagonal from bottom left to top right
    [2, 4, 6],
  ];

  const users: User[] = ['x', 'o'];

  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];

    for (let j = 0; j < winnerLines.length; j += 1) {
      const line = winnerLines[j];
      const isWinner = line.every((v) => field[v] === user);

      if (!isWinner) continue;

      return user;
    }
  }

  const isDraw = field.every((v) => v !== null);
  if (isDraw) return 'draw';

  return null;
};
