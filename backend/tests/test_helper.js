const Job = require('../models/job')
const Provider = require('../models/provider')
const Candidate = require('../models/candidate')

const initialJobs = [
  {
    candidates: [
      {
        id: '3',
        username: 'candidate',
        name: 'candidate',
        picture: 'candidate picture url',
      }
    ],
    title: 'Fullstack Developer',
    description: 'React, NodeJS, Mongodb, AWS, Jest',
    company: 'Company Oy',
    jobProvider: {
      username: 'provider',
      name: 'provider',
      picture: 'providers picture url',
      id: '1'
    },
    createdAt: '2019-11-26T08:55:27.075Z',
    updatedAt: '2019-11-29T07:22:58.206Z',
    id: '1'
  },
  {
    candidates: [],
    title: 'backend Developer',
    description: 'GraphQL',
    company: 'Houston Oy',
    jobProvider: {
      username: 'houston',
      name: 'houston',
      picture: 'provider picture url',
      id: '2'
    },
    createdAt: '2019-11-26T08:55:27.075Z',
    updatedAt: '2019-11-29T07:22:58.206Z',
    id: '2'
  }
]
const initialProviders = [
  {
    jobsProvided: [
      {
        title: 'backend Developer',
        description: 'GraphQL',
        company: 'Houston Oy',
        id: '2'
      }
    ],
    username: 'houston',
    password: 'houston',
    name: 'houston',
    picture: 'providers picture url',
    jobProvider: true,
    createdAt: '2019-10-29T06:13:45.530Z',
    updatedAt: '2019-10-30T05:48:42.955Z',
    id: '2'
  },
  {
    jobsProvided: [
      {
        title: 'Fullstack Developer',
        description: 'React, NodeJS, Mongodb, AWS, Jest',
        company: 'Company Oy',
        id: '1'
      }
    ],
    username: 'provider',
    name: 'provider',
    password: 'provider',
    picture: 'providers picture url',
    jobProvider: true,
    createdAt: '2019-10-29T06:13:45.530Z',
    updatedAt: '2019-10-30T05:48:42.955Z',
    id: '1'
  },
]
const provider = new Provider({
  username: 'provider',
  name: 'provider',
  password: 'provider',
  picture: 'providers picture url',
  jobProvider: true
})
const candidate = {
  username: 'candidate',
  name: 'candidate',
  password: 'candidate',
  picture: 'candidate picture url',
  jobProvider: false
}

const job = {
  candidates: [],
  title: 'frondend developer',
  description: 'React, JS',
  company: 'Yhtiö',
  jobProvider: '5db7d899493dc526590658e4',
  createdAt: '2019-10-30T05:48:42.433Z',
  updatedAt: '2019-10-30T05:48:42.433Z',
  id: '5db7d8cd493dc526590658e6'
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
  provider,
  candidate,
  // userInDb,
  job,
  auth
}