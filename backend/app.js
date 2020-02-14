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

    io.on('connection', socket => {
      socket.on('join', user => {
        socket.user = user
        socket.join('jobBook')
        // console.log(io.sockets.in('jobBook').sockets)

        socket.broadcast.to('jobBook').emit('userConnected', socket.user)
      })
      socket.on('leave', () => {
        socket.broadcast.to('jobBook').emit('userdisconnect', socket.user.id)
        socket.leave('jobBook')
      })

      socket.on('getUsers', () => {
        io.in('jobBook').clients((error, clients) => {
          if (error) throw error
          console.log(clients) // => [Anw2LatarvGVVXEIAAAD]
          io.emit('onlineusers', clients)
        })
      })
      socket.on('disconnect', () => console.log('user disconnect'))
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
