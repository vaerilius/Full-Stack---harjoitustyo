const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 4
  },
  description: {
    type: String,
    required: true,
    minlength: 4
  },
  company: {
    type: String,
    required: true,
    minlength: 4
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  candidates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]


})

jobSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const jobs = mongoose.model('Job', jobSchema)

module.exports = jobs