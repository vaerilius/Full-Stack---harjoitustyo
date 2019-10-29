import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addCandidate } from '../../../reducers/jobReducer'

const Job = (props) => {

  if (!props.job) {
    return (
      <div>loading..</div>
    )
  }

  const onAddCandidate = () => {
    props.addCandidate(props.user.id, props.job.id)
  }

  const [lastchange, setlastChange] = useState(props.job.updatedAt)
  const [createdAt, setCreatedAt] = useState(props.job.createdAt)

  return (

    <div className="card">
      <div className="card-header">
        Job advertisement
      </div>

      <img className="card-img-top" alt="..." src='https://images.unsplash.com/photo-1453814279372-783dc5b638ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80' />
      <div className="card-body">
        <h5 className="card-title">{props.job.title}</h5>
        <p className="card-text">{props.job.description}</p>
      </div>
      <ul className="list-group list-group-flush">

        {props.job.candidates
          .map(c =>
            <li key={c} className="list-group-item">{c.username}</li>

          )}
      </ul>
      <div className="card-body">
        <button
          type="button"
          className="btn btn-success btn-md btn-block"
          onClick={onAddCandidate}
        >Add me!</button>
        <button type="button" className="btn btn-danger btn-md btn-block">Remove Job</button>
        <button type="button" className="btn btn-primary btn-md btn-block">Add me!</button>
      </div>
      <div className="card-footer text-muted">
        Created at: {createdAt.split('T')[0]}
      </div>
      <div className="card-footer text-muted">
        last update: {lastchange.split('T')[0]}
      </div>
      <button type="button" className="btn btn-primary btn-md btn-block">Back to jobs</button>

    </div>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    job: state.jobs.find(j => j.id === ownProps.job.id),
    user: state.user
  }
}



export default connect(
  mapStateToProps,
  {
    addCandidate
  }
)(Job)