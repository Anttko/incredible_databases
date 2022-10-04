const router = require('express').Router()
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const { User, Blog, Readinglist } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
    include: { model: Blog },
  })
  res.json(users)
})

/* 
 attributes: { exclude: ['id', 'password'] },

    include: [{ model: Blog, attributes: { exclude: ['userId'] } }],

*/

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
  let where = {}

  if (req.query.read) {
    where = {
      readinglist: {
        read: { [Op.eq]: req.query.read },
      },
    }
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId'], 
        
      },
        
      },

    ],
    where,
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
