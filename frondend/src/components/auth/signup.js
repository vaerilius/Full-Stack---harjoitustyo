import React, { useState } from 'react'
import { connect } from 'react-redux'
import useForm from "react-hook-form"
import { Link } from 'react-router-dom'
import { useField, useFileField } from '../../hooks/formHook'
// import { Validator } from '../../hooks/validator'
import { signUpCandidate } from '../../reducers/candidatesReducer'
import { onSignUpProvider } from '../../reducers/providersReducer'


const SingUp = (props) => {
  const [username, resetUsername] = useField('text')
  const [name, resetName] = useField('text')
  // const [picture, resetPicture] = useFileField('file')
  const [picture, setPicture] = useState(null)
  const [password, resetPassword] = useField('password')
  const [checkbox, setCheckBox] = useState(false)


  const [test, setTest] = useState('')

  // const [userNameFeedback, setusernameFeedback] = useState('')
  // const [usernameClassValidator, setUsernameClassValidator] = useState('form-control')
  // const [nameClassValidator, setNameClassValidator] = useState('form-control')

  // Validator(username.value, setUsernameClassValidator, setusernameFeedback)
  const { register, errors } = useForm()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('profileImg', picture)
    formData.append('username', username.value)
    formData.append('name', name.value)
    formData.append('password', password.value)
    formData.append('checkbox', checkbox)
    checkbox ? props.onSignUpProvider(formData) : props.signUpCandidate(formData)

    resetName()
    resetPassword()
    // resetPicture()
    setPicture(null)
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

        <input
          name="username"
          ref={register({
            required: 'Required',
            validate: value => value !== "admin" || "Nice try!"
          })}
        />

        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
            <div className="col-sm-9">
              <input {...name} className="form-control" id="name" required/>

            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="username" className="col-sm-3 col-form-label">Username</label>
            <div className="col-sm-9">
              <input {...username} className="form-control" id="username"
                required
              />
              {errors.username && errors.username.message}
              {/* <div className="invalid-feedback">
                {userNameFeedback}
              </div> */}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
            <div className="col-sm-9">
              <input {...password} className="form-control" id="password" required/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="picture" className="col-sm-3 col-form-label">Picture url</label>
            <div className="col-sm-9">
              <input
                label="Picture"
                required
                // validators={['required:1']}
                // errorMessages={['this field is required']}
                type='file'
                onChange={(e) => setPicture(e.target.files[0])}
              />

              {/* <input {...picture} className="form-control" id="picture" /> */}
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
        <Link to='/'>
          <button type="button" className="btn btn-secondary btn-block mt-3">Back</button>
        </Link>

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