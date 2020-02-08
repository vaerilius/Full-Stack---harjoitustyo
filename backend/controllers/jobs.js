const config = require('../utils/config')
const jobsRouter = require('express').Router()
const { tokenExtractor } = require('../utils/middleware')
const io = require('../socket')

const Job = require('../models/job')
const Candidate = require('../models/candidate')
const Provider = require('../models/provider')
const jwt = require('jsonwebtoken')

const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('../utils/aws-config')
const uuidv4 = require('uuid/v4')

let imageName = ''

const upload = multer({
  fileFilter: AWS.fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3: AWS.s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function(req, file, cb) {
      // console.log(file.mimetype.split('/')[1])
      imageName =
        'jobs/' +
        uuidv4() +
        '-' +
        file.originalname
          .toLowerCase()
          .split(' ')
          .join('-')
      cb(null, imageName)
    }
  })
})

jobsRouter.get('/', async (request, response) => {
  const jobs = await Job.find({})
    .populate('jobProvider', { username: 1, name: 1, picture: 1 })
    .populate('candidates', { username: 1, name: 1, picture: 1 })
  response.json(jobs.map(job => job.toJSON()))
})
jobsRouter.get('/:id', async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('jobProvider', { username: 1, name: 1, picture: 1 })
      .populate('candidates', { username: 1, name: 1, picture: 1 })
      .sort({ createdAt: -1 })
    if (job) {
      res.json(job.toJSON())
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

jobsRouter.post(
  '/',
  upload.single('jobImg'),
  async (request, response, next) => {
    // const body = request.body

    try {
      const job = new Job({
        ...request.body,
        picture: `${process.env.AWS_UPLOADED_FILE_URL_LINK}/${imageName}`
      })
      imageName = ''

      const token = tokenExtractor(request)
      const decodedToken = jwt.verify(token, config.SECRET)
      if (!token || !decodedToken) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
      const user = await Provider.findById(decodedToken.id)

      if (!user) {
        response
          .status(401)
          .json({ error: 'Only job provider can add job advertisement' })
      }

      job.jobProvider = user.id
      await job.save()

      user.jobsProvided = [...user.jobsProvided, job]
      await user.save()

      const result = await Job.findById(job.id).populate('jobProvider', {
        username: 1,
        name: 1
      })
      io.getIO().emit('jobs', {
        action: 'CREATE',
        object: result
      })
      response.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }
)

jobsRouter.put('/:id', async (request, response, next) => {
  try {
    const token = tokenExtractor(request)
    const decodedToken = jwt.verify(token, config.SECRET)
    if (!token || !decodedToken) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const job = await Job.findById(request.params.id)
    const provider = await Provider.findById(decodedToken.id)

    const newJob = {
      ...job.toJSON(),
      title: request.body.title,
      description: request.body.description,
      company: request.body.company
    }
    const updatedJob = await Job.findByIdAndUpdate(request.params.id, newJob, {
      new: true
    })
      .populate('jobProvider', { username: 1, name: 1, picture: 1 })
      .populate('candidates', { username: 1, name: 1, picture: 1 })

    provider.jobsProvided.map(j => {
      if (j.id === updatedJob.id) {
        j.title = request.body.title
        j.description = request.body.description
        j.company = request.body.company
      }
    })

    provider.save()

    io.getIO().emit('jobs', {
      action: 'UPDATE_JOB',
      object: updatedJob
    })
    response.json(updatedJob)
  } catch (error) {
    next(error)
  }
})

jobsRouter.delete('/:id', async (request, response, next) => {
  try {
    const token = tokenExtractor(request)
    const decodedToken = jwt.verify(token, config.SECRET)
    const user = await Provider.findById(decodedToken.id)
    const job = await Job.findById(request.params.id)
    // console.log(token)§
    // console.log(job.jobProvider)
    // console.log(job.jobProvider, user.id)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (job.jobProvider.toString() !== user.id) {
      return response.status(401).json({ error: 'wrong token' })
    }

    user.jobsProvided = user.jobsProvided.map(j =>
      j.toString() !== request.params.id ? j : null
    )
    user.jobsProvided = user.jobsProvided.filter(j => j !== null)

    await user.save()
    await Job.deleteOne({ _id: request.params.id })

    io.getIO().emit('jobs', {
      action: 'DELETE',
      object: request.params.id
    })

    response.status(204).json({
      message: 'job removed'
    })
  } catch (error) {
    next(error)
  }
})

jobsRouter.post('/:id/candidates', async (request, response, next) => {
  // const body = request.body

  try {
    const token = tokenExtractor(request)
    const decodedToken = jwt.verify(token, config.SECRET)
    const user = await Candidate.findById(decodedToken.id)
    const job = await Job.findById(request.params.id)
    // console.log(job);
    // console.log(user);

    if (
      user.interestingJobs.includes(job.id) ||
      job.candidates.includes(user.id)
    ) {
      return response.status(400).json({ error: 'allready added' })
    }

    user.interestingJobs = [...user.interestingJobs, job]

    await user.save()
    const updatedJob = await Job.findByIdAndUpdate(
      request.params.id,
      { $push: { candidates: user } },
      { new: true }
    )
      .populate('jobProvider', { username: 1, name: 1, picture: 1 })
      .populate('candidates', { username: 1, name: 1, picture: 1 })

    io.getIO().emit('jobs', {
      action: 'ADD_CANDIDATE',
      object: updatedJob
    })

    response.json(updatedJob.toJSON())
  } catch (error) {
    next(error)
  }
})
jobsRouter.post('/:id/questions', async (request, response, next) => {
  const body = request.body
  try {
    const token = tokenExtractor(request)
    const decodedToken = jwt.verify(token, config.SECRET)

    let user = await Candidate.findById(decodedToken.id)
    if (!user) {
      user = await Provider.findById(decodedToken.id)
    }
    // console.log(user.name)

    const updatedJob = await Job.findByIdAndUpdate(
      request.params.id,
      {
        $push: {
          questions: {
            questioner: {
              name: user.name,
              picture: user.picture,
              id: user.id,
              jobProvider: user.jobProvider
            },
            question: body.question
          }
        }
      },
      { new: true }
    )
      .populate('jobProvider', { username: 1, name: 1, picture: 1 })
      .populate('candidates', { username: 1, name: 1, picture: 1 })

    io.getIO().emit('jobs', {
      action: 'UPDATE_JOB',
      object: updatedJob
    })

    response.json(updatedJob.toJSON())
  } catch (error) {
    next(error)
  }
})

module.exports = jobsRouter
