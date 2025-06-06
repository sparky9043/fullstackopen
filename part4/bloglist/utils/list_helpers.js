const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  return blogs.length === 0
    ? 0
    : blogs
        .map(blog => blog.likes)
        .reduce((previous, current) => previous + current, 0)
}

console.log(
  totalLikes([{ likes: 9 }, { likes: 1 }, { likes: 12 }])
)

module.exports = {
  dummy
}
