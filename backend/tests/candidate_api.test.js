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
      // console.log(candidatesAtStart)
      expect(candidatesAtStart.length).toBe(helper.initialCandidates.length)


      // console.log(newCandidate.body)
    })
    test('candidate can be founded', async () => {
      const candidatesAtStart = await helper.candidatesInDb()
      // console.log(candidatesAtStart)
      const candidate = candidatesAtStart[0]
      expect(candidate.name).toBe('Timo Soini')
      expect(candidate.jobProvider).toBe(false)


      //


    })

    test('when get candidate by id should right candidate returned', async () => {
      await api.post('/api/users/candidates').send(helper.candidate)
      const candidatesAtStart = await helper.candidatesInDb()
      // console.log(providersAtStart[1])
      const candidate = await api.get(`/api/users/candidates/${candidatesAtStart[1].id}`)
      expect(candidate.body.username).toBe('candidate')
      // expect(candidate.body.).toMatchObject(candidatesAtStart[1])
      console.log(candidate.body)
      console.log(candidatesAtStart[1])
    })
  })






  afterAll(() => {
    mongoose.connection.close()
  })
})




