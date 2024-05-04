import { Server as HTTPServer } from 'http';
import { Server } from 'socket.io';
import { configureClassicGameSocket } from './classic';
import { configureOnlyThreeGameSocket } from './onlythree';

export const createSocketIoServer = (httpServer: HTTPServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket): void => {
    configureClassicGameSocket(socket);
    configureOnlyThreeGameSocket(socket);
  });

  return io;
};
