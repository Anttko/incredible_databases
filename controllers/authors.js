const router = require('express').Router()
const { tokenExtractor } = require('../util/middleware')
const { Blog, User } = require('../models')
const { Op, Sequelize } = require('sequelize')

/*
SQL query planning:
find all blogs group by author
count likes 
*/

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: [
      [Sequelize.col('author'), 'author'], 
      [Sequelize.fn('SUM', Sequelize.col('likes')), 'likes'],
      [Sequelize.fn('COUNT', Sequelize.col('author')), 'blogs'],
    ],
    group: Sequelize.col('author', ),
    order: [['likes', 'DESC']],
  })

  res.json(blogs)
})
module.exports = router
