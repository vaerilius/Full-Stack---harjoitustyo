import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useField } from '../../hooks/formHook'
import { addNewJob } from '../../reducers/jobReducer'

const NewJob = props => {
  const [title, resetTitle] = useField('text')
  const [description, resetDescription] = useField('text')
  const [company, resetCompany] = useField('text')
  const [picture, setPicture] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('jobImg', picture)
    formData.append('title', title.value)
    formData.append('company', company.value)
    formData.append('description', description.value)

    props.addNewJob(formData)

    props.newJobRef.current.toggleVisibility()
    resetTitle()
    resetCompany()
    resetDescription()
    setPicture(null)
  }

  return (
    <form onSubmit={handleSubmit} className=' text-white '>
      <div className='form-group'>
        <label htmlFor='title'>Title</label>
        <input className='form-control' id='title' {...title} />
      </div>
      <div className='form-group'>
        <label htmlFor='company'>Company</label>
        <input className='form-control' id='company' {...company} />
      </div>
      <div className='form-group'>
        <label htmlFor='Description'>Description</label>
        <textarea
          className='form-control'
          id='description'
          rows='3'
          {...description}
        ></textarea>
      </div>
      <div className='form-group'>
        <input
          label='Picture'
          type='file'
          onChange={e => setPicture(e.target.files[0])}
        />
      </div>

      <button type='submit' className='btn btn-primary btn-block mb-4'>
        Submit
      </button>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    jobs: state.jobs
  }
}

export default connect(mapStateToProps, {
  addNewJob
})(NewJob)
