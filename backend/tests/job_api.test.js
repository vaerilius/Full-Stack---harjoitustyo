const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Job = require('../models/job')
const Provider = require('../models/provider')
const Candidate = require('../models/candidate')

const api = supertest(app)
// let provider
// let candidate

describe('initialize database', () => {
  beforeEach(async () => {
    try {
      await Job.deleteMany({})
      await Provider.deleteMany({})
      await Candidate.deleteMany({})

      const jobs = helper.initialJobs.map(job => new Job(job))
      let promiseArray = jobs.map(j => j.save())
      await Promise.all(promiseArray)


      const providers = helper.initialProviders.map(p => new Provider(p))
      promiseArray = providers.map(u => u.save())
      await Promise.all(promiseArray)


      const provider = helper.provider
      await api.post('/api/users/providers').send(provider)

      const candidates = helper.initialCandidates.map(c => new Candidate(c))
      promiseArray = candidates.map(c => c.save())
      await Promise.all(promiseArray)



    } catch (error) {
      console.log(error.message)

    }
  })


  describe('test jobs database ', () => {
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


  describe('Test: when addition a job ad', () => {
    test('only authorized user can add ad', async () => {
      const jobsAtStart = await helper.jobsInDb()
      expect(jobsAtStart.length).toBe(helper.initialJobs.length)
      await api.post('/api/jobs/')
        .expect(401)
    })
    test('when create a new job ad', async () => {
      const jobsAtStart = await helper.jobsInDb()
      expect(jobsAtStart.length).toBe(helper.initialJobs.length)


      // const providersAtEnd = await helper.providersInDb()
      // console.log(providersAtEnd)
      const loggeduser = await api
        .post('/api/login/')
        .send({ username: 'tester', password: 'secret' })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const newJob = await api
        .post('/api/jobs')
        .send(helper.job)
        .set('Authorization', 'Bearer ' + loggeduser.body.token)
        .expect(201)

      expect(newJob.body.jobProvider.id).toBe(loggeduser.body.id)
      expect(newJob.body.title).toBe(helper.job.title)

      const jobsAtEnd = await helper.jobsInDb()
      expect(jobsAtEnd[2].jobProvider.toString()).toBe(loggeduser.body.id)
      const updatedProvider = await helper.providerById(loggeduser.body.id)

      expect(updatedProvider.jobsProvided[0].toString()).toBe(newJob.body.id)
    })
  })

  describe('test: when you delete a job notice', () => {
    test('only authorized user can delete ad', async () => {
      const jobsAtStart = await helper.jobsInDb()

      await api.delete(`/api/jobs/${jobsAtStart[0].id}`)
        .expect(401)
    })

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
      let updatedProvider = await helper.providerById(loggeduser.body.id)
      expect(updatedProvider.jobsProvided[0].toString()).toBe(newJob.body.id)

      await api.delete(`/api/jobs/${newJob.body.id}`)
        .set('Authorization', 'Bearer ' + loggeduser.body.token)
        .expect(204)

      const jobsAtEnd = await helper.jobsInDb()
      updatedProvider = await helper.providerById(loggeduser.body.id)

      expect(jobsAtEnd.length).toBe(helper.initialJobs.length)

      const ids = jobsAtEnd.map(j => j.id)

      expect(ids).not.toContain(newJob.id)

      expect(updatedProvider.jobsProvided).not.toContain(newJob.body.id)

    })
  })
  describe('test candidate functions', () => {
    test('when candidate joins jobs candidate list should candidate be founded', async () => {
      const jobsAtStart = await helper.jobsInDb()
      // console.log(jobsAtStart)
      const candidate = await api.post('/api/users/candidates').send(helper.candidate)

      const loggeduser = await api
        .post('/api/login/')
        .send({ username: 'candidate', password: 'candidate' })
        .expect(200)
        .expect('Content-Type', /application\/json/)
      // console.log(loggeduser.body)

      const updatedJobAd = await api
        .post(`/api/jobs/${jobsAtStart[0].id}/candidates/`)
        .set('Authorization', 'Bearer ' + loggeduser.body.token)
        .expect(200)
      // console.log(updatedJobAd.body)
      const candidates = updatedJobAd.body.candidates.map(c => c)
      // console.log(candidates)
      expect(candidates[0].id).toBe(loggeduser.body.id)

      const updatedCandidate = await helper.candidateById(loggeduser.body.id)
      expect(updatedCandidate.interestingJobs[0].toString()).toBe(updatedJobAd.body.id)
    })
    test('when the candidate is already joined to job ad candidate list should return error message', async () => {
      const jobsAtStart = await helper.jobsInDb()
      // console.log(jobsAtStart)
      const candidate = await api.post('/api/users/candidates').send(helper.candidate)

      const loggeduser = await api
        .post('/api/login/')
        .send({ username: 'candidate', password: 'candidate' })
        .expect(200)
        .expect('Content-Type', /application\/json/)
      // console.log(loggeduser.body)

      const updatedJobAd = await api
        .post(`/api/jobs/${jobsAtStart[0].id}/candidates/`)
        .set('Authorization', 'Bearer ' + loggeduser.body.token)
        .expect(200)
      // console.log(updatedJobAd.body)
      const candidates = updatedJobAd.body.candidates.map(c => c)
      // console.log(candidates)
      expect(candidates[0].id).toBe(loggeduser.body.id)
      const response = await api
        .post(`/api/jobs/${jobsAtStart[0].id}/candidates/`)
        .set('Authorization', 'Bearer ' + loggeduser.body.token)
        .expect(400)

      expect(response.body.error).toBe('allready added')
      console.log(response.body.error)
    })

  })

  afterAll(() => {
    mongoose.connection.close()
  })
})




