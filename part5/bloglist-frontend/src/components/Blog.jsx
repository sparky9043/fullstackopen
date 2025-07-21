import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, likePost, deletePost, compareUsername }) => {
  console.log(blog)

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

  const showRemoveButton = () => {
    return compareUsername(blog.user.username)
  }

  return (
    <div style={blogStyle}>
      <div id="blog-title">{blog.title} </div>

      {viewDetails && 
        <div className='hidden'>
          <div id="blog-url">
            {blog.url}
          </div>
          <div id="blog-likes">
            {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          {showRemoveButton() && <button onClick={handleDelete}>remove</button>}
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