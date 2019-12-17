const AWS = require('aws-sdk')

AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION
})


const s3 = new AWS.S3()

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg'
    || file.mimetype === 'image/jpg'
    || file.mimetype === 'image/png') {
    cb(null, true)
  } else if (file.mimetype === 'application/pdf'){
    cb(null, true)
  } else {
    // console.log(file.mimetype)
    cb(new Error('Wrong file type, only upload JPEG and/or PNG !'),
      false)
  }
}

module.exports = {
  AWS,
  s3,
  fileFilter
}