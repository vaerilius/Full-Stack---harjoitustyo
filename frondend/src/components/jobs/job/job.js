import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addCandidate, removeJobAdversement } from '../../../reducers/jobReducer'
import { Link } from 'react-router-dom'

const Job = (props) => {

  const [lastchange, setlastChange] = useState(null)
  const [createdAt, setCreatedAt] = useState(null)

  useEffect(() => {
    console.log('updateAT')
    setlastChange(props.job.updatedAt.split('T')[0])
  }, [props.job.candidates])
  useEffect(() => {
    setCreatedAt(props.job.createdAt.split('T')[0])
  }, [])


  if (!props.job) {
    return (
      <div>loading..</div>
    )
  }



  const ids = props.job.candidates.map(k => k.id)
  const isDisabled = ids.includes(props.user.id) ? true : false

  const onAddCandidate = () => {
    props.addCandidate(props.user.id, props.job.id)
    // setlastChange(...props.job.)
  }
  const onRemoveJobAdversement = () => {
    props.removeJobAdversement(props.job.id)
  }

  return (

    <div className="card m-5 card-hover">
      <div className="card-header">
        Job advertisement
      </div>

      <img
        className="img-fluid"
        alt="..."
        style={{ maxHeight: '15rem', maxWidth: '500px' }}
        src={props.job.picture} />
      <div className="card-body">
        <h5 className="card-title">{props.job.title}</h5>
        <p className="card-text">{props.job.description}</p>
      </div>
      <div className="list-group list-group-flush">

        {props.job.candidates
          .map(c =>
            <div key={c.id} className="list-group-item list-group-item-action">
              <Link to={`/candidates/${c.id}`}>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="m-3">{c.name}</h5>
                  <img src={c.picture}
                    className="m-3 " style={{ height: '2rem' }} alt={c.name} />
                </div>
              </Link>
            </div>
          )}
      </div>
      <div className="card-body">
        {!props.user.jobProvider
          ?
          <button
            type="button"
            disabled={isDisabled}
            className='btn btn-success  btn-md btn-block'
            onClick={onAddCandidate}>Add me!</button>
          : null

        }
        {props.user.jobProvider
          ?
          <a
            type="button"
            className='btn btn-danger btn-md btn-block'
          >Manage</a>
          : null

        }

        {props.user.jobProvider
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

        Created at: {createdAt}
      </div>
      <div className="card-footer text-muted">
        last update: {lastchange}
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