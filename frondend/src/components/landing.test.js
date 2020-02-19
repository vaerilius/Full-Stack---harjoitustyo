import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import { Provider } from 'react-redux'
// import configureStore from 'redux-mock-store'
import Landing from './landing'
import App from '../App'
import store from '../store'

// const middlewares = []
// const mockStore = configureStore(middlewares)

describe('Testpage Component', () => {
  let component
  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <App>
          <Landing />
        </App>
      </Provider>
    )
  })
  it('should render without throwing an error', async () => {
    expect(component.container).toHaveTextContent('Job Book')
    expect(component.container).toHaveTextContent('Sign Up')
    expect(component.container).toHaveTextContent('Or Sign In')
  })

  it('if user is not null should redirect', async () => {
    const user = {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByb3ZpZGVyIiwiaWQiOiI1ZTAwNmEwN2ZkNzM0NzFlMDFiMDY1NjIiLCJpYXQiOjE1NzkyNDQ5MTd9.2oG9uiItTC4qtQWxJyf7lYpx_04NkoccGmX2IIrWtyE',
      username: 'provider',
      name: 'provider',
      picture:
        'https://job-book.s3.eu-north-1.amazonaws.com/users/76be9175-427c-4cfe-814a-509096da7e6c-vader.png',
      id: '5e006a07fd73471e01b06562',
      jobProvider: true
    }
    localStorage.setItem('loggedUser', JSON.stringify(user))
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
    const state = store.getState()
    state.user = loggedUser

    component.rerender(
      <Provider store={store}>
        <App>
          <Landing />
        </App>
      </Provider>
    )
    await waitForElement(() => component)
  })
})
