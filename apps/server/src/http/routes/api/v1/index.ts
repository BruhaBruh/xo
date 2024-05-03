import { Router } from 'express';
import { createClassicRouter } from './classic';

export const createApiV1Router = () => {
  const router = Router();

  router.use('/classic', createClassicRouter());

  return router;
};
