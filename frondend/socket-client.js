let io

module.exports = {
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
