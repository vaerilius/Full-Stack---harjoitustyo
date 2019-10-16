<<<<<<< HEAD
const jobsRouter = require('express').Router()
const Job = require('../models/job')
const User = require('../models/user')

jobsRouter.get('/', async (request, response, next) => {
  const jobs = await Job.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('candidates', { username: 1, name: 1 })

  response.json(jobs.map(job => job.toJSON()))
})
jobsRouter.post('/', async (request, response, next) => {

  const body = request.body

  try {
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)

    // if (!request.token || !decodedToken.id) {
    //   response.status(401).json({ error: 'token missing or invalid' })
    // }

    const user = await User.find({ name: 'aaaa' })
    console.log(user)

    // const job = new job({
    //   title: body.title,
    //   description: body.description,
    //   company: body.company,
    //   user: user
    // })

    // const savedJob = await job.save()

    // user.jobs = user.jobs.concat(savedJob._id)
    // await user.save()
    // response.json(savedjob.toJSON())
  } catch (error) {
    next(error)
  }
})

=======
const config = require('../utils/config')
const jobsRouter = require('express').Router()
const { tokenExtractor } = require('../utils/middleware')


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

jobsRouter.delete('/:id', async (request, response, next) => {

  try {
    const token = getTokenFrom(request)
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


>>>>>>> a358456164f73b1a39b60495ac85109211932a56
module.exports = jobsRouter