const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Provider = require('../models/provider')
const Candidate = require('../models/candidate')

const api = supertest(app)

describe('initialize database', () => {
  beforeEach(async () => {
    try {
      await Provider.deleteMany({})
      await Candidate.deleteMany({})
      await api.post('/api/users/providers').send(helper.provider)
    } catch (error) {
      console.log(error.message)
    }
  })

  describe('login tests', () => {
    test('The provider should be able to login', async () => {
      await api.post('/api/users/providers').send(helper.provider)
      const providersAtStart = await helper.providersInDb()
      // console.log(providersAtStart)
      expect(providersAtStart.length).toBe(helper.initialProviders.length + 1)
      const response = await api
        .post('/api/login/')
        .send({ username: 'tester', password: 'secret' })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      // console.log(response.body)

      expect(response.body.username).toBe('tester')
      expect(response.body.jobProvider).toBe(true)
    })
    test('The candidate should be able to login', async () => {
      await api.post('/api/users/candidates').send(helper.candidate)

      const candidatesAtStart = await helper.candidatesInDb()
      // console.log(providersAtStart)
      expect(candidatesAtStart.length).toBe(helper.initialCandidates.length)
      const response = await api
        .post('/api/login/')
        .send({ username: 'candidate', password: 'candidate' })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      // console.log(response.body)

      expect(response.body.username).toBe('candidate')
      expect(response.body.jobProvider).toBe(false)
    })

  })

  describe('Invalid authentication tests', () => {
    test('when login with wrong password or username, should return error message', async () => {

      const response = await api
        .post('/api/login/')
        .send({ username: 'putin', password: 'trump' })
        .expect(401)
        .expect('Content-Type', /application\/json/)
  
      expect(response.body.error).toBe('invalid username or password')
    })
    test('when login with invalid login data, should return error message', async () => {


      const providersAtStart = await helper.providersInDb()
      // console.log(providersAtStart)
      const response = await api
        .post('/api/login/')
        .send({ username: 'tester' })
        .expect(400)
        .expect('Content-Type', /application\/json/)
      // console.log(response.body.error)
      expect(response.body.error).toBe('data and hash arguments required')
    })
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
