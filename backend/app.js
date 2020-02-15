const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const jobsRouter = require('./controllers/jobs')

const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    logger.info('connected to MongoDB')
    const server = app.listen(config.PORT || 3001, () => {
      console.log(`Server running on port ${config.PORT}`)
    })

    const io = require('./socket').init(server)
    const onlineUsers = []
    io.on('connection', socket => {
      // socket.broadcast.emit('userConnected', socket.id)
      // socket.join('jobBook')
      // io.in('jobBook').clients((error, clients) => {
      //   if (error) throw error
      //   console.log(clients, socket.id) // => [Anw2LatarvGVVXEIAAAD]
      // })
      socket.on('join', user => {
        socket.join('jobBook', () => {
          // let rooms = Object.keys(socket.rooms)
          const isOnline = onlineUsers.find(u => u.id == user.id)
          if (!isOnline) {
            onlineUsers.push(user)
          }
          console.log(onlineUsers)

          // console.log(rooms, 'user rooms') // [ <socket.id>, 'room 237' ]
          io.to('jobBook').emit('init', [...onlineUsers])
        })
      })

      // socket.on('jobBookUsers', () => {
      //   console.log('data')

      // })

      socket.on('leave', id => {
        onlineUsers.filter(u => u.id !== id)
        io.to('jobBook').emit('init', [...onlineUsers])
      })

      socket.on('disconnect', () => {
        // onlineUsers.f
      })
    })
  })
  .catch(error => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
// app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use('/api/jobs', jobsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
