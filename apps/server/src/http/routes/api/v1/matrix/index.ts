import { Router } from 'express';
import { createMatrixRoom } from './create';
import { getMatrixRoomByCode } from './get';

export const createMatrixRouter = () => {
  const router = Router();

  router.get('/:code', getMatrixRoomByCode);
  router.post('/', createMatrixRoom);

  return router;
};
