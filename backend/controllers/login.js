
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
// const User = require('../models/user')
const Provider = require('../models/provider')
const Candidate = require('../models/candidate')

loginRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    let user

    user = await Provider.findOne({ username: body.username })
    if (!user) {
      user = await Candidate.findOne({ username: body.username })
    }

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    response
      .status(200)
      .send({
        token,
        username: user.username,
        name: user.name,
        picture: user.picture,
        id: user._id,
        jobProvider: user.jobProvider,
      })
  } catch (error) {
    next(error)
  }


})

module.exports = loginRouter
