const router = require('express').Router()
const { tokenExtractor } = require('../util/middleware')
const { Blog, User } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: { model: User, attributes: ['name'] },
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
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


  
  await req.blog.destroy()
  res.status(404).end()
})
module.exports = router
