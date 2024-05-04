import { Router } from 'express';
import { createOnlyThreeRoom } from './create';
import { getOnlyThreeRoomByCode } from './get';

export const createOnlyThreeRouter = () => {
  const router = Router();

  router.get('/:code', getOnlyThreeRoomByCode);
  router.post('/', createOnlyThreeRoom);

  return router;
};
