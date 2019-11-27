import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../../hooks/formHook'
import { updateProvider } from '../../reducers/providersReducer'
import { updateCandidate } from '../../reducers/candidatesReducer'


const ManageProfile = (props) => {
  const [phone, resetPhone] = useField('text')
  const [description, resetDescription] = useField('text')
  const [email, resetEmail] = useField('email')
  // const [picture, setPicture] = useState(null)

  const handleSubmit = (e) => {
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

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className='mb-4'>
        <div className="form-group ">
          <label htmlFor="title">Phone</label>
          <input className="form-control" id="phone" {...phone} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input className="form-control" id="email" {...email} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input className="form-control" id="description" {...description} />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Change</button>
      </form>
    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  {
    updateProvider,
    updateCandidate
  }
)(ManageProfile)
