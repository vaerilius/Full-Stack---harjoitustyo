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