const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
<<<<<<< HEAD
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

=======
    title: {
        type: String,
        required: true,
        minlength: 4
    },
    description: String,
    canditates: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    company: {
        type: String,
        required: true,
        minlength: 4
    },
    jobProvider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
>>>>>>> a358456164f73b1a39b60495ac85109211932a56

})

jobSchema.set('toJSON', {
<<<<<<< HEAD
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const jobs = mongoose.model('Job', jobSchema)

module.exports = jobs
=======
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const job = mongoose.model('Job', jobSchema)

module.exports = job
>>>>>>> a358456164f73b1a39b60495ac85109211932a56
