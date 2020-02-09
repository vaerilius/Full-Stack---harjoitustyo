import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useField } from '../../hooks/formHook'
import { updateProvider } from '../../reducers/providersReducer'
import {
  updateCandidate,
  updateCandidateCV
} from '../../reducers/candidatesReducer'

const ManageProfile = props => {
  const [phone, resetPhone] = useField('text')
  const [description, resetDescription] = useField('text')
  const [email, resetEmail] = useField('email')
  // const [picture, setPicture] = useState(null)
  const [cv, setCV] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()

    const data = {
      phone: phone.value,
      email: email.value,
      description: description.value,
      id: props.id
    }

    props.user.jobProvider
      ? props.updateProvider(data)
      : props.updateCandidate(data)

    props.manageProfileRef.current.toggleVisibility()
    resetPhone()
    resetEmail()
    resetDescription()
    // setPicture(null)
  }

  const uploadCV = e => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('cv', cv)
    if (!props.user.jobProvider) {
      props.updateCandidateCV(formData, props.id)
      setCV(null)
    }
  }

  return (
    <div className='container shadow p-3 mb-4'>
      <form onSubmit={handleSubmit} className='mb-4'>
        <div className='form-group '>
          <label htmlFor='title'>Phone</label>
          <input className='form-control' id='phone' {...phone} />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input className='form-control' id='email' {...email} />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <input className='form-control' id='description' {...description} />
        </div>
        <button type='submit' className='btn btn-primary btn-block'>
          Change
        </button>
      </form>
      {!props.user.jobProvider ? (
        <form onSubmit={uploadCV} className='mb-4'>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text' id='inputGroupFileAddon01'>
                CV pdf file
              </span>
            </div>
            <div className='custom-file'>
              <input
                type='file'
                className='custom-file-input'
                id='cv'
                aria-describedby='inputGroupFileAddon01'
                onChange={e => setCV(e.target.files[0])}
              />
              <label className='custom-file-label' htmlFor='cv'></label>
            </div>
          </div>
          <button type='submit' className='btn btn-primary btn-block'>
            Upload CV
          </button>
        </form>
      ) : null}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {
  updateProvider,
  updateCandidate,
  updateCandidateCV
})(ManageProfile)
