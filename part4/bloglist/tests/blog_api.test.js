const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "We are the champions",
    author: "Queen",
    url: "http://fakeurl.com",
    likes: 441
  },
  {
    title: "I am levitating",
    author: "Dua Lipa",
    url: "http://thisisafakewebsite.org",
    likes: 327
  }
]

describe('blogs: make GET request to blog db', () => {
  test('return blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
  })
})

describe('blogs: make POST request to blog db', () => {
  test('returns code 401 without token', async () => {
    const blog = {
      title: "Testing",
      author: "The tester",
      url: "http://somekindofurl.com",
      likes: 412
    }

    const result = await api
      .post('/api/blogs')
      .send(blog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('token invalid'))
  })

  test('returns code 201 with token', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blog = {
      title: "Testing",
      author: "The tester",
      url: "http://somekindofurl.com",
      likes: 412
    }

    const secretToken = process.env.TEST_TOKEN

    const token = `Bearer ${secretToken}`

    await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', token)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(titles.includes(blog.title))
  })
})

/*

// BLOG TESTING

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs should return two entries', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)

  const titles = response.body.map(b => b.title)

  assert(titles.includes(initialBlogs[0].title))
})

test('each blog has id property', async () => {
  const response = await api.get('/api/blogs')

  const keys = response.body.map(n => Object.keys(n))

  keys.forEach(array => assert(array.includes('id')))
})

test('create a new blog post successfully', async () => {
  const newBlog = {
    title: "I am so hungry",
    author: "Me",
    url: "http://iamsohungry.com/fakeurl",
    likes: 3281
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length + 1)

  const titles = response.body.map(b => b.title)

  assert(titles.includes(newBlog.title))
})

test('new blog entry with missing likes defaults to 0', async () => {
  const newBlogNoLikes = {
    title: "fake notes",
    author: "fake user",
    url: "http://iamsohungry.com/fakeurl",    
  }

  await api
    .post('/api/blogs')
    .send(newBlogNoLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length + 1)

  const lastBlog = response.body[response.body.length - 1]

  assert.strictEqual(lastBlog.likes, 0)
})

test('missing title or url returns bad request', async () => {
  const newBlog = {
    author: "fake author"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('deleting a blog returns 204 code', async () => {
  const responseAtStart = await api.get('/api/blogs')
  const ids = responseAtStart.body.map(b => b.id)

  await api
    .delete(`/api/blogs/${ids[responseAtStart.body.length - 1]}`)
    .expect(204)
  
  const responseAtEnd = await api.get('/api/blogs')
  
  assert.strictEqual(responseAtEnd.body.length, initialBlogs.length - 1)
})

test('edit and update a blog', async () => {
  const responseAtStart = await api.get('/api/blogs')
  const initialPost = responseAtStart.body[responseAtStart.body.length - 1]

  const postToUpdate = {
    title: "Updated Post",
    author: "Updated Author",
    url: "http://thisisafakewebsite.org",
    likes: 327
  }

  await api
    .put(`/api/blogs/${initialPost.id}`)
    .send(postToUpdate)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const responseAtEnd = await api.get('/api/blogs')

  const editedPost = responseAtEnd.body[responseAtEnd.body.length - 1]

  assert.strictEqual(editedPost.title, postToUpdate.title)
})

*/

// USER TESTING

/*
describe('user: making GET request to user db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('password', 10)
    const exampleUser = new User({ username: 'example', name: 'name', passwordHash })
    await exampleUser.save()
  })

  test('returns status 200 and all users as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('user: making POST request to user db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('password', 10)
    const exampleUser = new User({ username: 'example', name: 'name', passwordHash })
    await exampleUser.save()
  })

  test('returns status 201 and json if correct format', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testing',
      name: 'tester',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('return an error expected', async() => {
    const usersAtStart = await helper.usersInDb()

    const badUsers = [
      {
        name: 'hello',
        password: 'password'
      },
      {
        username: 'fake',
        name: 'turner',
        password: 'hi'
      }
    ]

    for (const user of badUsers) {
      const result = await api
        .post('/api/users')
        .send(user)
        .expect(404)
        .expect('Content-Type', /application\/json/)

      assert(result.body.error)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    }
  })
})

*/

after(async () => {
  await mongoose.connection.close()
})