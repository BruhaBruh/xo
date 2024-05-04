import { Router } from 'express';
import { createClassicRouter } from './classic';
import { createOnlyThreeRouter } from './onlythree';

export const createApiV1Router = () => {
  const router = Router();

  router.use('/classic', createClassicRouter());
  router.use('/onlythree', createOnlyThreeRouter());

  return router;
};
