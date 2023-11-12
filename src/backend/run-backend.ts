await import("reflect-metadata");
const { onStartMeetingHandler } = await import('@presentation');


import { createServer } from 'http';
import { Server } from 'socket.io';
import type { ApiEmmitedEventsMap, ApiListenEventsMap, ApiServerEventsMap } from '@presentation';

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
