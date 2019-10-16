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

module.exports = jobsRouter