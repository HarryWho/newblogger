const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User'
  },
  school: String,
  level: String,
  qualifications: [{
    qaulification: [{ type: String, trim: true }]
  }],
  skills: [{
    skill: [{ type: String, trim: true }]
  }],
  about: String

})

module.exports = mongoose.model('Profile', ProfileSchema)