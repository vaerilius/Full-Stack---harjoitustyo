const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const Provider = require('../models/provider')
const Candidate = require('../models/candidate')

usersRouter.get('/providers', async (request, response) => {
  const providers = await Provider.find({})

    .populate('jobsProvided',{ title: 1, description: 1, company: 1 })
    // .populate('candidates', { username: 1, name: 1, picture: 1, })
    // ei toimi, korjaa tämä
  response.json(providers.map(p => p.toJSON()))
})
usersRouter.get('/providers/:id', async (req, res, next) => {
  try {
    const user = await Provider.findById(req.params.id)
      .populate('jobsProvided',
        { title: 1, description: 1, company: 1 })
    if (user) {
      res.json(user.toJSON())
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})
usersRouter.get('/candidates', async (request, response) => {
  const users = await Candidate
    .find({})
    .populate('interestingJobs',
      { title: 1, description: 1, company: 1 })

  response.json(users.map(u => u.toJSON()))
})
usersRouter.get('/candidates/:id', async (req, res, next) => {
  try {
    const user = await Candidate.findById(req.params.id)
      .populate('interestingJobs',
        { title: 1, description: 1, company: 1 })

    if (user) {
      res.json(user.toJSON())
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})



usersRouter.post('/provider', async (request, response, next) => {
  try {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    let user

    if (body.jobProvider) {
      user = new Provider({
        username: body.username,
        name: body.name,
        passwordHash,
        picture: body.picture,
        jobProvider: body.jobProvider,
        phone: body.phone,
        email: body.email

      })
    }

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})
usersRouter.post('/candidate', async (request, response, next) => {
  try {
    const body = request.body
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    let user

    if (!body.jobProvider) {
      user = new Candidate({
        username: body.username,
        name: body.name,
        passwordHash,
        picture: body.picture,
        jobProvider: body.jobProvider,
        phone: body.phone,
        email: body.email

      })
    }

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter