import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, likePost, deletePost, user }) => {
  const blogStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '.5rem',
    padding: '10px 0',
    border: '2px solid black',
    margin: '5px 0'
  }

  const [viewDetails, setViewDetails] = useState(false) 
  
  const handleView = () => setViewDetails(!viewDetails)

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
    <div style={blogStyle} className='blog'>
      <div id="blog-title">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title}
        </Link>
      </div>

      {viewDetails && 
        <div className='hidden'>
          <div id="blog-url">
            {blog.url}
          </div>
          <div id="blog-likes">
            <span data-testid='likes'>{blog.likes}</span>
            <button onClick={handleLike}>like</button>
          </div>
          {isUserSame && <button onClick={handleDelete}>remove</button>}
        </div>
      }
      <div id="blog-author">{blog.author}</div>
      <button onClick={handleView} id="view-button">
        view
      </button>
    </div>  
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  dletePost: PropTypes.func.isRequired,
}

export default Blog