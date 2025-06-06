const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  return blogs.length === 0
    ? 0
    : blogs
        .reduce((previous, current) => previous + current.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.find(blog => blog.likes === Math.max(...blogs.map(blog => blog.likes)))
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined

  const blogPosts = []

  blogs.map(blog => blog.author).forEach(author => {
    const authors = blogPosts.map(post => post.author);

    if (!authors.includes(author)) {
      blogPosts.push({
        author, blogs: 1
      })
    } else {
      blogPosts.find(post => post.author === author).blogs++
    }
  })

  const maxBlog = blogPosts.find(post => post.blogs === Math.max(...blogPosts.map(post => post.blogs)))

  return maxBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
