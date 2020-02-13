import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import jobsReducer from './reducers/jobReducer'
import candidatesReducer from './reducers/candidatesReducer'
import providersReducer from './reducers/providersReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import usersOnlineReducer from './reducers/OnlineUserReducer'

const reducer = combineReducers({
  jobs: jobsReducer,
  candidates: candidatesReducer,
  providers: providersReducer,
  user: userReducer,
  notification: notificationReducer,
  onlineUsers: usersOnlineReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
