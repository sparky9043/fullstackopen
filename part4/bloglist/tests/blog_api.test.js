const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

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
})

after(async () => {
  await mongoose.connection.close()
})