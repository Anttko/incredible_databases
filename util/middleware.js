const logger = require('./logger')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
const errorHandler = (error, _request, response, next) => {
  console.log(error)
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'SequelizeValidationError') {
    return response.status(404).json({ error: error.message })
  } else if (error.name === 'SequelizeDatabaseError') {
    return response.status(404).json({ error: error.message })
  } else if (error.name === 'TypeError') {
    return response.status(404).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    })
  }

  next(error)
}

module.exports = {
  errorHandler,
  tokenExtractor,
  unknownEndpoint,
}
