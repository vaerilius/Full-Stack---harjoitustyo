/* eslint-disable no-undef */
let io

export default {
  init: client => {
    io = require('socket.io-client')(client)
    return io
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!')
    }
    return io
  }
}
