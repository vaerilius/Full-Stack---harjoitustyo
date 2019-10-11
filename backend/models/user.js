const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
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
  status: String,
  interestingJobs: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
      }
  ],
  jobsProvided: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    }
  ],
  passwordHash: String
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User