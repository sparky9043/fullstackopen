const mongoose = require('mongoose');
const configs = require('./utils/configs')
const express = require('express')
const app = express()
const blogsRouter = require('./controller/blogs')
const logger = require('./utils/logger')

app.use(express.json())

mongoose.set('strictQuery', false)

mongoose.connect(configs.MONGODB_URI)
  .then(() => {
    logger.info('connecting to MongoDB')
  })
  .catch(error => {
    logger.error('Error: ', error.message)
  })

app.use('/api/blogs', blogsRouter)


module.exports = app