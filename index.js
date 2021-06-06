const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const morgan = require('morgan')
const cors = require('cors')

let persons = [
    {
        id: 1,
        name: 'Jon Smith',
        number: "817-879-0614"
    },
    {
        id: 2,
        name: 'Reagann Smith',
        number: "817-905-4265"
    },
    {
        id: 3,
        name: 'BlueBelle',
        number: "817-879-0614"
    },
    {
        id: 4,
        name: 'Emergency Contact',
        number: "911"
    },
]



app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

app.get('/', (req, res) => {
    res.send('Hello world')
})

// Get All Persons

app.get('/api/persons', (req, res) => {
    res.json(persons)
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

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
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

    if(persons.find(person => person.name === name)){
        return res.status(400).json({
            error : "Name must be unique"
        })
    }

    const person = {
        name,
        number,
        id: generateId()
    }

    persons = persons.concat(person)
    res.json(person)
})

app.get('/info', (req, res) => {
    const date = new Date(Date.now())
    res.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`)
})



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})