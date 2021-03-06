import { useState, useEffect } from 'react'

export const Validator = (fieldValue, setUsernameValidator, setFeedback) => {
  const [isTouched, setIsTouched] = useState(false)
  useEffect(() => {
    if (fieldValue.length === 0 && isTouched) {
      setUsernameValidator('form-control is-invalid')
      setFeedback('this field is required')
    } else if (fieldValue.length >= 4) {
      setIsTouched(true)
      setUsernameValidator('form-control is-valid')
    } else if (fieldValue.length < 4 && fieldValue.length > 0) {
      setIsTouched(true)
      setUsernameValidator('form-control is-invalid')
      setFeedback('this field min length is 4')
    }
  }, [fieldValue, setFeedback, setUsernameValidator, isTouched])

  return setIsTouched
}
export const FileValidator = (
  fileData,
  changeImageFeedback,
  changeImgClassName
) => {
  useEffect(() => {
    if (fileData.file) {
      if (fileData.file.type.includes('image')) {
        changeImgClassName('form-control is-valid')
        changeImageFeedback('picture is valid')
      } else {
        changeImgClassName('form-control is-invalid')
        changeImageFeedback('Type of picture must be valid')
      }
    } else {
      changeImgClassName('form-control ')
      changeImageFeedback('')
    }
  }, [fileData.file, changeImageFeedback, changeImgClassName])

  return false
}
