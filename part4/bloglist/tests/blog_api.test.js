const { test, after } = require('node:test')
const mongoose = require('mongoose')

after(async() => {
  await mongoose.connection.close()
})