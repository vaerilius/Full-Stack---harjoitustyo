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
  test('a user should sign up as succeed', async () => {
    const user = helper.user
    const response = await api
      .post('/api/users/')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.username).toBe('testaaja')
  })

  test('username should be unique', async () => {
    const user = helper.user
    await api
      .post('/api/users/')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    try {
      await api
        .post('/api/users/')
        .send(user)
        .expect(400)
    } catch (error) {
      console.log(error.message);
      expect(error.message).toBe('User validation failed: username: Error, expected `username` to be unique. Value: `testaaja`')
    }




    // expect(response.body.username).toBe('testaaja')

    // const response = api
    //   .post('/api/users/')
    //   .send(user)
    //   .expect(200)


    //   expect(response)

  })




  afterAll(() => {
    mongoose.connection.close()
  })
})
// describe('sign up user', () => {
//   beforeEach(async () => {
//     try {
//       await User.deleteMany({})

//     } catch (error) {
//       console.log(error.message)
//     }


//   })
  // test('users array should be empty ', async () => {
  //   const response = await api.get('/api/users')

  //   expect(response.body.length).toBe(0)

  // })
  // test('a user should sign up as succeed', () => {

  // })
// })

