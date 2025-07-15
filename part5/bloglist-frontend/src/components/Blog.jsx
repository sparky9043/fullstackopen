import { useState } from 'react'

const Blog = ({ blog, likePost }) => {
  const blogStyle = {
    display: 'flex',
    flexDirection: 'column',
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
        </>}
    </div>  
  )
}

export default Blog