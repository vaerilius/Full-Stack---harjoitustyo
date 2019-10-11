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
  response.json(jobs.map(job => job.toJSON()))

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
    
    const job = new Job({
        title: body.title,
        description: body.description,
        canditates: [],
        company: body.company,
        jobProvider: body.jobProvider
    })
    const savedJob = await job.save()
    user.jobsProvided.concat(savedJob._id)
    response.json(savedJob.toJSON())
  } catch (error) {
    next(error)
  }
})


module.exports = jobsRouter