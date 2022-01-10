require('express-async-errors')
const express = require('express')
const compression = require('compression')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')

const { connectToDatabase } = require('./config/db')

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  process.exit(1)
})

// Connect to postgres database
connectToDatabase()

const app = express()

//Import route files
const actor = require('./routes/actor')
const movie = require('./routes/movie')

// MIDDLEWARES
// Not found middlevare
const notFound = require('./middlewares/notFoundRoute')

// Database errors middlevare
const errorHandler = require('./middlewares/errorDbHandler')

// Body parser
app.use(express.json())

// Compress all HTTP responses
app.use(compression())

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Enable CORS
app.use(cors())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/v1/actors', actor)
app.use('/api/v1/movies', movie)

// Not found route
app.use(notFound)

// Custom database errors
app.use(errorHandler)

module.exports = app
