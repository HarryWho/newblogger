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
  email: String,
  joined: {
    type: Date,
    default: Date.now
  },
  password: String
});

module.exports = mongoose.model('User', UserSchema);