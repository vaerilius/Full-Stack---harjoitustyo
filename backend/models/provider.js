const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const providerSchema = mongoose.Schema({
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
  phone: {
    type: String,
    minlength: 6
  },
  email: {
    type: String,
    minlength: 6
  },
  jobsProvided: [
    // {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Job'
    // }
  ],
  passwordHash: String
}, {timestamps: true})

providerSchema.plugin(uniqueValidator)

providerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const Provider = mongoose.model('Provider', providerSchema)

module.exports = Provider