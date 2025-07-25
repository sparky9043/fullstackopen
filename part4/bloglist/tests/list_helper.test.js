const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helpers')

const listWithNoBlog = []

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]



test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  test('when list is empty, equals zero', () => {
    const result = listHelper.totalLikes(listWithNoBlog)
    assert.strictEqual(result, 0)
  })
  
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)

    assert.strictEqual(result, 5)
  })

  test('when list has many blogs, equals total likes', () => {
    const result = listHelper.totalLikes(blogs)

    assert.strictEqual(result, 36)
  })
})

describe('most likes', () => {
  
  test('of blog with no entries returns undefined', () => {
    const result = listHelper.favoriteBlog(listWithNoBlog)

    assert.equal(result, undefined)
  })

  test('of blog with one entry returns same entry', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)

    const singleEntry = {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }

    assert.deepStrictEqual(result, singleEntry)
  })

  test('of blog with multiple entries returns one with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    const mostLikes = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    }

    assert.deepStrictEqual(result, mostLikes)
  })
})

describe('most blogs', () => {

  test('when blog is empty, return undefined', () => {
    const result = listHelper.mostBlogs(listWithNoBlog)

    assert.strictEqual(result, undefined)
  })

  test('when blog has one entry, return object with the entry author and 1 blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)

    const mostBlog = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }

    assert.deepStrictEqual(result, mostBlog)
  })

  test('when blog with multiple entries, return most blog author and number', () => {
    const result = listHelper.mostBlogs(blogs)

    const mostBlog = {
      author: "Robert C. Martin",
      blogs: 3
    }

    assert.deepStrictEqual(result, mostBlog)
  })
})

describe('author with total likes', () => {

  test('for blog with no entries, return undefined', () => {
    const result = listHelper.mostLikes(listWithNoBlog)

    assert.strictEqual(result, undefined)
  })

  test('for blog with one entry, return the author and likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog)

    const singleBlog = {
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }

    
    assert.deepStrictEqual(result, singleBlog)
  })

  test('for blog with multiple entries, return author with total likes on all posts', () => {
    const result = listHelper.mostLikes(blogs)

    const authorWithTotalLikes = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }

    assert.deepStrictEqual(result, authorWithTotalLikes)
  })
})