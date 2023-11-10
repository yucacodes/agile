await import("reflect-metadata");
const { onStartMeetingHandler } = await import('./presentation/api-events-handlers');


import { createServer } from 'http';
import { Server } from 'socket.io';
import { ApiEmmitedEventsMap, ApiListenEventsMap, ApiServerEventsMap } from './presentation/api-events';

const httpServer = createServer()

const io = new Server<
  ApiListenEventsMap,
  ApiEmmitedEventsMap,
  ApiServerEventsMap
>(httpServer);

io.on('connection', (socket) => {
  socket.on('StartMeeting', onStartMeetingHandler);
})

httpServer.listen(3000)
