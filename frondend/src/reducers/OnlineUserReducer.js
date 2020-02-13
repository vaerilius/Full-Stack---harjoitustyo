const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ONLINE_USERS':
      return [...action.onlineUsers]
    case 'ADD_ONLINE_USER':
      return [...state, action.newUser]
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
  const user = JSON.parse(window.localStorage.getItem('loggedUser'))
  if (user) {
    const newUser = {
      id: data,
      user: user.id
    }
    return async dispatch => {
      dispatch({
        type: 'ADD_ONLINE_USER',
        newUser
      })
    }
  }
}
export default reducer
