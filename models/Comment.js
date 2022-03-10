const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story'
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Comment', CommentSchema)