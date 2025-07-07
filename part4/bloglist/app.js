require('express-async-errors')
const mongoose = require('mongoose');
const configs = require('./utils/configs')
const express = require('express')
const app = express()
const blogsRouter = require('./controller/blogs')
const usersRouter = require('./controller/users')
const loginRouter = require('./controller/login')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)

mongoose.connect(configs.MONGODB_URI)
  .then(() => {
    logger.info('connecting to MongoDB')
  })
  .catch(error => {
    logger.error('Error: ', error.message)
  })

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.requestLogger)
app.use(middleware.errorHandler)

module.exports = app