const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Job = require('../models/job')

const api = supertest(app)

describe('initialize database', () => {
  beforeEach(async () => {
    try {
      await Job.deleteMany({})

      const jobs = helper.initialJobs.map(job => new Job(job))
      const promiseArray = jobs.map(j => j.save())
      await Promise.all(promiseArray)

    } catch (error) {
      console.log(error.message)

    }
  })
  test('jobs are returned as json', async () => {
    await api
      .get('/api/jobs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('jobs array length is currect', async () => {
    const response = await api.get('/api/jobs')
    expect(response.body.length).toBe(helper.initialJobs.length)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})

describe('Name of the group', () => {
  
});



