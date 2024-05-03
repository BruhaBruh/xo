import {
  MatrixGameCellState,
  MatrixGameField,
  MatrixGameState,
  Tuple,
  User,
  WinnerOrDraw,
} from '../types';
import { repeat } from '../utility';

const emptyMatrixCell: MatrixGameCellState = {
  winner: null,
  field: repeat(null, 9),
};

const createEmptyField = (): MatrixGameField => repeat(emptyMatrixCell, 9);

export const createEmptyMatrixGameState = (
  userToMove: User = Math.floor(Math.random() * 1000) % 2 === 0 ? 'x' : 'o'
): MatrixGameState => ({
  userToMove,
  winner: null,
  allowedMatrixCellToMove: null,
  field: createEmptyField(),
});

export class MatrixGame {
  private state: MatrixGameState = createEmptyMatrixGameState();

  constructor(state?: MatrixGameState) {
    if (!state) return;
    this.state = state;
  }

  public canMoveInMatrix = (matrixId: number): boolean => {
    if (this.state.allowedMatrixCellToMove === null) return true;
    if (this.state.allowedMatrixCellToMove !== matrixId) return false;
    if (this.state.field[matrixId].winner !== null) return false;

    return true;
  };

  public canMove = (matrixId: number, id: number): boolean => {
    if (!this.canMoveInMatrix(matrixId)) return false;
    if (this.state.field[matrixId].winner !== null) return false;
    if (this.state.field[matrixId].field[id] !== null) return false;

    return true;
  };

  public move(matrixId: number, id: number): boolean {
    if (!this.canMove(matrixId, id)) return false;

    this.state.field[matrixId].field[id] = this.state.userToMove;
    this.state.field[matrixId].winner = this.getFieldWinner(matrixId);

    this.state.allowedMatrixCellToMove =
      this.state.field[id].winner === null ? id : null;
    this.state.userToMove = this.state.userToMove === 'x' ? 'o' : 'x';
    this.state.winner = this.getWinner();

    return true;
  }

  public restart() {
    this.state = createEmptyMatrixGameState();
  }

  public toState(): MatrixGameState {
    return structuredClone(this.state);
  }

  private getWinner(): WinnerOrDraw {
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
        const isWinner = line.every((v) => this.state.field[v].winner === user);

        if (!isWinner) continue;

        return user;
      }
    }

    const isDraw = this.state.field.every((v) => v.winner !== null);
    if (isDraw) return 'draw';

    return null;
  }

  private getFieldWinner(matrixId: number): WinnerOrDraw {
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

    const matrix = this.state.field[matrixId];
    if (matrix.winner !== null) return matrix.winner;

    for (let i = 0; i < users.length; i += 1) {
      const user = users[i];

      for (let j = 0; j < winnerLines.length; j += 1) {
        const line = winnerLines[j];
        const isWinner = line.every((v) => matrix.field[v] === user);

        if (!isWinner) continue;

        return user;
      }
    }

    const isDraw = matrix.field.every(Boolean);
    if (isDraw) return 'draw';

    return null;
  }
}
