import { useState } from 'react'

const Blog = ({ blog }) => {
  const [viewDetails, setViewDetails] = useState(false) 
  
  const handleView = () => setViewDetails(!viewDetails)

  return (
    <div>
      <div>
        <div>
          {blog.title}
          
          <button onClick={handleView}>
            view
          </button>
        </div>
        {viewDetails && <div>
          <div>{blog.url}</div>
          <div>{blog.likes}</div>
        </div>}
        <div>
         {blog.author}
        </div>
      </div>
    </div>  
  )
}

export default Blog