require('dotenv').config()
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGO_URI

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: true,
      minlength: 3
    },
    number: {
      type: String,
      minlength: 8,
      required: true
    }
    
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })


module.exports = mongoose.model('Person', personSchema)

