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

      // const providers = helper.initialProviders.map(p => new Provider(p))
      // console.log(providers)
      await api.post('/api/users/providers').send(helper.initialProviders[0])
      await api.post('/api/users/providers').send(helper.initialProviders[1])
      // await Promise.all(promiseArray)


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
      expect(provider.jobsProvided.length).toBe(0)
      // expect(provider.jobProvider).toBe(true)
    })
    test('when get provider by id should right provider returned', async () => {
      await api.post('/api/users/providers').send(helper.provider)
      const providersAtStart = await helper.providersInDb()
      // console.log(providersAtStart[1])
      const provider = await api.get(`/api/users/providers/${providersAtStart[1].id}`)
      expect(provider.body.username).toBe('timo')
    })
  })
  describe('provider tests', () => {
    test('when sign up as provider should new provider be found', async () => {
      const providersAtStart = await helper.providersInDb()
      expect(providersAtStart.length).toBe(helper.initialProviders.length)

      const newProvider = await api.post('/api/users/providers').send(helper.provider)
      // console.log(newProvider.body.id)
      const providersAtEnd = await helper.providersInDb()

      expect(providersAtEnd.length).toBe(helper.initialProviders.length + 1)

      const providersIDs = providersAtEnd.map(p => p.id)

      // console.log(providersIDs)
      expect(providersIDs[providersAtEnd.length -1]).toBe(newProvider.body.id)
    })
    test('when sign up as not unique username should throw an error', async () => {
      const provider = {
        username: 'provider',
        password: 'joo0',
        name: 'joo0',
        checkbox: true
      }

      const data = await api.post('/api/users/providers')
        .send(provider)
        .expect(400)
      // console.log(data.text)
      expect(data.text).toContain('expected `username` to be unique.')


    })
    test('when sign up as too short username should throw an error', async () => {
      const provider = {
        username: 'sho',
        password: 'joo0',
        name: 'joo0',
        checkbox: true
      }
      const data = await api.post('/api/users/providers')
        .send(provider)
        .expect(400)
      expect(data.text).toContain('Path `username` (`sho`) is shorter than the minimum allowed length (4).')

    })
    test('when sign up without username should throw an error', async () => {
      const provider = {
        password: 'joo0',
        name: 'joo0',
        checkbox: true
      }
      const data = await api.post('/api/users/providers')
        .send(provider)
        .expect(400)
      expect(data.text).toContain('Provider validation failed: username: Path `username` is required.')

    })
    test('when sign up without password should throw an error', async () => {
      const provider = {
        username: 'valid',
        name: 'joo0',
        checkbox: true
      }
      const data = await api.post('/api/users/providers')
        .send(provider)
        .expect(401)
      // console.log(data.body)
      expect(data.text).toContain('invalid signup data')

    })
    test('when sign up to invalid url should throw an errors', async () => {

      const data = await api.post('/api/users/')
        .expect(404)
      // console.log(data.text)
      expect(data.text).toContain('unknown endpoint')

    })
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})




