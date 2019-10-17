const config = require('../utils/config')
const jobsRouter = require('express').Router()
const { tokenExtractor } = require('../utils/middleware')

const Job = require('../models/job')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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
  const token = tokenExtractor(request)

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
      candidates: [],
      company: body.company,
      jobProvider: user
    })

    const savedJob = await job.save()
    user.jobsProvided = user.jobsProvided.concat(savedJob)
    await user.save()
    response.json(savedJob.toJSON())
  } catch (error) {
    next(error)
  }
})

jobsRouter.delete('/:id', async (request, response, next) => {

  try {
    const token = tokenExtractor(request)
    const decodedToken = jwt.verify(token, config.SECRET)
    const user = await User.findById(decodedToken.id)
    const job = await Job.findById(request.params.id)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (job.jobProvider.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'wrong token' })
    }

    user.jobsProvided = user.jobsProvided.map(j => j.toString() !== request.params.id ? j : null)
    user.jobsProvided = user.jobsProvided.filter(j => j !== null)
    await user.save()
    await Job.deleteOne({ _id: request.params.id })

    response.status(204).end()
    
  } catch (error) {
    next(error)
  }

})

module.exports = jobsRouter