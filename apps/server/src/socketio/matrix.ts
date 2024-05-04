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
  createEmptyMatrixGameState,
  metadataSchema,
  moveMatrixGame,
  structureError,
} from '@xo/games';
import EventEmitter from 'node:events';
import { Socket } from 'socket.io';
import { z } from 'zod';

const messageSchema = z
  .object({
    type: z.literal('move'),
    matrixId: z.number().min(0).max(8),
    id: z.number().min(0).max(8),
  })
  .or(z.object({ type: z.literal('restart') }));

const ee = new EventEmitter();

export const configureMatrixGameSocket = (socket: Socket) => {
  socket.on('matrix-connect', async (rawMetadata: Metadata) => {
    // #region metadata validation
    const result = metadataSchema.safeParse(rawMetadata);

    if (!result.success) {
      socket.emit('matrix-connect', {
        status: 400,
        error: structureError(result.error),
      });

      return;
    }
    const metadata = result.data;
    // #endregion

    // #region connect to room
    const connectedRoom = await connectToRoom(
      'matrix',
      metadata.code,
      metadata.userId,
      metadata.nickname
    );

    if (!connectedRoom) {
      socket.emit('matrix-connect', { status: 404 });

      return;
    }

    const user: User = isUserTypeInRoom(connectedRoom, metadata.userId, 'x')
      ? 'x'
      : 'o';
    const roomId = `matrix-${metadata.code}`;

    const eeHandler = (room: Room<'matrix'>) => socket.emit(roomId, room);
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
      const room = await getRoom('matrix', metadata.code);

      if (!room) {
        socket.emit(roomId, { status: 404 });

        return;
      }
      if (room.info.o.status === 'waiting' || room.info.x.status === 'waiting')
        return;

      const msg = r.data;

      if (msg.type === 'restart') {
        room.state = createEmptyMatrixGameState();
      }

      if (msg.type === 'move') {
        if (user !== room.state.userToMove) return;

        room.state = moveMatrixGame(room.state, msg.matrixId, msg.id);
      }

      await saveRoom('matrix', room);

      ee.emit(metadata.code, room);
    };

    socket.on(roomId, roomHandler);
    // #endregion

    // #region disconnect from room on close connection
    const closeLogic = async () => {
      const room = await disconnectFromRoom(
        'matrix',
        metadata.code,
        metadata.userId
      );
      if (!room) return;
      ee.emit(metadata.code, room);
      ee.off(metadata.code, eeHandler);
      socket.off(roomId, roomHandler);
      socket.conn.off('close', closeLogic);
      socket.off('matrix-disconnect', closeLogic);
    };

    socket.conn.once('close', closeLogic);
    socket.once('matrix-disconnect', closeLogic);
    // #endregion
  });
};
