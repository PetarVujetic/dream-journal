const mongoose = require('mongoose')

let dreamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
    createdDate: {
    type: Date,
    default: Date.now()
  },
  dreamType: {
    type: String,
    enum: ['happy', 'sad', 'exciting', 'scary'],
    required: true
  }
})
mongoose.model('Dream', dreamSchema);

module.exports = mongoose.model('Dream');