const projectsRouter = require('express').Router()
const project = require('../models/project')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

projectsRouter.get('/', async (request, response) => {
  const projects = await project.find({})
    .populate('user', { username: 1, name: 1, picture: 1 })
  response.json(projects.map(project => project.toJSON()))

})
projectsRouter.get('/:id', async (request, response, next) => {

  try {
    const project = await project.findById(request.params.id)
    if (project) {
      response.json(project.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }

})

projectsRouter.post('/', async (request, response, next) => {

  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)


    const project = new project({
      title: body.title,
      description: body.description,
      url: body.url,
      user: user
    })

    const savedproject = await project.save()
    user.projects = user.projects.concat(savedproject._id)
    await user.save()
    response.json(savedproject.toJSON())
  } catch (error) {
    next(error)
  }
})

projectsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    const project = await project.findById(request.params.id)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else if (project.user.toString() !== user._id.toString()) {
      return response.status(401).json({ error: 'wrong token' })
    } else if (project.user.toString() === user._id.toString()) {
      await project.deleteOne({ _id: request.params.id })
      response.status(204).end()
    }

  } catch (error) {
    next(error)
  }

})
projectsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
})


module.exports = projectsRouter