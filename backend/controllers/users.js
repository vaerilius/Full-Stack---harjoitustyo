const config = require('../utils/config')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('../utils/aws-config')
const uuidv4 = require('uuid/v4')
const jwt = require('jsonwebtoken')
const { tokenExtractor } = require('../utils/middleware')


const Provider = require('../models/provider')
const Candidate = require('../models/candidate')

let imageName = ''

const upload = multer({
  fileFilter: AWS.fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3: AWS.s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      console.log(file.mimetype.split('/')[1])
      imageName = 'users/' + uuidv4() + '-' + file.originalname.toLowerCase().split(' ').join('-');
      cb(null, imageName)
    }
  })
})

usersRouter.get('/providers', async (request, response, next) => {

  try {
    const providers = await Provider.find({})

      .populate('jobsProvided', { title: 1, description: 1, company: 1 })
    // .populate('candidates', { username: 1, name: 1, picture: 1, })
    // ei toimi, korjaa tämä
    response.json(providers.map(p => p.toJSON()))
  } catch (error) {
    next(error)
  }

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

usersRouter.put('/providers/:id', async (req, res, next) => {
  try {
    const token = tokenExtractor(req)
    const decodedToken = jwt.verify(token, config.SECRET)
    const user = await Provider.findById(decodedToken.id)

    user.phone = req.body.phone
    user.email = req.body.email
    user.description = req.body.description

    const updatedUser = await Provider.findByIdAndUpdate(req.params.id, user, { new: true })
      .populate('jobsProvided', { title: 1, description: 1, company: 1 })

    res.json(updatedUser.toJSON())
  } catch (error) {
    next(error)
  }
})
usersRouter.put('/candidates/:id', async (req, res, next) => {
  try {
    const token = tokenExtractor(req)
    const decodedToken = jwt.verify(token, config.SECRET)
    const user = await Candidate.findById(decodedToken.id)
    user.phone = req.body.phone
    user.email = req.body.email
    user.description = req.body.description

    const updatedUser = await Candidate.findByIdAndUpdate(req.params.id, user, { new: true })
      .populate('interestingJobs',
        { title: 1, description: 1, company: 1 })

    res.json(updatedUser.toJSON())
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/candidates', async (request, response, next) => {

  try {
    const users = await Candidate
      .find({})
      .populate('interestingJobs',
        { title: 1, description: 1, company: 1 })

    response.json(users.map(u => u.toJSON()))
  } catch (error) {
    next(error)
  }

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



usersRouter.post('/providers', upload.single('profileImg'), async (request, response, next) => {

  try {
    const body = request.body
    if (!body.password) {
      return response.status(401).json({ error: 'invalid signup data' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new Provider({
      username: body.username,
      name: body.name,
      passwordHash,
      picture: `${process.env.AWS_UPLOADED_FILE_URL_LINK}/${imageName}`,
      jobProvider: body.checkbox,
      phone: null,
      email: null,
      content: null
    })
    imageName = ''

    const savedUser = await user.save()
    // console.log(savedUser)
    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})
usersRouter.post('/candidates', upload.single('profileImg'), async (request, response, next) => {
  try {
    const body = request.body
    // console.log(body)

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    let user

    if (!body.jobProvider) {
      user = new Candidate({
        username: body.username,
        name: body.name,
        passwordHash,
        picture: `${process.env.AWS_UPLOADED_FILE_URL_LINK}/${imageName}`,
        jobProvider: body.checkbox,
        phone: null,
        email: null,
        status: null

      })
    }

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter