import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addCandidate, removeJobAdversement } from '../../../reducers/jobReducer'
import { Link } from 'react-router-dom'

const Job = (props) => {


  if (!props.job) {
    return (
      <div>loading..</div>
    )
  }

  const [lastchange, setlastChange] = useState(props.job.updatedAt)
  const [createdAt, setCreatedAt] = useState(props.job.createdAt)

  useEffect(() => {
    setlastChange(props.job.updatedAt)
  }, [props.job.updatedAt])

  const ids = props.job.candidates.map(k => k.id)
  const addStyle = ids.includes(props.user.id) ? 'btn btn-success disabled btn-md btn-block' :
    'btn btn-success  btn-md btn-block'


  const isJobProvider = () => props.user.id === props.job.jobProvider.id ? true : false


  const onAddCandidate = () => {
    props.addCandidate(props.user.id, props.job.id)
    // setlastChange(...props.job.)  
  }
  const onRemoveJobAdversement = () => {
    props.removeJobAdversement(props.job.id)
  }


  return (

    <div className="card">
      <div className="card-header">
        Job advertisement
      </div>

      <img className="card-img-top" alt="..."
        src='https://images.unsplash.com/photo-1453814279372-783dc5b638ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80' />
      <div className="card-body">
        <h5 className="card-title">{props.job.title}</h5>
        <p className="card-text">{props.job.description}</p>
      </div>
      <ul className="list-group list-group-flush">

        {props.job.candidates
          .map(c =>
            <li key={c.id} className="list-group-item">{c.username}</li>

          )}
      </ul>
      <div className="card-body">
        {!isJobProvider()
          ?
          <button
            type="button"
            className={addStyle}
            onClick={onAddCandidate}>Add me!</button>
          : null

        }
        {isJobProvider()
          ?
          <button
            type="button"
            className='btn btn-danger btn-md btn-block'
          >Manage</button>
          : null

        }

        {isJobProvider()
          ?
          <Link to={'/jobs/'}>
            <button type="button"
              className="btn btn-danger btn-md btn-block mt-2"
              onClick={onRemoveJobAdversement}
            >Remove Job</button>
          </Link>

          :
          null
        }

      </div>
      <div className="card-footer text-muted">
        Created at: {createdAt.split('T')[0]}
      </div>
      <div className="card-footer text-muted">
        last update: {lastchange.split('T')[0]} : {lastchange.split('T')[1].split('.')[0]}
      </div>

      <Link to={'/jobs/'}>
        <button type="button"
          className="btn btn-primary btn-md btn-block">
          Back to jobs</button>
      </Link>


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
    addCandidate,
    removeJobAdversement
  }
)(Job)