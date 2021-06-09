const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const { response } = require('express')

// Error handling
const errorHandler = (err, req, res, next) => {
    console.error(err.message)
  
    if (err.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    } 
  
    next(err)
  }


// Middleware
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))
app.use(errorHandler)

app.get('/', (req, res) => {
    res.send('Hello world')
})

// Get All Persons

app.get('/api/persons', (req, res) => {
    const people = Person.find({}).then(people=> {
        res.json(people)
    })
    
})

// Get individual person

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        res.send(person)
    } else {
        res.status(404).end()
    }
    
})

// Delete Person

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    console.log(id)
    Person.findByIdAndRemove(id)
          .then(result => {
              res.status(204).end()
          })
          .catch(err => next(err))
})

// Generate ID and add person

const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0

    return maxId + 1
}

app.post('/api/persons', (req, res) => {
    const {name, number} = req.body

    if(!name || !number) {
        return res.status(400).json({
            error: "Content missing"
        })

    }

    const person = new Person({
        name,
        number   
    })
    
    person.save()
    res.json(person)
})

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    const { name, number} = req.body
    const person = {
        name,
        number
    }
    
    Person.findByIdAndUpdate(id, person, {new:true})
          .then(updatedPerson => {
              res.json(updatedPerson)
          })
          .catch(err => next(err))
})

app.get('/info', (req, res) => {
    const date = new Date(Date.now())
    res.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`)
})



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})