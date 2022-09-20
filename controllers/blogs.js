const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const blogs = await Blog.create(req.body)
  return res.json(blogs)
})

router.get('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

router.put('/:id', async (req, res) => {
  Blog.findByPk(1).then(blog => {
    return blog.increment('likes', {by: 1},)
  }).then(returnedBlog => {
    res.json({likes: returnedBlog.likes})
      })

  })
router.delete('/:id', async (req, res) => {
  await Blog.findByPk(req.params.id).destroy()
  res.status(404).end()
})

module.exports = router
