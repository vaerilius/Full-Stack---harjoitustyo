const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Provider = require('../models/provider')

const api = supertest(app)

describe('initialize provider database', () => {
  beforeEach(async () => {
    try {
      await Provider.deleteMany({})

      const providers = helper.initialProviders.map(p => new Provider(p))
      const promiseArray = providers.map(u => u.save())
      await Promise.all(promiseArray)


    } catch (error) {
      console.log(error.message)

    }
  })

  describe('test providers database', () => {
    test('providers are returned as json', async () => {
      await api
        .get('/api/users/providers')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('providers array length is currect', async () => {
      const providers = await helper.providersInDb()
      // console.log(providers)
      expect(providers.length).toBe(helper.initialProviders.length)
    })
    test('provider can be found and is currect', async () => {
      const providers = await helper.providersInDb()
      // console.log(providers)
      const provider = providers[0]
      // console.log(provider)
      expect(provider.name).toBe('provider')
      expect(provider.jobsProvided.length).toBe(2)
      expect(provider.jobProvider).toBe(true)
    })
  })
  describe('provider tests', () => {
    test('when sign up as provider should new provider be found', async () => {
      const providersAtStart = await helper.providersInDb()
      expect(providersAtStart.length).toBe(helper.initialProviders.length)

      const newProvider = await api.post('/api/users/providers').send(helper.provider)
      // console.log(newProvider.body.id)
      const providersAtEnd = await helper.providersInDb()
      expect(providersAtEnd.length).toBe(providersAtStart.length + 1)

      const providersIDs = await providersAtEnd.map(p => p.id)

      // console.log(providersIDs)
      expect(providersIDs[1]).toBe(newProvider.body.id)
    })
    test('when sign up as not unique username should throw an error', async () => {
      const provider = {
        username: 'provider',
        password: 'joo',
        name: 'joo',
        checkbox: true
      }
      // console.log(notUniqueProvider)
      try {
        await api.post('/api/users/providers')
          .send(provider)
          .expect(400)
      } catch (error) {
        console.log(error)
        // expect(error.message).toBe('Provider validation failed: username: Error, expected `username` to be unique.')
      }







    })


  })







  afterAll(() => {
    mongoose.connection.close()
  })
})




