import {
  connectToRoom,
  disconnectFromRoom,
  getRoom,
  isUserTypeInRoom,
  saveRoom,
} from '@/lib/room';
import {
  Metadata,
  Room,
  User,
  createEmptyOnlyThreeGameState,
  metadataSchema,
  moveOnlyThreeGame,
  structureError,
} from '@xo/games';
import EventEmitter from 'node:events';
import { Socket } from 'socket.io';
import { z } from 'zod';

const messageSchema = z
  .object({
    type: z.literal('move'),
    id: z.number().min(0).max(8),
  })
  .or(z.object({ type: z.literal('restart') }));

const ee = new EventEmitter();

export const configureOnlyThreeGameSocket = (socket: Socket) => {
  socket.on('onlythree-connect', async (rawMetadata: Metadata) => {
    // #region metadata validation
    const result = metadataSchema.safeParse(rawMetadata);

    if (!result.success) {
      socket.emit('onlythree-connect', {
        status: 400,
        error: structureError(result.error),
      });

      return;
    }
    const metadata = result.data;
    // #endregion

    // #region connect to room
    const connectedRoom = await connectToRoom(
      'onlythree',
      metadata.code,
      metadata.userId,
      metadata.nickname
    );

    if (!connectedRoom) {
      socket.emit('onlythree-connect', { status: 404 });

      return;
    }

    const user: User = isUserTypeInRoom(connectedRoom, metadata.userId, 'x')
      ? 'x'
      : 'o';
    const roomId = `onlythree-${metadata.code}`;

    const eeHandler = (room: Room<'onlythree'>) => socket.emit(roomId, room);
    ee.on(metadata.code, eeHandler);
    ee.emit(metadata.code, connectedRoom);
    // #endregion

    // #region move
    const roomHandler = async (rawData: z.infer<typeof messageSchema>) => {
      const r = messageSchema.safeParse(rawData);

      if (!r.success) {
        socket.emit(roomId, {
          status: 400,
          error: structureError(r.error),
        });

        return;
      }
      const room = await getRoom('onlythree', metadata.code);

      if (!room) {
        socket.emit(roomId, { status: 404 });

        return;
      }
      if (room.info.o.status === 'waiting' || room.info.x.status === 'waiting')
        return;

      const msg = r.data;

      if (msg.type === 'restart') {
        room.state = createEmptyOnlyThreeGameState();
      }

      if (msg.type === 'move') {
        if (user !== room.state.userToMove) return;

        room.state = moveOnlyThreeGame(room.state, msg.id);
      }

      await saveRoom('onlythree', room);

      ee.emit(metadata.code, room);
    };

    socket.on(roomId, roomHandler);
    // #endregion

    // #region disconnect from room on close connection
    const closeLogic = async () => {
      const room = await disconnectFromRoom(
        'onlythree',
        metadata.code,
        metadata.userId
      );
      if (!room) return;
      ee.emit(metadata.code, room);
      ee.off(metadata.code, eeHandler);
      socket.off(roomId, roomHandler);
      socket.conn.off('close', closeLogic);
      socket.off('onlythree-disconnect', closeLogic);
    };

    socket.conn.once('close', closeLogic);
    socket.once('onlythree-disconnect', closeLogic);
    // #endregion
  });
};
