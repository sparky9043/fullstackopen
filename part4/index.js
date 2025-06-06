require('dotenv').config()
const app = require('./app')
const configs = require('./utils/configs')

const PORT = configs.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})