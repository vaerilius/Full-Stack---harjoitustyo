import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import { useField, useFileField } from '../../hooks/formHook'
import { useForm, useFileInput } from '../../hooks/form-input'
import { Validator, FileValidator } from '../../hooks/validator'
import { signUpCandidate } from '../../reducers/candidatesReducer'
import { onSignUpProvider } from '../../reducers/providersReducer'
import { Animation } from '../../hooks/animation'

const SingUp = props => {
  // const [name, resetName] = useField('text')
  // const [picture, resetPicture] = useFileField('file')
  const [formValid, setFormValid] = useState(true)
  const [checkbox, setCheckBox] = useState(false)

  const [
    name,
    resetName,
    changeNameClassName,
    nameFeedback,
    changeNameFeedback
  ] = useForm('text')
  const [
    username,
    resetUsername,
    changeUsernameClassName,
    usernameFeedback,
    changeUsernameFeedback
  ] = useForm('text')
  const [
    password,
    resetPassword,
    passValidationClass,
    passwordFeedback,
    changePasswordFeedback
  ] = useForm('password')
  // const [checkbox, setCheckBox, checkBoxValidationClass, checkBoxwordFeedback, changeCheckboxFeedback] = useForm('checkbox')
  const [
    img,
    fileData,
    changeImgFeedback,
    resetImg,
    changeImgClassName
  ] = useFileInput('file')

  const resetNameValidation = Validator(
    name.value,
    changeNameClassName,
    changeNameFeedback
  )
  const resetUsernameValidation = Validator(
    username.value,
    changeUsernameClassName,
    changeUsernameFeedback
  )
  const resetPasswordValidation = Validator(
    password.value,
    passValidationClass,
    changePasswordFeedback
  )

  FileValidator(fileData, changeImgFeedback, changeImgClassName)
  useEffect(() => {
    if (
      img.className.includes('is-valid') &&
      name.className.includes('is-valid') &&
      username.className.includes('is-valid') &&
      password.className.includes('is-valid')
    ) {
      setFormValid(false)
    }
  }, [img.className, name.className, username.className, password.className])
  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('profileImg', fileData.file)
    formData.append('username', username.value)
    formData.append('name', name.value)
    formData.append('password', password.value)
    formData.append('checkbox', checkbox)
    checkbox
      ? props.onSignUpProvider(formData)
      : props.signUpCandidate(formData)

    resetName()
    resetPassword()
    // resetPicture()
    // setPicture(null)
    resetImg(null)
    resetUsername()
    setCheckBox(false)
    resetNameValidation(false)
    resetUsernameValidation(false)
    resetPasswordValidation(false)
  }
  Animation()
  return (
    <div className='container '>
      <div className='card scale text-center '>
        <div className='card-body'>
          <h5 className='card-title'>Sign Up</h5>
          <p className='card-text'>
            In Job Book employees can find open vacancies or if you are
            representing a job provider, you can manage job notifications
          </p>

          <form onSubmit={handleSubmit}>
            <div className='form-group row'>
              <label htmlFor='name' className='col-sm-3 col-form-label'>
                Name
              </label>
              <div className='col-sm-9'>
                <input {...name} id='name' />
                <div className='invalid-feedback'>{nameFeedback}</div>
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='username' className='col-sm-3 col-form-label'>
                Username
              </label>
              <div className='col-sm-9'>
                <input {...username} id='username' />
                <div className='invalid-feedback'>{usernameFeedback}</div>
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='password' className='col-sm-3 col-form-label'>
                Password
              </label>
              <div className='col-sm-9'>
                <input {...password} id='password' />
                <div className='invalid-feedback'>{passwordFeedback}</div>
              </div>
            </div>
            {/* <div className="form-group row">
            <label htmlFor="picture" className="col-sm-3 col-form-label">Picture</label>
            <div className="col-sm-9">
              <input
                label="Picture"
                // validators={['required:1']}
                // errorMessages={['this field is required']}
                type='file'
                onChange={(e) => setPicture(e.target.files[0])}
              />

            </div>
          </div> */}
            <div className='form-group row'>
              <label htmlFor='picture1' className='col-sm-3 col-form-label'>
                Picture1
              </label>
              <div className='col-sm-9'>
                <input {...img} label='Picture' />
                <div className='invalid-feedback'>{fileData.feedback}</div>
                <div className='valid-feedback'>{fileData.feedback}</div>
              </div>
            </div>
            <div className='form-group'>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  checked={checkbox}
                  onChange={() => setCheckBox(!checkbox)}
                  id='gridCheck'
                />
                <label className='form-check-label' htmlFor='gridCheck'>
                  Job Provider
                </label>
              </div>
            </div>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={formValid}
            >
              Sign up
            </button>
          </form>
          <Link to='/'>
            <button type='button' className='btn btn-secondary btn-block mt-3'>
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default connect(null, {
  signUpCandidate,
  onSignUpProvider
})(SingUp)
