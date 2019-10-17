import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../../hooks/formHook'

const NewJob = (props) => {
  const [title, resetTitle] = useField('text')
  const [description, resetDescription] = useField('text')
  const [company, resetCompany] = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()

    const newJob = {
      title: title.value,
      company: company.value,
      description: description.value
    }
    console.log(newJob)


    // props.newJobRef.current.toggleVisibility()
    resetTitle()
    resetCompany()
    resetDescription()

  }

  return (
    <form onSubmit={handleSubmit}  className='mb-4 text-white'>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input className="form-control" id="title" {...title} />
      </div>
      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input className="form-control" id="company" {...company} />
      </div>
      <div className="form-group">
        <label htmlFor="Description">Description</label>
        <textarea className="form-control" id="Description" rows="3" {...description} ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs
  }
}

const mapDispatchToProps = {

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewJob)