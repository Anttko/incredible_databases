const express = require('express')
require('express-async-errors')
const http = require('http')

const { PORT } = require('./util/config')

const { connectToDatabase } = require('./util/db')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorRouter = require('./controllers/authors')
const readinglistsRouter = require('./controllers/readinglists')
const { errorHandler, unknownEndpoint } = require('./util/middleware')

const logger = require('./util/logger')
const app = express()
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorRouter)
app.use('/api/readinglist', readinglistsRouter)

connectToDatabase()
const server = http.createServer(app)

app.use(unknownEndpoint)
app.use(errorHandler)

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
