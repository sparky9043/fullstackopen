const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user

  if (!user) {
    return response.status(401).json({
      error: 'user not found',
    })
  }

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({
      error: 'blog not found',
    })
  }

  if (user._id.toString() === blog.user.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    return response.status(400).json({
      error: 'the blog could not be deleted',
    })
  }
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const body = request.body
  const returnedBlog = await Blog.findById(request.params.id)

  if (!returnedBlog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'user not found' })
  }

  returnedBlog.user = user._id
  returnedBlog.title = body.title
  returnedBlog.author = body.author
  returnedBlog.url = body.url
  returnedBlog.likes = body.likes

  const savedBlog = await returnedBlog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
