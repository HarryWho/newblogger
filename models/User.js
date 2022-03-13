const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  firstName: String,
  lastName: String,
  image: {
    type: String,
    default: '/img/user.webp'
  },
  password: String,
  salt: String
});

module.exports = mongoose.model('User', UserSchema);