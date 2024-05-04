import { createRoom } from '@/lib/room';
import { nicknameSchema, structureError, userIdSchema } from '@xo/games';
import { RequestHandler } from 'express';
import { z } from 'zod';

const createOnlyThreeRoomSchema = z.object({
  userId: userIdSchema,
  nickname: nicknameSchema,
});

export const createOnlyThreeRoom: RequestHandler = async (req, res) => {
  const result = createOnlyThreeRoomSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(structureError(result.error));

    return;
  }
  const { userId, nickname } = result.data;

  const room = await createRoom('onlythree', userId, nickname);

  res.json(room);
};
