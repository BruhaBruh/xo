import { createExpressApp } from '@/http';
import { env } from '@/lib/env';
import { createSocketIoServer } from '@/socketio';
import { createServer as createHTTPServer } from 'http';

export const createServer = () => {
  const app = createExpressApp();
  const httpServer = createHTTPServer(app);
  const io = createSocketIoServer(httpServer);

  httpServer.listen(env.PORT, env.HOST, () => {
    console.info(`> server start listening at http://${env.HOST}:${env.PORT}`);
  });

  return (cb?: () => void) => {
    io.close();
    httpServer.close();
    cb?.();
  };
};
