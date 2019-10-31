const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    // .populate('job',
    //   { title: 1, description: 1, candidates: 1 })

  response.json(users.map(u => u.toJSON()))
})

usersRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (user) {
      res.json(user.toJSON())
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      picture: body.picture,
      jobProvider: body.jobProvider,
      phone: body.phone
      
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter