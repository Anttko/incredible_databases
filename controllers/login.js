const jwt = require('jsonwebtoken')
const router = require('express').Router()
const bcrypt = require('bcrypt')

const { SECRET } = require('../util/config')
const User = require('../models/user')
const Session = require('../models/session')

const { tokenExtractor, checkUserSessionToken } = require('../util/middleware')

router.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({
    where: {
      username: username,
    },
  })
  if (user.disabled === true) {
    return response.status(404).json({error: 'your account has been disabled !'})
  }

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password)
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }
  const userForToken = {
    username: user.username,
    id: user.id,
  }
  const token = jwt.sign(userForToken, SECRET)

  await Session.findOrCreate({
    where: { userId: user.id },
    token: token,
    defaults: { userId: user.id, token: token },
  })

  response.status(200).send({ token, username: user.username, name: user.name })
})

router.delete('/', tokenExtractor, checkUserSessionToken, async (req, res) => {
  const userId = req.decodedToken.id
  await Session.destroy({ where: { userId } })
  res.status(200).send()
})

module.exports = router
