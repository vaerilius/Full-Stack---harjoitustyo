import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addCandidate, removeJobAdversement, onUpdateJob } from '../../../reducers/jobReducer'
import { Link } from 'react-router-dom'
import { useField } from '../../../hooks/formHook'

const Job = (props) => {

  const [lastchange, setlastChange] = useState(null)
  const [createdAt, setCreatedAt] = useState(null)
  const [manage, setManage] = useState(false)
  const [gridClass, setGridClass] = useState('col-sm-12')
  const [title, resetTitle] = useField('text')
  const [description, resetDescription] = useField('text')

  useEffect(() => {
    setlastChange(props.job.updatedAt.split('T')[0])
  }, [props.job.candidates])
  useEffect(() => {
    setCreatedAt(props.job.createdAt.split('T')[0])
  }, [])
  useEffect(() => {
    if (!manage) {
      setGridClass('col-md-12')
    } else {
      setGridClass('col-sm-12 col-md-6')
    }
  }, [manage])


  if (!props.job) {
    return (
      <div>loading..</div>
    )
  }

  const updateJob = (e) => {
    e.preventDefault()
    // console.log('title', title.value)
    // console.log('desc', description.value)
    props.onUpdateJob(
      {
        title: title.value,
        description: description.value,
        jobID: props.job.id,
        jobProviderID: props.job.jobProvider.id
      })
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

    <div className="container">
      <div className="row">
        <div className={gridClass}>
          <div className="card m-5 card-hover">
            <div className="card-header">
              Job advertisement:
              <h5 className="card-title">{props.job.title}</h5>
            </div>
            <img
              className="rounded mx-auto d-block my-5"
              alt="..."
              style={{ maxHeight: '18rem', maxWidth: '500px' }}
              src={props.job.picture} />
            <div className="card-body">
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
                <button
                  type="button"
                  className='btn btn-danger btn-md btn-block'
                  onClick={() => setManage(!manage)}
                >Manage</button>
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
        </div>

        {manage
          ?
          <div className="col-sm-12 col-md-6">
            <div className="card m-5 card-hover">
              <div className="card-header">
                Manage job advertisement
              </div>
              <div className="card-body">
                <form onSubmit={updateJob}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">New Title</label>
                    <input {...title} className="form-control" id="title" placeholder="Enter new title" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="desc">New description</label>
                    <input {...description} className="form-control" id="desc" placeholder="Description" />
                  </div>

                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
          : null
        }
      </div>
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
    removeJobAdversement,
    onUpdateJob
  }
)(Job)