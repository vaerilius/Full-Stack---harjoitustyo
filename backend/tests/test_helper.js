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
    name: 'provider',
    password: 'provider',
    picture: 'providers picture url',
    passwordHash: 'secret',
    jobProvider: true,
    _id: '5de5f549715d9615d47536e5',
    jobsProvided: [
      '5de5f334208d4e13266eb17f',
      '5de5f334208d4e13266eb181'
    ]
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


const jobsInDb = async () => {
  const jobs = await Job.find({})
  return jobs.map(j => j.toJSON())
}

const providersInDb = async () => {
  const providers = await Provider.find({})
  return providers.map(p => p.toJSON())
}
const candidatesInDb = async () => {
  const candidates = await Candidate.find({})
  return candidates.map(p => p.toJSON())
}
// const userInDb = async () => {
//   const user = await User.find({})

//   return user.toJSON()
// }

const auth = {
  headers: { Authorization: '' }
}

module.exports = {
  initialJobs,
  initialProviders,
  // initialCandidates,
  jobsInDb,
  providersInDb,
  candidatesInDb,
  // userInDb,
  provider,
  job,
  auth
}