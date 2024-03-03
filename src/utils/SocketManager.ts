//create a class to manager the socket, add ,ethod to create socket and emit events and close

import { NoSerialize, noSerialize } from '@builder.io/qwik'
import { ClientSocket, EmmitedEventsMap, ListenEventsMap, emit } from '@presentation'
import { io, type Socket } from 'socket.io-client'

type emit = "StartMeeting" | "JoinMeeting" | "StartVoting" | "Vote" | "CloseVoting"

export class SocketManager {
  socket:  NoSerialize<ClientSocket> = undefined;
  constructor() {  }

  emitEvent(event: any, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket!.emit(event, data, (payload: any) => {
        if (!payload.success) {
          reject(payload)
        } else {
          resolve(payload)
        }
      })
    })
  }


  close() {
    this.socket!.close()
  }

  createSocket() {
    const wsClient   = io('http://localhost:3000', {
      transports: ['websocket'],
      protocols: ['websocket'],
    })
    this.socket = noSerialize(wsClient)
  }

  getSocket() {
    return this.socket
  }

  onEvent(event: any, callback: (data: any) => void) {
    this.socket!.on(event, callback)
  }

  offEvent(event: any) {
    this.socket!.off(event)
  }
}
