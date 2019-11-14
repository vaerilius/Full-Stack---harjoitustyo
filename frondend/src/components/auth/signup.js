import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useField } from '../../hooks/formHook'
import { signUpCandidate } from '../../reducers/candidatesReducer'
import { onSignUpProvider } from '../../reducers/providersReducer'



const SingUp = (props) => {
  const [username, resetUsername] = useField('text')
  const [name, resetName] = useField('text')
  const [picture, resetPicture] = useField('text')
  const [password, resetPassword] = useField('password')
  const [checkbox, setCheckBox] = useState(false)


  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      username: username.value,
      password: password.value,
      picture: picture.value,
      name: name.value,
      jobProvider: checkbox
    }
    data.jobProvider ? props.onSignUpProvider(data) : props.signUpCandidate(data)
   

    resetName()
    resetPassword()
    resetPicture()
    resetUsername()
    setCheckBox(false)
  }


  return (

    <div className="card text-center mt-5">
      <div className="card-body">
        <h5 className="card-title">Sign Up</h5>
        <p className="card-text">In Job Book
        employees can find open vacancies or if you are representing a job provider,
        you can manage job notifications</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
            <div className="col-sm-9">
              <input {...name} className="form-control" id="name" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="username" className="col-sm-3 col-form-label">Username</label>
            <div className="col-sm-9">
              <input {...username} className="form-control" id="username" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
            <div className="col-sm-9">
              <input {...password} className="form-control" id="password" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="picture" className="col-sm-3 col-form-label">Picture url</label>
            <div className="col-sm-9">
              <input {...picture} className="form-control" id="picture" />
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input className="form-check-input"
                type="checkbox"
                checked={checkbox}
                onChange={() => setCheckBox(!checkbox)}
                id="gridCheck"
              />
              <label className="form-check-label" htmlFor="gridCheck">
                Job Provider
      </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Sign up</button>
        </form>
      </div>
    </div>
  )
}

export default connect(null,
  {
    signUpCandidate,
    onSignUpProvider
  }
)(SingUp)