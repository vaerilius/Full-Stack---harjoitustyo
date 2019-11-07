
const reducer = (state = { class: 'alert alert-primary', message: null }, action) => {

  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const setNotification = (notification) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: { class: 'alert alert-primary', message: null }
      })
    }, 4000)
  }
}

export default reducer