const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      console.log('filtered')
      return action.payload
    default:
      return state
  }
}

export default filterReducer