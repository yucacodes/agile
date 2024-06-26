//create a class to manager the socket, add ,ethod to create socket and emit events and close

import { $, NoSerialize, noSerialize, type QRL } from '@builder.io/qwik'
import { ClientSocket, ListenEventsMap } from '@presentation'
import { io } from 'socket.io-client'
import { SocketResult } from '~/framework/presentation'

export const emitEventWithCallback: QRL<
  <T, P>(
    socket: NoSerialize<ClientSocket>,
    event: keyof ListenEventsMap,
    data: T
  ) => Promise<SocketResult<P>>
> = $(
  <T, P>(
    socket: NoSerialize<ClientSocket>,
    event: keyof ListenEventsMap,
    data: T
  ) => {
    return new Promise<SocketResult<P>>((resolve, reject) => {
      socket?.emit(event, data, (payload: SocketResult<P>) => {
        if (!payload.success) {
          reject(payload)
        } else {
          resolve(payload)
        }
      })
    })
  }
)

export const connectSocket: QRL<() => Promise<NoSerialize<ClientSocket>>> = $(
  async function (): Promise<NoSerialize<ClientSocket>> {
    return new Promise((resolve, _) => {
      let socket = noSerialize(
        io(import.meta.env.PUBLIC_API_URL, {
          transports: ['websocket'],
          protocols: ['websocket'],
        })
      )

      void resolve(socket)
    })
  }
)