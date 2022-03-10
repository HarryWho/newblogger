const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  firstName: String,
  lastName: String,
  image: String
});

module.exports = mongoose.model('User', UserSchema);