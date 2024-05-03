import {
  ClassicGameState,
  MatrixGameState,
  OnlyThreeGameState,
} from '@xo/games';

export type PlayerStatus = 'connected' | 'disconnected' | 'waiting';

export type Player = {
  id: string;
  nickname: string;
  status: PlayerStatus;
};

export type GameType = 'classic' | 'matrix' | 'onlythree';

export type GameState<T extends GameType> = T extends 'classic'
  ? ClassicGameState
  : T extends 'matrix'
    ? MatrixGameState
    : T extends 'onlythree'
      ? OnlyThreeGameState
      : never;

export type Room<T extends GameType> = {
  info: {
    code: string;
    x: Player;
    o: Player;
  };
  state: GameState<T>;
};
