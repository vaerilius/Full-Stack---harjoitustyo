const config = require('../utils/config')
const jobsRouter = require('express').Router()

const Job = require('../models/job')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


jobsRouter.get('/', async (request, response) => {
  const jobs = await Job.find({})
    .populate('user', { picture: 1, name: 1, status: 1, jobsProvided: 1 })
  response.json(jobs.map(job => job.toJSON()))

})
jobsRouter.get('/:id', async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
    if (job) {
      res.json(job.toJSON())
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

jobsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)

  try {
    const decodedToken = jwt.verify(token, config.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!user.jobProvider) {
      response.status(401).json({ error: 'Only job provider can add job advertisement' })
    }

    const job = new Job({
      title: body.title,
      description: body.description,
      canditates: [],
      company: body.company,
      jobProvider: user.id
    })

    const savedJob = await job.save()
    user.jobsProvided = user.jobsProvided.concat(savedJob)
    await user.save()
    response.json(savedJob.toJSON())
  } catch (error) {
    next(error)
  }
})


module.exports = jobsRouter