const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
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
        type: Boolean,
        required: true
    }

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