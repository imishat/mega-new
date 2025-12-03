/* eslint-disable @typescript-eslint/no-explicit-any */

import io from 'socket.io-client'
import { socketUrl } from '../config/constants'

const socket = io(socketUrl)


export default function useSocket() {

  return {
    socket,
    socketId: socket.id,
    sendToServer: function (key: string, roomId:string='',data: any) {
      socket.emit(key,roomId, data)
    },
    receive: function (key: string, f: any) {
      socket.on(key, f)
    },
    joinRoom: function (roomName: any) {
        socket.emit('joinRoom', roomName);
      },
  }
}