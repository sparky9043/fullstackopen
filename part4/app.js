const mongoose = require('mongoose');
const configs = require('./utils/configs')
const express = require('express')
const app = express()
const blogsRouter = require('./controller/blogs')

app.use(express.json())

mongoose.set('strictQuery', false)

mongoose.connect(configs.MONGODB_URI)
  .then(() => {
    console.log('connecting to MongoDB')
  })
  .catch(error => {
    console.log('Error: ', error.message)
  })

app.use('/api/blogs', blogsRouter)


module.exports = app