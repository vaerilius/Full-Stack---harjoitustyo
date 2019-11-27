const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const candidateSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  name: {
    type: String,
    required: true,
    minlength: 4
  },
  picture: {
    type: String,
    required: true,
    minlength: 4
  },
  jobProvider: Boolean,
  description: String,
  phone: String,
  email: String,
  interestingJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    }
  ],
  passwordHash: String
})

candidateSchema.plugin(uniqueValidator)
candidateSchema.set('timestamps', true)

candidateSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const Candidate = mongoose.model('Candidate', candidateSchema)

module.exports = Candidate