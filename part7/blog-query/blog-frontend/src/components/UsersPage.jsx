import { useNavigate, Link } from 'react-router-dom'

const UsersPage = ({ users }) => {
  const navigate = useNavigate()

  if (!users) {
    return (
      <p>Waiting to load users...</p>
    )
  }

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
              <td>
                <Link to={`${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UsersPage