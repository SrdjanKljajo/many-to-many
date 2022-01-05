require('express-async-errors')
const dotenv = require('dotenv')
const express = require('express')
const compression = require('compression')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const { connectToDatabase } = require('./config/db')

dotenv.config({ path: './config/.env' })

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

const PORT = process.env.PORT || 5000

app.listen(PORT, async () => {
  console.log(`Server run on ${process.env.NODE_ENV} mode, on port ${PORT}`)
})
