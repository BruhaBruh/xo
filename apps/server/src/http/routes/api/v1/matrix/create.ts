import { createRoom } from '@/lib/room';
import { nicknameSchema, structureError, userIdSchema } from '@xo/games';
import { RequestHandler } from 'express';
import { z } from 'zod';

const createMatrixRoomSchema = z.object({
  userId: userIdSchema,
  nickname: nicknameSchema,
});

export const createMatrixRoom: RequestHandler = async (req, res) => {
  const result = createMatrixRoomSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(structureError(result.error));

    return;
  }
  const { userId, nickname } = result.data;

  const room = await createRoom('matrix', userId, nickname);

  res.json(room);
};
