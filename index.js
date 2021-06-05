const express = require('express')
const app = express()
const PORT = 3001

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

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        res.send(person)
    } else {
        res.status(404).end()
    }
    
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.get('/info', (req, res) => {
    const date = new Date(Date.now())
    res.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`)
})



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})