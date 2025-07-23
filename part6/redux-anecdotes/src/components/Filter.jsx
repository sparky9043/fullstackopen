import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  // console.log(state)

  const handleChange = (event) => {
    dispatch(filterChange(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter
      <input
        onChange={handleChange}
      />
    </div>
  )
}

export default Filter