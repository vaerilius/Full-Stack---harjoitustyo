const config = require('../utils/config')
const jobsRouter = require('express').Router()
const { tokenExtractor } = require('../utils/middleware')

const Job = require('../models/job')
const User = require('../models/user')
const Provider = require('../models/provider')
const jwt = require('jsonwebtoken')

jobsRouter.get('/', async (request, response) => {
  const jobs = await Job.find({})
    .populate('provider', { picture: 1, name: 1 })
    .populate('candidate', { picture: 1, name: 1 })
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
    if (!token || !decodedToken) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await Provider.findById(decodedToken.id)
    // const user = await User.deleteMany({})
    // await Job.deleteMany({})

    if (!user.jobProvider) {
      response.status(401).json({ error: 'Only job provider can add job advertisement' })
    }
    console.log(user)
    const job = new Job({
      title: body.title,
      description: body.description,
      company: body.company,
      jobProvider: user._id,
      time: new Date()
    })

    const savedJob = await job.save()

    // const updatedUser = await Provider.findByIdAndUpdate(
    //   user._id,
    //   { $push: { jobsProvided: { job: savedJob } } }, { new: true }
    //   // .populate('jobs', { title: 1 })
    // )
    // console.log(updatedUser)
    user.jobsProvided = [...user.jobsProvided,
      {
        title: savedJob.title,
        id: savedJob.id
      }]
    await user.save()
    const data = {
      job: savedJob.toJSON(),
      user: user.toJSON()
    }
    response.json(data)
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
    // console.log(token)
    // console.log(user)
    // console.log(job.jobProvider.id.toString(), user.id.toString())

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (job.jobProvider.id.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'wrong token' })
    }

    user.jobsProvided = user.jobsProvided.map(j => j.toString() !== request.params.id ? j : null)
    user.jobsProvided = user.jobsProvided.filter(j => j !== null)

    await user.save()
    await Job.deleteOne({ _id: request.params.id })

    response.status(204).json({ message: 'job removed' })

  } catch (error) {
    next(error)
  }
})

jobsRouter.post('/:id/candidates', async (request, response, next) => {
  const body = request.body

  try {
    const user = await User.findById(body.candidateID)
    const job = await Job.findById(request.params.id)
    // console.log(job);
    // console.log(user);
    const candidate = job.candidates.find(k => k.id === body.candidateID)
    // console.log(candidate);
    if (candidate) {

      return response.status(400).json({ error: 'allready added' })
    }
    // console.log(user);
    const userData = {
      id: user.id,
      username: user.username,
      picture: user.picture
    }

    const updatedJob = await Job.findByIdAndUpdate(
      request.params.id,
      { $push: { candidates: userData } }, { new: true }
    )
      .populate('user', { username: 1, picture: 1 })

    user.interestingJobs = [...user.interestingJobs,
    {
      id: updatedJob.id,
      title: updatedJob.title
    }
    ]

    const updatedUser = await user.save()
    // console.log(updatedUser);
    response.json(updatedJob.toJSON())
  } catch (error) {
    next(error)
  }

})

module.exports = jobsRouter