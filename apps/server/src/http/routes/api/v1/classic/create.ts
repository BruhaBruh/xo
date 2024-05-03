import { createRoom } from '@/lib/room';
import { nicknameSchema, userIdSchema } from '@/lib/validation';
import { structureError } from '@/lib/zod';
import { RequestHandler } from 'express';
import { z } from 'zod';

const createClassicRoomSchema = z.object({
  userId: userIdSchema,
  nickname: nicknameSchema,
});

export const createClassicRoom: RequestHandler = async (req, res) => {
  const result = createClassicRoomSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(structureError(result.error));

    return;
  }
  const { userId, nickname } = result.data;

  const room = await createRoom('classic', userId, nickname);

  res.json(room);
};
