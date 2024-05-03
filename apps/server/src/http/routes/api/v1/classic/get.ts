import { getRoom } from '@/lib/room';
import { metadataSchema, structureError } from '@xo/games';
import { RequestHandler } from 'express';

export const getClassicRoomByCode: RequestHandler<{
  code: string;
}> = async (req, res) => {
  const { code } = req.params;
  const { userId, nickname } = req.query;

  const result = metadataSchema.safeParse({
    code,
    userId,
    nickname,
  });

  if (!result.success) {
    res.status(400).json(structureError(result.error));

    return;
  }
  const metadata = result.data;

  const room = await getRoom('classic', metadata.code);

  if (room === null) {
    res.status(404).json({ message: 'room not found' });

    return;
  }

  res.json(room);
};
