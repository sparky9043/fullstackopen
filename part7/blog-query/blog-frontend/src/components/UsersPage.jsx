import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

const UsersPage = () => {

  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers
  })

  if ( result.isLoading ) {
    return (
      <p>Waiting to load users...</p>
    )
  }

  const users = result.data

  console.log(users)

  return (
    <div>
      users page
    </div>
  )
}

export default UsersPage