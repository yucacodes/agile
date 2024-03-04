//create a class to manager the socket, add ,ethod to create socket and emit events and close

import { ClientSocket } from '@presentation'
import { io } from 'socket.io-client'

export class SocketManager {
  socket?: ClientSocket
  constructor() {}

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

  async createSocket(): Promise<void> {
    return new Promise((resolve, _) => {
      this.socket = io('http://localhost:3000', {
        transports: ['websocket'],
        protocols: ['websocket'],
      })
      this.socket.on('connect', () => resolve())
    })
  }


  getSocket() {
    return this.socket
  }

  onEvent(event: any, callback: (data: any) => void): void {
    if (this.socket) {
      this.socket!.on(event, callback)
    } else {
      throw new Error('Socket is undefined')
    }
  }

  offEvent(event: any) {
    this.socket!.off(event)
  }
}
