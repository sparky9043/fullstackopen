import { useState } from 'react'

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

export default Toggleable