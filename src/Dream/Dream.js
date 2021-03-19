const mongoose = require('mongoose')
const moment = require('moment')

let dreamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
    createdDate: {
    type: Date,
    default: ()=> moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
  },
  dreamType: {
    type: String,
    enum: ['happy', 'sad', 'exciting', 'scary'],
    required: true
  }
})
mongoose.model('Dream', dreamSchema);

module.exports = mongoose.model('Dream');