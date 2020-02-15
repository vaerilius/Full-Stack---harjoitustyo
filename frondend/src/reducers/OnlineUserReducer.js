import io from '../../socket-client'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ONLINE_USERS':
      return [...action.users]
    case 'ADD_ONLINE_USER':
      if (state.find(u => u.socketID === action.user.socketID)) {
        return [...state]
      }
      return [...state, action.user]
    case 'DISCONNECT':
      return [...state].filter(u => u.id !== action.userID)
    default:
      return [...state]
  }
}

export const initOnlineUsers = users => {
  return async dispatch => {
    dispatch({
      type: 'INIT_ONLINE_USERS',
      users
    })
  }
}
export const addUserToOnline = user => {
  user.socketID = io.getIO().id

  io.getIO().emit('join', user)
  return async dispatch => {
    dispatch({
      type: 'ADD_ONLINE_USER',
      user
    })
  }
}

export const disconnect = data => {
  return async dispatch => {
    dispatch(data)
  }
}
export default reducer
