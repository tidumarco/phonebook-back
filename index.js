const express = require('express')
const app = express()
// const bodyParser = require('body-parser')
const cors = require('cors')
const { response } = require('express')
const Person = require('./models/person')


app.use(express.static('build'))

app.use(cors())

app.use(express.json())

// app.use(bodyParser.json())

let persons =  [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Martti Tienari",
    number: "040-123456",
    id: 2
  },
  {
    name: "Arto Järvinen",
    number: "040-123456",
    id: 3
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 4
  }
]

//const mongoose = require('mongoose')

//const url = 'mongodb+srv://fullstack:ostracismo@cluster0.wlya4.mongodb.net/phonebook'

//mongoose.connect(url)

// const NewPerson = mongoose.model('NewPerson', {
//   name: String,
//   number: String,
//   id: Number
// })

const formatPerson = (person) => {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

const generateId = (min, max) => {
  min = 1;
  max = 100;
  return Math.random() * (max - min) + min;
}

// CREATING NEW PERSON

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined && persons.number === undefined) {
      return response.status(404).json({error: 'content missing'})
  }
  const person = new Person ({
      name: body.name,
      number: body.number,
      id: generateId()
  })
  // persons = persons.concat(person)

  // response.json(person)

  person
    .save()
    .then(formatPerson)
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    })
    
  
  })

// app.get('/', (request, response) => {
//   response.json()
// })

// FETCHING ALL PEOPLE

app.get('/api/persons', (request, response) => {
  Person
  .find({}, {__v: 0})
  .then(persons => {
    response.json(persons.map(formatPerson))
  })
})

// FETCHING ONE PERSON BY ID

app.get('/api/persons/:id', (request, response) => {
  Person
    .findById(request.params.id)
    .then(name => {
      if (note) {
        response.json(formatPerson(name))
      } else {
        response.status(404).end()
      }
      
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: "malformatted entry"})
    })
})  

// DELETING ONE PERSON

app.delete('/api/persons/:id', (request, response) => {
  Person
  .findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => {
    response.status(400).send({ error: "malformatted entry" })
  })
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})