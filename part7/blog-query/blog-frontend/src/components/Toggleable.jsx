import { Button } from '@mui/material'
import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useState } from 'react'

const Toggleable = forwardRef(({ children, buttonLabel = 'input' }, refs) => {
  const [visibility, setVisibility] = useState(false)

  useImperativeHandle(refs, () => {
    return {
      setVisibility,
    }
  })

  const margin = {
    margin: '5px 0',
  }

  return (
    <div>
      <div style={{ display: visibility && 'none' }}>
        <Button
          style={margin}
          variant="outlined"
          color="seconary"
          onClick={() => setVisibility(!visibility)}
        >
          {buttonLabel}
        </Button>
      </div>
      <div style={{ display: !visibility && 'none' }}>
        <div>{children}</div>
        <Button
          style={margin}
          variant="outlined"
          color="secondary"
          onClick={() => setVisibility(!visibility)}
        >
          cancel
        </Button>
      </div>
    </div>
  )
})

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Toggleable
