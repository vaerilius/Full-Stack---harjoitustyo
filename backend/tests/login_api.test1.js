const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('initialize database', () => {
  let user
  beforeEach(async () => {
    try {
      await User.deleteMany({})

      const users = helper.initialUsers.map(u => new User(u))
      const promiseArray = users.map(u => u.save())
      await Promise.all(promiseArray)

      user = helper.user
      await api
        .post('/api/users/')
        .send(user)

    } catch (error) {
      console.log(error.message)
    }
  })


  test('user should be able to login', async () => {

    const response = await api
      .post('/api/login/')
      .send({ username: 'testaaja', password: 'timo' })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.username).toBe('testaaja')
  })
  test('when login with wrong password or username, should return error message', async () => {

    const response = await api
      .post('/api/login/')
      .send({ username: 'putin', password: 'trump' })
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toBe('invalid username or password')
  })
  test('when login with invalid login data, should return error message', async () => {

    const response = await api
      .post('/api/login/')
      .send({ username: 'testaaja' })
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toBe('data and hash arguments required')
  })
  // test('when login without data, should return error message', async () => {

  //   const response = await api
  //     .post('/api/login/')
  //     .send(null)
  //     .expect(400)
  //     .expect('Content-Type', /application\/json/)

  //   expect(response.body.error).toBe('invalid input data')
  // })




  afterAll(() => {
    mongoose.connection.close()
  })
})
