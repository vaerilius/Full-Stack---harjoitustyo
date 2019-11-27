
import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  return (
    <div className="mb-4">
      <div style={hideWhenVisible}>
        <button
          className="btn btn-primary btn-block"
          onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <button
          className="btn btn-primary btn-block"
          onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})
Togglable.displayName = 'Togglable'

export default Togglable