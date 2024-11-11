const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
const cors = require('cors')

const { DBuri, port } = require('./config/enviroment')
const errorHandler = require('./lib/errorHandler')


const app = express()

mongoose.connect(DBuri,
  { useNewUrlParser: true, useUnifiedTopology: true }
  , () => console.log('Mongo is connected'))



app.use(bodyParser.json())

app.use((req, resp, next) => {
  console.log(`${req.method} to ${req.url}`)
  next()
})

app.use(cors())
// this function allows you to basically access it from anywere so can run locally

//------

app.use('/api', router)

app.use(errorHandler)

app.listen(port, () => console.log(`we are good to go on port ${port}`))