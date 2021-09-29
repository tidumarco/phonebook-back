const mongoose = require('mongoose')

const url = 'mongodb+srv://fullstack:ostracismo@cluster0.wlya4.mongodb.net/phonebook'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String,
  id: Number
})

module.exports = Person