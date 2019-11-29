const Job = require('../models/job')
const Provider = require('../models/provider')
const Candidate = require('../models/candidate')

const initialJobs = [
  {
    title: 'Fullstack Developer',
    description: 'React, NodeJS, Mongodb, AWS, Jest',
    company: 'Company Oy',
    picture: 'job picture url',
 
  },
  {
    title: 'backend Developer',
    description: 'GraphQL',
    company: 'Houston Oy',
    picture: 'job picture url',
  
  }
]
const initialProviders = [
  {
    username: 'houston',
    password: 'houston',
    name: 'houston',
    picture: 'providers picture url',
    jobProvider: true,
  },
  {
    username: 'provider',
    name: 'provider',
    password: 'provider',
    picture: 'providers picture url',
    jobProvider: true,
  },
]

const job = {
  title: 'frondend developer',
  description: 'React, JS',
  company: 'Yhtiö Oy'
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
  job,
  auth
}