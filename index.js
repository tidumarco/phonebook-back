const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(express.static('build'))

app.use(cors())

app.use(express.json())

app.use(bodyParser.json())

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

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined && persons.number === undefined) {
      return response.status(404).json({error: 'content missing'})
  }
  const person = {
      name: body.name,
      number: body.number,
      id: generateId()
  }

  // if (persons.some(body)) {
  //   return response.status(500).json({error: 'name or number already existing'})
  // }
  

  response.json(person)
  
  })

app.get('/', (request, response) => {
  response.json()
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if ( person ) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})  

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    person = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = (min, max) => {
    min = 1;
    max = 100;
    return Math.random() * (max - min) + min;
}
    


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})