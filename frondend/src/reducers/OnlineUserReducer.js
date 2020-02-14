const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ONLINE_USERS':
      return [...action.clients]
    case 'ADD_ONLINE_USER':
      return [...state, action.userID]
    default:
      return [...state]
  }
}

export const initOnlineUsers = clients => {
  return async dispatch => {
    dispatch({
      type: 'INIT_ONLINE_USERS',
      clients
    })
  }
}
export const addUserToOnline = userID => {
  console.log(userID)

  return async dispatch => {
    dispatch({
      type: 'ADD_ONLINE_USER',
      userID
    })
  }
}
export default reducer
