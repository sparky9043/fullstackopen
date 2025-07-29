const BlogDetails = ({ blog }) => {
  if (!blog) {
    return (
      <p>invalid blog...</p>
    )
  }
  
  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.likes} likes</p>
      <p>added by {blog.author}</p>
    </div>
  )
}

export default BlogDetails