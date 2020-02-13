const reducer = (state = [], action) => {
  switch (action) {
    case action.type === 'INIT_ONLINE_USERS':
      return [...action.onlineUsers]
    case action.type === 'ADD_ONLINE_USER':
      return [...state, ...action.newUser]
    default:
      return [...state]
  }
}

export const initOnlineUsers = () => {
  return async dispatch => {
    const onlineUsers = [{ user: 'jee' }, { user: 'joo' }]
    dispatch({
      type: 'INIT_ONLINE_USERS',
      onlineUsers
    })
  }
}
export const addUserToOnline = data => {
  return async dispatch => {
    dispatch({
      type: 'ADD_ONLINE_USER',
      newUser: data
    })
  }
}
export default reducer
