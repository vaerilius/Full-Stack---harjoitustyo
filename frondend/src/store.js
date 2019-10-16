import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import jobsReducer from './reducers/jobReducer'
import usersReducer from './reducers/usersReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  jobs: jobsReducer,
  users: usersReducer,
  user: userReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store