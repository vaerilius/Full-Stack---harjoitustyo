const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 4
  },
  description: String,
  url: {
    type: String,
    required: true,
    minlength: 4
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

})

projectSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const project = mongoose.model('Project', projectSchema)

module.exports = project