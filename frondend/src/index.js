import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
// import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
module.hot.accept()