import { useState, useEffect } from 'react'

export const Validator = (fieldValue, setUsernameValidator, setFeedback) => {
  const [isTouched, setIsTouched] = useState(false)
  useEffect(() => {
    if (fieldValue.length === 0) {
      setUsernameValidator('form-control')
      if (isTouched) {
        setUsernameValidator('form-control is-invalid')

        setFeedback('this field is required')
      }

    } else if (fieldValue.length < 4 && fieldValue.length > 0) {
      setIsTouched(true)
      setUsernameValidator('form-control is-invalid')
      setFeedback('this field min length is 4')

    } else {
      setIsTouched(true)
      setUsernameValidator('form-control is-valid')

    }
  }, [fieldValue])

  return false
}
export const FileValidator = (fileData, changeImageFeedback, changeImgClassName) => {

  useEffect(() => {
    console.log(fileData)
    if (fileData.file) {
      if (fileData.file.type.includes('image')) {
        changeImgClassName('form-control is-valid')

      } else {
        changeImgClassName('form-control is-invalid')
        changeImageFeedback('Type of picture must be valid')

      }
    } else {
      changeImgClassName('form-control ')

    }

  }, [fileData.file])

  return false
}