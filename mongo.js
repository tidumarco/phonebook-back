const mongoose = require('mongoose')

// Replace with the URL of your own database. Do not store the password on GitLab!
const url = 'mongodb+srv://fullstack:ostracismo@cluster0.wlya4.mongodb.net/phonebook'


mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String,
  id: Number
})

const person = new Person({
    name: "Marco Tidu",
    number: "0185-312310",
    id: 1
})

// Person
//   .find({})
//   .then(result => {
//     result.forEach(person => {
//       console.log(person)
//     })
//     mongoose.connection.close()
//   })

person
  .save()
  .then(response => {
    console.log('person saved!')
    mongoose.connection.close()
  })