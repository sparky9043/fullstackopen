import { useState } from 'react'

const Blog = ({ blog, likePost, deletePost }) => {
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

  return (
    <div style={blogStyle}>
        <div>
          {blog.title}
          
          <button onClick={handleView}>
            view
          </button>
        </div>

        {viewDetails && <>
          <div>
            {blog.url}
          </div>
          <div>
            {blog.likes}

            <button onClick={handleLike}>like</button>
          </div>
          <div>
          {blog.author}
          </div>
          <button onClick={handleDelete}>remove</button>
        </>}
    </div>  
  )
}

export default Blog