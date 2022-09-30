const router = require('express').Router()
const bcrypt = require('bcrypt')

const { User, Blog, Readinglist } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['id', 'password'] },

    include: [
      { model: Blog, attributes: { exclude: ['userId'] } },
      {
        model: Readinglist,
        attributes: ['id'],
      },
    ],
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const body = req.body

  const saltRounds = 10
  const password = await bcrypt.hash(body.password, saltRounds)

  const user = await User.create({
    username: body.username,
    name: body.name,
    password,
  })
  res.json(user)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Blog,
        as: 'read',
        attributes: { exclude: ['userId'] },
        through: {
          attributes: [],
        },
        include: {
          model: Readinglist,
          attributes: {
            exclude: ['userId', 'blogId'],
          },
        },
      },
    ],
  })
  if (user) {
    res.json(user)
  }
})

router.put('/:username', async (req, res) => {
  console.log(req.body)
  const body = req.body

  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
    attributes: { exclude: ['password'] },
  })

  if (user) {
    user.username = body.username
    await user.save()
  }
  return res.json({ user })
})

module.exports = router
