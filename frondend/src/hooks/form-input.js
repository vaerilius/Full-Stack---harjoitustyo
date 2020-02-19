import { useState } from 'react'

export const useForm = type => {
  const [value, setValue] = useState('')
  const [className, setClassName] = useState('form-control')
  const [feedback, setFeedback] = useState('test')

  const onChange = event => {
    setValue(event.target.value)
  }
  const changeClassName = data => {
    setClassName(data)
  }
  const changeFeedback = data => {
    setFeedback(data)
  }
  const reset = () => {
    setClassName('form-control')
    setValue('')
  }

  return [
    {
      className,
      type,
      value,
      onChange
    },
    reset,
    changeClassName,
    feedback,
    changeFeedback
  ]
}

export const useFileInput = type => {
  const [file, setFile] = useState(null)
  const [className, setClassName] = useState('form-control')

  const [feedback, setFeedback] = useState('')

  const onChange = e => {
    setFile(e.target.files[0])
  }

  const changeFeedback = data => {
    setFeedback(data)
  }
  const reset = () => {
    setFile(null)
    setClassName('form-control')
  }

  return [
    {
      type,
      onChange,
      className
    },
    { feedback, file },
    changeFeedback,
    reset,
    setClassName
  ]
}
