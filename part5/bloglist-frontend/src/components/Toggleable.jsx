import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useState } from 'react'

const Toggleable = forwardRef(({ children, buttonLabel = 'input' }, refs) => {
  const [visibility, setVisibility] = useState(false)

  useImperativeHandle(refs, () => {
    return {
      setVisibility
    }
  })

  return (
    <div>
      <div style={{ display: visibility && 'none' }}>
        <button onClick={() => setVisibility(!visibility)}>
          {buttonLabel}
        </button>
      </div>
      <div style={{ display: !visibility && 'none' }}>
        <div>
          {children}
        </div>
        <button onClick={() => setVisibility(!visibility)}>
          cancel
        </button>
      </div>
    </div>
  )
})

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggleable