const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response
      .status(400)
      .json({ error: "Missing title or url" })
  }

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }

  const blog = new Blog(newBlog)

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const returnedBlog = await Blog.findById(request.params.id)

  if (!returnedBlog) {
    return response.status(404).json({ error: "malformatted id" })
  }

  returnedBlog.title = title
  returnedBlog.author = author
  returnedBlog.url = url
  returnedBlog.likes = likes || 0

  const savedBlog = await returnedBlog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter