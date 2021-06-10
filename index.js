const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')





// Middleware
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

// Error handling
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if(error.name === 'ValidationError'){
        return response.status(400).json({ error: error.message })
    }
  
    next(error)
}

app.use(errorHandler)
app.get('/', (req, res) => {
    res.send('Hello world')
})

// Get All Persons

app.get('/api/persons', (req, res) => {
    Person.find({}).then(people=> {
        res.json(people)
    })
    
})

// Get individual person

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findById(id)
        .then(person => res.json(person))
        .catch(error => next(error))
    
})

// Delete Person

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    console.log(id)
    Person.findByIdAndRemove(id)
        .then(result => {
            console.log(result)
            res.status(204).end()
        })
        .catch(error => next(error))
})


app.post('/api/persons', (req, res, next) => {
    const {name, number} = req.body

    if(!name || !number) {
        return res.status(400).json({
            error: 'Content missing'
        })

    }

    const person = new Person({
        name,
        number   
    })
    
    person.save()
        .then(res.json(person))
        .catch(error => next(error))
    
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
        .catch(error => next(error))
})

app.get('/info', (req, res) => {
    const date = new Date(Date.now())
    Person.find({})
        .then(people => res.send(`<p>Phonebook has info for ${people.length} people</p> <p>${date}</p>`))
    
})



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})