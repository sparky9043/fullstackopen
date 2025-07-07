const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    unique: true
  },
  name: String,
  passwordHash: {
    required: true,
    unique: true
  }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)