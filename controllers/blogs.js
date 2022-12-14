const router = require('express').Router()
const { tokenExtractor, checkUserSessionToken } = require('../util/middleware')
const { Blog, User } = require('../models')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        { title: { [Op.iLike]: `${req.query.search}%` } },
        { author: { [Op.iLike]: `${req.query.search}%` } },
      ],
    }
  }

  const blogs = await Blog.findAll({
    order: [['likes', 'DESC']],
    attributes: { exclude: ['userId'] },
    include: { model: User, attributes: ['name'] },
    where,
  })
  res.json(blogs)
})

router.post('/', tokenExtractor,  checkUserSessionToken, async (req, res) => {
  const body = req.body
  const user = await User.findByPk(req.decodedToken.id)

  const blogs = await Blog.create({
    ...body,
    userId: user.id,
    date: new Date(),
  })

  return res.json(blogs)
})

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/:id', blogFinder, async (req, res) => {
  return res.json(req.blog)
})

router.put('/:id', blogFinder, async (req, res) => {
  const likedBlog = await req.blog.increment('likes', { by: 1 })
  res.json({ likes: likedBlog.likes })
})
router.delete('/:id', blogFinder, async (req, res) => {
  const body = req.body
  if (body.blog && body.decodedToken.id === body.blog.userId) {
    await req.blog.destroy()
  }
  res.status(404).end()
})
module.exports = router
