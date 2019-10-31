const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const jobSchema = mongoose.Schema({

  title: {
    type: String,
    required: true,
    minlength: 4
  },
  description: String,
  candidates: [
    // {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User'
    // }
  ],
  company: {
    type: String,
    required: true,
    minlength: 4
  },
  jobProvider: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User'
  }
}, {
  timestamps: true
})

jobSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const job = mongoose.model('Job', jobSchema)

module.exports = job
