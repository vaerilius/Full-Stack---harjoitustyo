const Job = require('../models/job')
const Provider = require('../models/provider')
const Candidate = require('../models/candidate')

const initialJobs = [
  {
    candidates: [],
    title: 'Fullstack Developer',
    description: 'React, NodeJS, Mongodb, AWS, Jest',
    company: 'Company Oy',
    picture: 'job picture url',
    id: '5de5f334208d4e13266eb17e',
    jobProvider: '5de5f549715d9615d47536e5'


  },
  {
    title: 'backend Developer',
    description: 'GraphQL',
    company: 'Houston Oy',
    picture: 'job picture url',
    id: '5de5f334208d4e13266eb17f',
    jobProvider: '5de5f549715d9615d47536e5'

  }
]
const initialProviders = [
  {
    username: 'provider',
    password: 'secret',
    name: 'provider',
    checkbox: true
  },
  {
    username: 'timo',
    password: 'timo',
    name: 'timo',
    checkbox: true
  }

]
const initialCandidates = [
  {
    username: 'soini',
    name: 'Timo Soini',
    password: 'soini',
    picture: 'candidate picture url',
    passwordHash: 'secret',
    jobProvider: false
  },
  {
    username: 'pekka',
    name: 'Pekka Haavisto',
    password: 'pekka',
    picture: 'candidate picture url',
    passwordHash: 'secret',
    jobProvider: false
  },
]

const job = {
  title: 'frondend developer',
  description: 'React, JS',
  company: 'Yhtiö Oy'
}

const provider = {
  username: 'tester',
  password: 'secret',
  name: 'tester',
  checkbox: true
}
const candidate = {
  username: 'candidate',
  password: 'candidate',
  name: 'candiate',
  checkbox: false
}


const jobsInDb = async () => {
  const jobs = await Job.find({})
  return jobs.map(j => j.toJSON())
}

const providersInDb = async () => {
  const providers = await Provider.find({})
  return providers.map(p => p.toJSON())
}
const providerById = async (id) => {
  const provider = await Provider.findById(id)
  return provider.toJSON()
}
const candidatesInDb = async () => {
  const candidates = await Candidate.find({})
  return candidates.map(c => c.toJSON())
}
const candidateById = async (id) => {
  const candiate = await Candidate.findById(id)
  return candiate.toJSON()
}


const auth = {
  headers: { Authorization: 'Bearer ' }
}

module.exports = {
  initialJobs,
  initialProviders,
  initialCandidates,
  jobsInDb,
  providersInDb,
  candidatesInDb,
  provider,
  candidate,
  job,
  auth,
  providerById,
  candidateById
}