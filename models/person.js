const mongoose = require('mongoose')

const url = 'mongodb url'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String,
  id: Number
})

module.exports = Person