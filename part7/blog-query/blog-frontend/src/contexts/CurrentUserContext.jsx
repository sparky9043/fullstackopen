import { useReducer } from 'react';
import { createContext } from 'react';

export const CurrentUserContext = createContext()

const currentUserReducer = (state, action) => {
  switch (action.type) {
    case 'updateUser':
      return action.payload
    case 'removeUser':
      return null
    default:
      return state
  }
}

export const CurrentUserContextProvider = ({ children }) => {
  const [currentUser, currentUserDispatch] = useReducer(currentUserReducer, null)

  return (
    <CurrentUserContext.Provider value={[ currentUser, currentUserDispatch ]}>
      {children}
    </CurrentUserContext.Provider>
  )
}