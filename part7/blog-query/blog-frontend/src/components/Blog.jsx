import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, TableCell, TableRow } from '@mui/material'

const Blog = ({ blog, likePost, deletePost, user }) => {
  const handleLike = () => {
    likePost({
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      author: blog.author,
      id: blog.id,
    })
  }

  const handleDelete = () => {
    if (window.confirm(`Would you like to delete "${blog.title}"?`)) {
      deletePost(blog.id)
    }
  }

  const isUserSame = blog.user === user.id

  return (
    <TableRow>
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        {isUserSame && (
          <Button variant="contained" size="small" onClick={handleDelete}>
            remove
          </Button>
        )}
      </TableCell>
      <TableCell>{blog.author}</TableCell>
      <TableCell>{blog.url}</TableCell>
      <TableCell>
        {blog.likes}
        <Button onClick={handleLike}>👍</Button>
      </TableCell>
    </TableRow>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  dletePost: PropTypes.func.isRequired,
}

export default Blog
