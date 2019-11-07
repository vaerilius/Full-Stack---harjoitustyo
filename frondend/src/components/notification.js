import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  return (

<div className={ props.notification.class } role="alert">
  { props.notification.message }
</div>
  )
}

 const mapStateToProps = (state) => {return { notification: state.notification }}

export default connect(mapStateToProps)(Notification)