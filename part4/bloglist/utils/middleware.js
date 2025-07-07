const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)

  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === "CastError") {
    response.status(400).json({ error: "Malformatted id" })
  } else if (error.name === "ValidationError") {
    response.status(404).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E110000 duplicate key error')) {
    return response.status(400).json({
      error: 'expected `username` to be unique'
    })
  } else if (error.name === 'JsonWebTokenError') {
    response.status(401).json({
      error: 'token invalid'
    })
  } else if (error.name === 'TokenExpiredError') {
    response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

module.exports = { requestLogger, errorHandler }