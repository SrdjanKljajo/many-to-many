import express from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import compression from 'compression'
import cors from 'cors'

dotenv.config({ path: './config/.env' })
import { connectToDatabase } from './config/db'

// Connect to postgres database
connectToDatabase()
const app = express()

//Import route files
import actor from './routes/actor'
import movie from './routes/movie'

// MIDDLEWARES
// Not found middlevare
import notFound from './middlewares/notFoundRoute'

// Database errors middlevare
import errorHandler from './middlewares/errorDbHandler'

app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Compress all HTTP responses
app.use(compression())

app.use(express.json())

// Static folder
app.use(express.static(`${__dirname}/public`))

// import rutes
app.use('/api/v1/actors', actor)
app.use('/api/v1/movies', movie)

// Not found route
app.use(notFound)

// Custom database errors
app.use(errorHandler)

const PORT = process.env.PORT || 5000

// Start the server
app.listen(PORT, () => {
  console.log(`Server run on ${process.env.NODE_ENV} mode, on port ${PORT}`)
})
