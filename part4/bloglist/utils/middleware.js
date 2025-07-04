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
  }

  next(error)
}

module.exports = { requestLogger, errorHandler }