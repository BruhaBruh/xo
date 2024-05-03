import {
  OnlyThreeGameCell,
  OnlyThreeGameField,
  OnlyThreeGameState,
  Tuple,
  User,
  Winner,
} from '../types';
import { repeat } from '../utility';

const emptyCell: OnlyThreeGameCell = {
  value: null,
  blink: false,
  time: null,
};

const createEmptyField = (): OnlyThreeGameField => repeat(emptyCell, 9);

export const createEmptyOnlyThreeGameState = (
  userToMove: User = Math.floor(Math.random() * 1000) % 2 === 0 ? 'x' : 'o'
): OnlyThreeGameState => ({
  userToMove,
  winner: null,
  field: createEmptyField(),
});

export class OnlyThreeGame {
  private state: OnlyThreeGameState = createEmptyOnlyThreeGameState();

  constructor(state?: OnlyThreeGameState) {
    if (!state) return;
    this.state = state;
  }

  public canMove = (id: number): boolean => {
    if (this.state.field[id] === undefined) return false;
    if (this.state.field[id].value !== null) return false;
    if (this.state.winner !== null) return false;

    return true;
  };

  public isBlinking = (id: number): boolean => this.state.field[id].blink;

  public move(id: number): boolean {
    if (!this.canMove(id)) return false;

    this.state.field[id].value = this.state.userToMove;
    this.state.field[id].time = Date.now();
    this.clearLatestMove();
    this.state.userToMove = this.state.userToMove === 'x' ? 'o' : 'x';
    this.state.winner = this.getWinner();

    return true;
  }

  public restart() {
    this.state = createEmptyOnlyThreeGameState();
  }

  public toState(): OnlyThreeGameState {
    return structuredClone(this.state);
  }

  private getWinner(): Winner {
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
        const isWinner = line.every((v) => this.state.field[v].value === user);

        if (!isWinner) continue;

        return user;
      }
    }

    return null;
  }

  private clearLatestMove() {
    const users: User[] = ['x', 'o'];

    for (let i = 0; i < users.length; i += 1) {
      const user = users[i];

      const userCells = this.state.field
        .map((v, index) => ({ ...v, index }))
        .filter((v) => v.value === user && v.time !== null)
        .map((v) => ({ index: v.index, time: v.time! }))
        .sort((a, b) => a.time - b.time);

      if (userCells.length < 3) continue;

      let fieldIndexToBlink = userCells[0].index;

      if (userCells.length === 4) {
        this.state.field[userCells[0].index] = structuredClone(emptyCell);
        fieldIndexToBlink = userCells[1].index;
      }

      this.state.field[fieldIndexToBlink].blink = true;
    }
  }
}
