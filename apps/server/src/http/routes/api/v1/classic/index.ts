import { Router } from 'express';
import { createClassicRoom } from './create';
import { getClassicRoomByCode } from './get';

export const createClassicRouter = () => {
  const router = Router();

  router.get('/:code', getClassicRoomByCode);
  router.post('/', createClassicRoom);

  return router;
};
