const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ONLINE_USERS':
      return [...action.clients]
    case 'ADD_ONLINE_USER':
      return [...state, action.user]
    default:
      return [...state]
  }
}

export const initOnlineUsers = (clients, id, user) => {
  // const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
  // console.log(loggedUser)
  const initUser = {
    id,
    user
  }
  const modifiedArr = clients.map(c => (c === initUser.id ? initUser : c))

  return async dispatch => {
    dispatch({
      type: 'INIT_ONLINE_USERS',
      clients: modifiedArr
    })
  }
}
export const addUserToOnline = user => {
  console.log(user)

  return async dispatch => {
    dispatch({
      type: 'ADD_ONLINE_USER',
      user
    })
  }
}
export default reducer
