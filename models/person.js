require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGO_URI

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
    
})



module.exports = mongoose.model('Person', personSchema)

