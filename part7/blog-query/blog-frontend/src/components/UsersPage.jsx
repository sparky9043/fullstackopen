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

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>users</th>
            <th>blogs created</th>
          </tr>
          {users.map(
            user => <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UsersPage