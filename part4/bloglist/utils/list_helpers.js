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

module.exports = {
  dummy,
  totalLikes
}
