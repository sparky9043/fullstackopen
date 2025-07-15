import { useState } from 'react'
import PropTypes from 'prop-types'

const Toggleable = ({ children, buttonLabel = 'input' }) => {
  const [visibility, setVisibility] = useState(false)

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
}

Toggleable.proptypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggleable