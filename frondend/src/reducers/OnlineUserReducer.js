import io from '../../socket-client'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ONLINE_USERS':
      return [action.onlineUsers]
    case 'ADD_ONLINE_USER':
      return [...state, action.user]
    case 'DISCONNECT':
      return [...state].filter(u => u.id !== action.userID)
    default:
      return [...state]
  }
}

export const initOnlineUsers = () => {
  let test
  io.getIO().emit('getUsers')

  io.getIO().on('onlineUsers', data => {
    test = data
  })
  return async dispatch => {
    dispatch({
      type: 'INIT_ONLINE_USERS',
      onlineUsers: test
    })
  }
}
export const addUserToOnline = (user, id) => {
  // console.log(user)
  user.socketID = id
  console.log(user)
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
