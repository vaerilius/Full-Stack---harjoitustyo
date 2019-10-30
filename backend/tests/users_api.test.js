const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('initialize database', () => {

  beforeEach(async () => {
    try {
      await User.deleteMany({})

      const users = helper.initialUsers.map(u => new User(u))
      const promiseArray = users.map(u => u.save())
      await Promise.all(promiseArray)
      
    } catch (error) {
      console.log(error.message)
    }
  })
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('users array length is currect', async () => {
    const response = await api.get('/api/users')
    expect(response.body.length).toBe(helper.initialUsers.length)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})

