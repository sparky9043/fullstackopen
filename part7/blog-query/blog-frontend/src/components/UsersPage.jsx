import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Link } from 'react-router-dom'

const UsersPage = ({ users }) => {
  if (!users) {
    return (
      <p>Waiting to load users...</p>
    )
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              users
            </TableCell>
            <TableCell>
              blogs created
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(
            user => <TableRow key={user.id}>
              <TableCell>
                <Link to={`${user.id}`}>
                  {user.name}
                </Link>
              </TableCell>
              <TableCell>
                {user.blogs.length}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UsersPage