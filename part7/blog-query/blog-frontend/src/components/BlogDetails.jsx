const BlogDetails = ({ blog }) => {
  if (!blog) {
    return (
      <p>invalid blog...</p>
    )
  }
  
  console.log(blog)
  return (
    <div>

    </div>
  )
}

export default BlogDetails