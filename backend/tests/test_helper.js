const Job = require('../models/job')
const User = require('../models/user')

const initialJobs = [
  {
    candidates: [
      {
        id: '5db7d899493dc526590658e4',
        username: 'aaaa',
        picture: 'aaaa',
      }
    ],
    title: 'roskakuski 2.0',
    description: 'apumies',
    company: 'Lassila ja Tikanoja OY',
    jobProvider: '5db7d899493dc526590658e4',
    createdAt: '2019-10-30T05:48:42.433Z',
    updatedAt: '2019-10-30T05:48:42.433Z',
    id: '5db9243afebf0c173afb6d90'
  },
  {
    candidates: [],
    title: 'fullstack developer',
    description: 'React, node, mongo',
    company: 'Yhtiö',
    jobProvider: '5db7d899493dc526590658e4',
    createdAt: '2019-10-30T05:48:42.433Z',
    updatedAt: '2019-10-30T05:48:42.433Z',
    id: '5db7d8cd493dc526590658e5'
  },
]
const initialUsers = [
  {
    jobsProvided: [
      {
        title: 'roskakuski 2.0',
        description: 'apumies',
        id: '5db9243afebf0c173afb6d90'
      },
      {
        title: 'fullstack developer',
        description: 'React, node, mongo',
        id: '5db7d8cd493dc526590658e5'
      }
    ],
    interestingJobs: [],
    username: 'timo',
    name: 'timo',
    picture: 'XXXX',
    jobProvider: true,
    createdAt: '2019-10-29T06:13:45.530Z',
    updatedAt: '2019-10-30T05:48:42.955Z',
    id: '5db7d899493dc526590658e4'
  },
  {
    jobsProvided: [],
    interestingJobs: [
      {
        title: 'roskakuski 2.0',
        id: '5db9243afebf0c173afb6d90'
      }
    ],
    username: 'aaaa',
    name: 'aaaa',
    picture: 'aaaa',
    jobProvider: false,
    createdAt: '2019-10-29T06:13:45.530Z',
    updatedAt: '2019-10-30T05:48:42.955Z',
    id: '5db7d899493dc526590658e4'
  },
]
const user = {
  username: 'testaaja',
  password: 'timo',
  name: 'timo',
  picture: 'qqqq',
  jobProvider: true,
  phone: '12341234' }


const jobsInDb = async () => {
  const jobs = await Job.find({})
  return jobs.map(j => j.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
const userInDb = async (name) => {
  const user = await User.find({})

  return user.toJSON()
}

module.exports = {
  initialJobs,
  initialUsers,
  jobsInDb,
  usersInDb,
  user,
  userInDb
}