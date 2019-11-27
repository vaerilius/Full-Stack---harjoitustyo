import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useField } from '../../../../hooks/formHook'




const ManageProfile = (props) => {
  const [phone, resetPhone] = useField('text')
  const [email, resetEmail] = useField('email')
  // const [picture, setPicture] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      phone: phone.value,
      email: email.value,
    }
    console.log(data)

    props.manageProfileRef.current.toggleVisibility()
    resetPhone()
    resetEmail()
    // setPicture(null)
  }

  return (
    <form onSubmit={handleSubmit} className='mb-4'>
      <div className="form-group ">
        <label htmlFor="title">Phone</label>
        <input className="form-control" id="phone" {...phone} />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input className="form-control" id="email" {...email} />
      </div>

      <button type="submit" className="btn btn-primary btn-block">Change</button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs
  }
}



export default connect(
  mapStateToProps,
  {

  }
)(ManageProfile)
