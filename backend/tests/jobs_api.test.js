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

  describe('when addition job', () => {
    test('when create new job, the job should be on list ', async () => {

      const loggeduser = await api
        .post('/api/login/')
        .send({ username: 'testaaja', password: 'timo' })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const job = helper.job
      const token = helper.auth
      token.headers.Authorization = `bearer ${loggeduser.body.token}`
      console.log(token)

      const newJob = await api
        .post('/api/jobs')
        .send(job)
        .set('Authorization', 'Bearer ' + loggeduser.body.token)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      console.log(newJob.body)
      const response = await api.get('/api/jobs')
      expect(response.body.length).toBe(helper.initialJobs.length + 1)
    })
  })


  afterAll(() => {
    mongoose.connection.close()
  })
})




