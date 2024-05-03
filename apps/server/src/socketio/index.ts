import { Server as HTTPServer } from 'http';
import { Server } from 'socket.io';
import { configureClassicGameSocket } from './classic';

export const createSocketIoServer = (httpServer: HTTPServer) => {
  const io = new Server(httpServer, {});

  io.on('connection', (socket) => {
    configureClassicGameSocket(socket);
  });

  return io;
};
