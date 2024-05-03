import { redis } from '@/lib/redis';
import {
  GameState,
  GameType,
  Nickname,
  Room,
  UserId,
  createEmptyClassicGameState,
  randomId,
} from '@xo/games';
import { getRoomId } from './getRoomId';
import { saveRoom } from './saveRoom';

const createEmptyGameState = <T extends GameType>(type: T): GameState<T> => {
  if (type === 'classic') return createEmptyClassicGameState() as GameState<T>;
  throw new Error('Unknown game type');
};

const createEmptyRoom = <T extends GameType>(type: T): Room<T> => {
  return {
    info: {
      code: '',
      x: { id: '', nickname: '', status: 'waiting' },
      o: { id: '', nickname: '', status: 'waiting' },
    },
    state: createEmptyGameState(type),
  };
};

export const createRoom = async <T extends GameType>(
  type: T,
  userId: UserId,
  nickname: Nickname
): Promise<Room<T>> => {
  let code = randomId();

  let isExists = await redis.exists(getRoomId(type, code));

  while (isExists) {
    code = randomId();
    // eslint-disable-next-line no-await-in-loop
    isExists = await redis.exists(getRoomId(type, code));
  }

  const room = createEmptyRoom(type);

  room.info.code = code;
  room.info.x.id = userId;
  room.info.x.nickname = nickname;

  await saveRoom(type, room);

  return room;
};
