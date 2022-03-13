const mongoose = require('mongoose')

const TrackerSchema = new mongoose.Schema({
  balance: {
    type: Number,
    get: v => (v / 100).toFixed(2),
    set: v => v * 100
  },
  debit: {
    type: Number,
    get: v => (v / 100).toFixed(2),
    set: v => v * 100
  },
  credit: {
    type: Number,
    get: v => (v / 100).toFixed(2),
    set: v => v * 100
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  record: {
    type: Number,
    required: true
  }
}, {
  toJSON: { getters: true }
})

module.exports = mongoose.model('Tracker', TrackerSchema)