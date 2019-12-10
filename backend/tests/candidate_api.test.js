const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Candidate = require('../models/candidate')

const api = supertest(app)

describe('initialize provider database', () => {
  beforeEach(async () => {
    try {
      await Candidate.deleteMany({})

      const candidates = helper.initialCandidates.map(c => new Candidate(c))
      const promiseArray = candidates.map(c => c.save())
      await Promise.all(promiseArray)


    } catch (error) {
      console.log(error.message)
    }
  })

  describe('test candidates', () => {
    test('candiates are returned as json', async () => {
      await api
        .get('/api/users/candidates')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('candidates array length is currect', async () => {
      const candidatesAtStart = await helper.candidatesInDb()
      expect(candidatesAtStart.length).toBe(helper.initialCandidates.length)


    })
    test('Array of candidates can be founded', async () => {
      const candidatesAtStart = await helper.candidatesInDb()
      const candidate = candidatesAtStart[0]
      expect(candidatesAtStart.length).toBe(2)
      expect(candidate.jobProvider).toBe(false)
    })

    test('when get candidate by id should right candidate returned', async () => {
      const candidatesAtStart = await helper.candidatesInDb()
      const candidate = await api.get(`/api/users/candidates/${candidatesAtStart[1].id}`)
      expect(candidate.body.username).toBe(candidatesAtStart[1].username)

    })

    describe('The candiate Sign up tests', () => {
      test('When sign up as candidate should the candidate found from arraylist', async () => {
        const candidatesAtStart = await helper.candidatesInDb()
        expect(candidatesAtStart.length).toBe(2)

        const newCandidate = await api.post('/api/users/candidates').send(helper.candidate)
        expect(newCandidate.body).toBeDefined()

        const candidatesAtEnd = await helper.candidatesInDb()

        expect(candidatesAtEnd.length).toBe(3)
        expect(newCandidate.body.username).toBe(candidatesAtEnd[2].username)

      })
      test('When sign up with valid data should response include right data', async () => {
        const candidate = helper.candidate
        const newCandidate = await api.post('/api/users/candidates').send(candidate)

        expect(newCandidate.body).toBeDefined()
        expect(candidate.username).toBe(newCandidate.body.username)
        expect(candidate.name).toBe(newCandidate.body.name)
        expect(candidate.checkbox).toBe(newCandidate.body.jobProvider)
      })
      test('when sign up with invalid input data should return error message', async () => {
        const invalidCandidate = {
          username: 'valid',
          password: 'valid',
          name: 'valid',
          checkbox: true //invalid
        }
        const response = await api.post('/api/users/candidates')
          .send(invalidCandidate)
          .expect(400)

        expect(response.body.error).toBe('Only candidate can signup here')
      })
      test('when sign up without username should return error message', async () => {
        const invalidCandidate = {
          password: 'valid',
          name: 'valid',
          checkbox: false //invalid
        }
        const response = await api.post('/api/users/candidates')
          .send(invalidCandidate)
          .expect(400)

        expect(response.body.error).toBe('Candidate validation failed: username: Path `username` is required.')
      })
      test('when sign up with too short username should return error message', async () => {
        const invalidCandidate = {
          username: 'va',
          password: 'valid',
          name: 'valid',
          checkbox: false //invalid
        }
        const response = await api.post('/api/users/candidates')
          .send(invalidCandidate)
          .expect(400)

        expect(response.body.error)
          .toMatch('is shorter than the minimum allowed length (4).')
      })
      test('when sign up without password should return error message', async () => {
        const invalidCandidate = {
          username: 'valid',
          name: 'valid',
          checkbox: false
        }
        const response = await api.post('/api/users/candidates')
          .send(invalidCandidate)
          .expect(400)

        expect(response.body.error)
          .toBe('data and salt arguments required')
      })
      test('when sign up with too short password should return error message', async () => {
        const invalidCandidate = {
          username: 'valid',
          name: 'valid',
          password: 'va', //invalid
          checkbox: false 
        }
        const response = await api.post('/api/users/candidates')
          .send(invalidCandidate)
          .expect(400)

        expect(response.body.error)
          .toBe('password too short, min length is 4')
      })
      test('when sign up without tagged checkBox should return error message', async () => {
        const invalidCandidate = {
          username: 'valid',
          name: 'valid',
          password: 'valid'

        }
        const response = await api.post('/api/users/candidates')
          .send(invalidCandidate)
          .expect(400)

        expect(response.body.error)
          .toBe('checkBox must be tagged')
      })
      test('when sign up to invalid url should throw an errors', async () => {

        const data = await api.post('/api/users/')
          .expect(404)
        // console.log(data.text)
        expect(data.text).toContain('unknown endpoint')
  
      })
    })

  })






  afterAll(() => {
    mongoose.connection.close()
  })
})




