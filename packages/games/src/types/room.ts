import { ClassicGameState } from './classic';
import { MatrixGameState } from './matrix';
import { OnlyThreeGameState } from './onlythree';

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

export type RoomInfo = {
  code: string;
  x: Player;
  o: Player;
};

export type Room<T extends GameType> = {
  info: RoomInfo;
  state: GameState<T>;
};
