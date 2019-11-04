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
      // console.log(token)

      const newJob = await api
        .post('/api/jobs')
        .send(job)
        .set('Authorization', 'Bearer ' + loggeduser.body.token)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      // console.log(newJob.body)
      const jobsAtEnd = await api.get('/api/jobs')

      expect(jobsAtEnd.body.length).toBe(helper.initialJobs.length + 1)

      expect(newJob.body.title).toContain('frondend developer')

      const jobsTitles = jobsAtEnd.body.map(job => job.title)
      expect(jobsTitles).toContain('frondend developer')
    })
  })
  describe('when you delete a job notice', () => {
    test('should job notice be deleted', async () => {
      const loggeduser = await api
        .post('/api/login/')
        .send({ username: 'testaaja', password: 'timo' })
        .expect(200)
        .expect('Content-Type', /application\/json/)
      const job = helper.job

      const newJob = await api
        .post('/api/jobs')
        .send(job)
        .set('Authorization', 'Bearer ' + loggeduser.body.token)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const jobsAtStart = await helper.jobsInDb()
      expect(jobsAtStart.length).toBe(helper.initialJobs.length + 1)


      await api.delete(`/api/jobs/${newJob.body.id}`)
        .set('Authorization', 'Bearer ' + loggeduser.body.token)
        .expect(204)

      const jobsAtEnd = await helper.jobsInDb()

      expect(jobsAtEnd.length).toBe(helper.initialJobs.length)

      const ids = jobsAtEnd.map(j => j.id)

      expect(ids).not.toContain(newJob.id)


    })

    describe('when addition a candidate', () => {
      test('should candidate added to job candidate list', async () => {

        const loggeduser = await api
          .post('/api/login/')
          .send({ username: 'testaaja', password: 'timo' })
          .expect(200)

        const job = await helper.jobsInDb()
        const token = helper.auth
        token.headers.Authorization = `bearer ${loggeduser.body.token}`
        console.log(job[0].id, loggeduser.body.id)

        const response = await api
          .post(`/api/jobs/${job[0].id}/candidates`)
          .send({ candidateID: loggeduser.body.id })
          .set('Authorization', 'Bearer ' + loggeduser.body.token)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const jobsAtEnd = await helper.jobsInDb()
        expect(jobsAtEnd[0].candidates.length).toBe(2)

        const ids = jobsAtEnd[0].candidates.map(j => j.id)

        expect(ids).toContain(loggeduser.body.id)

        const errorResponse = await api
          .post(`/api/jobs/${job[0].id}/candidates`)
          .send({ candidateID: loggeduser.body.id })
          .set('Authorization', 'Bearer ' + loggeduser.body.token)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        // console.log(response.body)
        // console.log(errorResponse.body)

        expect(errorResponse.body.error).toBe('allready added')


      })


    })
  })



  afterAll(() => {
    mongoose.connection.close()
  })
})




