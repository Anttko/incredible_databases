const router = require('express').Router()
const { tokenExtractor } = require('../util/middleware')
const { Blog, User, Readinglist } = require('../models')
const { Op, Sequelize } = require('sequelize')

router.get('/', async (req, res) => {
  const readinglist = await Readinglist.findAll({})
  res.json(readinglist)
})

router.post('/', async (req, res) => {
  const { blogId, userId } = req.body

  const addToReadingList = await Readinglist.create({ blogId, userId })
  res.json(addToReadingList)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const id = req.params.id
  const { read } = req.body
  /*select * from readinglist where id = params.id and userId = req.decodedToken.id */
  const readingListFinder = await Readinglist.findOne({
    where: {
      [Op.and]: [{ id: id }, { userId: req.decodedToken.id }],
    },
  })

  if (readingListFinder.userId === req.decodedToken.id) {
    const userReadBlog = await readingListFinder.update({ read })

    res.json({ read: userReadBlog.read })
  }
  res.status(404).end()
})

module.exports = router
