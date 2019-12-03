const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Job = require('../models/job')
const Provider = require('../models/provider')

const api = supertest(app)
let provider

describe('initialize database', () => {
  beforeEach(async () => {
    try {
      await Job.deleteMany({})
      await Provider.deleteMany({})

      const jobs = helper.initialJobs.map(job => new Job(job))
      let promiseArray = jobs.map(j => j.save())
      await Promise.all(promiseArray)

      const providers = helper.initialProviders.map(p => new Provider(p))
      promiseArray = providers.map(u => u.save())
      await Promise.all(promiseArray)

      const response = await helper.providersInDb()
      // expect(response.length).toBe(helper.initialProviders.length)

      provider = helper.provider
      const te = await api
        .post('/api/users/providers')
        .send(provider)

      // console.log(te.body)
    } catch (error) {
      console.log(error.message)

    }
  })


  describe('test database jobs', () => {
    test('jobs are returned as json', async () => {
      await api
        .get('/api/jobs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('jobs array length is currect', async () => {
      const response = await helper.jobsInDb()
      expect(response.length).toBe(helper.initialJobs.length)
    })
    test('jobs titles is are returned properly ', async () => {
      const jobs = await helper.jobsInDb()
      // console.log(jobs)

      expect(jobs[1].jobProvider.toString()).toBe('5de5f549715d9615d47536e5')

      const titles = jobs.map(j => j.title)
      // console.log(titles)
      expect(titles[0]).toBe('Fullstack Developer')
    })
    test('1 job candidates are empty array ', async () => {
      const jobs = await helper.jobsInDb()

      const candidates = jobs[0].candidates.map(c => c.toJSON())
      expect(candidates.length).toBe(0)
    })


  })

  describe('when you delete a job notice', () => {
    test('should job notice be deleted', async () => {

      const jobsAtStart = await helper.jobsInDb()
      expect(jobsAtStart.length).toBe(helper.initialJobs.length)

      const loggeduser = await api
        .post('/api/login/')
        .send({ username: 'tester', password: 'secret' })
        .expect(200)
        .expect('Content-Type', /application\/json/)
      const job = helper.job

      const newJob = await api
        .post('/api/jobs')
        .send(job)
        .set('Authorization', 'Bearer ' + loggeduser.body.token)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const jobsAtNow = await helper.jobsInDb()
      expect(jobsAtNow.length).toBe(helper.initialJobs.length + 1)

      await api.delete(`/api/jobs/${newJob.body.id}`)
        .set('Authorization', 'Bearer ' + loggeduser.body.token)
        .expect(204)

      const jobsAtEnd = await helper.jobsInDb()

      expect(jobsAtEnd.length).toBe(helper.initialJobs.length)

      const ids = jobsAtEnd.map(j => j.id)

      expect(ids).not.toContain(newJob.id)


    })
  })


  afterAll(() => {
    mongoose.connection.close()
  })
})




