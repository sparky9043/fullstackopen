require('dotenv').config()
const app = require('./app')
const configs = require('./utils/configs')
const logger = require('./utils/logger')

const PORT = configs.PORT

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})