import { createApiV1Router } from '@/http/routes/api/v1';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

export const createExpressApp = () => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
  app.use('/api/v1', createApiV1Router());

  return app;
};
