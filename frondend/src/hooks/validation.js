import { useState } from 'react'

export const useForm = (type) => {
  const [value, setValue] = useState('')
  const [className, setClassName] = useState('form-control')
  const [feedback, setFeedback] = useState('test')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const changeClassName = (data) => {
    setClassName(data)
  }
  const changeFeedback = (data) => {
    setFeedback(data)
  }
  const reset = () => {
    setValue('')
  }

  return [{
    className,
    type,
    value,
    onChange,
  }, reset, changeClassName,  feedback, changeFeedback]
}
