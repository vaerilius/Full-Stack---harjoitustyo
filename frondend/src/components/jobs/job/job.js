import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addCandidate, handleSendMessage } from '../../../reducers/jobReducer'
import { Link } from 'react-router-dom'
import Togglable from '../../togglable'
import ManageJob from './manageJob'
import { useField } from '../../../hooks/formHook'

const Job = (props) => {

  const [lastchange, setlastChange] = useState(null)
  const [createdAt, setCreatedAt] = useState(null)
  const [message, resetMessage] = useField('text')

  useEffect(() => {
    setlastChange(props.job.updatedAt.split('T')[0])
  }, [props.job.candidates])
  useEffect(() => {
    setCreatedAt(props.job.createdAt.split('T')[0])
  }, [])


  if (!props.job) {
    return (
      <div className="text-center text-white">
        <p>Loading</p>
        <div className="spinner-border" role="status">
        </div>
      </div>
    )
  }

  const onSendMessage = (e) => {
    e.preventDefault()
    // console.log(message.value)
    props.handleSendMessage({ question: message.value, jobID: props.job.id })
    resetMessage('')
  }

  const ids = props.job.candidates.map(k => k.id)
  const isDisabled = ids.includes(props.user.id) ? true : false

  const onAddCandidate = () => {
    props.addCandidate(props.user.id, props.job.id)
  }

  const manageJobRef = React.createRef()

  return (

    <div className="container">
      <Link to={'/jobs/'}>
        <button type="button"
          className="btn btn-primary btn-md btn-block">
          Back to jobs</button>
      </Link>
      <div className="card m-5 card-hover" style={{ maxWidth: '420px' }}>
        <div className="card-header">
          <h4 className="card-title text-center">{props.job.title}</h4>
        </div>
        <img
          className="card-img-top"
          alt="..."
          src={props.job.picture} />

        <div className="card-footer text-muted text-center">
          <h4 className="card-title text-center">{props.job.company}</h4>
        </div>
        <div className="card-footer text-muted text-center">
          Job description
        </div>
        <div className="card-body">
          <p className="card-text te">{props.job.description}</p>
          {props.user.id === props.job.jobProvider.id
            ? <Togglable
              buttonLabel='Manage Job'
              ref={manageJobRef}>
              <ManageJob manageJobRef={manageJobRef} jobID={props.job.id} />
            </Togglable>
            : null
          }

        </div>


        <div className="list-group list-group-flush">
          <div className="card-footer text-muted text-center">Candidates</div>
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

        </div>

        <div className="card-footer text-muted">

          Created at: {createdAt}
        </div>
        <div className="card-footer text-muted">
          last update: {lastchange}
        </div>
      </div>
      <div className="card m-5 card-hover" style={{ maxWidth: '420px' }}>
        <div className="card-header">
          <h4 className="card-title text-center">Questions</h4>
        </div>
        <div className="card-body">
          <form onSubmit={onSendMessage}>

            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Message</span>
              </div>
              <textarea
                {...message}
                className="form-control" aria-label="With textarea"></textarea>
            </div>
            <button
              type="submit" className="btn btn-primary btn-block my-2">send message</button>
          </form>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Cras justo odio
              < span className="badge badge-primary badge-pill">14</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Dapibus ac facilisis in
              <span className="badge badge-primary badge-pill">2</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Morbi leo risus
              <span className="badge badge-primary badge-pill">1</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

  )
}
const mapStateToProps = (state, ownProps) => {
  // console.log(state.user)
  // console.log(ownProps)
  const job = state.jobs.find(j => j.id === ownProps.job.id)
  return {
    job,
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  {
    addCandidate,
    handleSendMessage
  }
)(Job)