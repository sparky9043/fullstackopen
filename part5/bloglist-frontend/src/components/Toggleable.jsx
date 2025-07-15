import { useState } from 'react'

const Toggleable = ({ children }) => {
  const [visibility, setVisibility] = useState(false)

  return (
    <div>
      <div style={{ display: visibility && 'none' }}>
        <p>Show actual content by pressing button</p>
        <button onClick={() => setVisibility(!visibility)}>
          show content
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