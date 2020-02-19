import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../../../hooks/formHook'
import { onUpdateJob, removeJobAdversement } from '../../../reducers/jobReducer'
import { Link } from 'react-router-dom'

const ManageJob = props => {
  const [title, resetTitle] = useField('text')
  const [description, resetDescription] = useField('text')
  const [company, resetCompany] = useField('text')

  const onRemoveJobAdversement = () => {
    props.removeJobAdversement(props.jobID)
  }

  const updateJob = e => {
    e.preventDefault()

    props.onUpdateJob({
      title: title.value,
      description: description.value,
      company: company.value,
      jobID: props.jobID
    })
    props.manageJobRef.current.toggleVisibility()

    resetDescription()
    resetTitle()
    resetCompany()
  }

  return (
    <div className='container'>
      <form onSubmit={updateJob} className='mb-4'>
        <div className='form-group '>
          <label htmlFor='title'>title</label>
          <input className='form-control' id='title' {...title} />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Company</label>
          <input className='form-control' id='email' {...company} />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <input className='form-control' id='description' {...description} />
        </div>
        <button type='submit' className='btn btn-primary btn-block'>
          Update
        </button>
      </form>
      <div className='form-group'>
        <Link to={'/jobs/'}>
          <button
            type='button'
            className='btn btn-danger btn-md btn-block mt-2'
            onClick={onRemoveJobAdversement}
          >
            Remove Job
          </button>
        </Link>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {
  onUpdateJob,
  removeJobAdversement
})(ManageJob)
