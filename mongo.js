const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('Please provide your Database password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://aardvarkjon:${password}@devconnector.21456.mongodb.net/helsinkiContacts?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
    
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

if(person.name && person.number){
 person.save().then(result => {
     console.log(`added ${person.name} ${person.number} to phonebook`)
     mongoose.connection.close()
 })
} else {
    Person.find({})
          .then(persons => {
              console.log("phonebook")
              persons.map(person => {
                console.log(`${person.name} ${person.number}`)
              })
              mongoose.connection.close()
          })
}