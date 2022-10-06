const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Readinglist })
Blog.belongsToMany(User, { through: Readinglist })

// Super Many-to-Many relationship for better nested queries
User.hasMany(Readinglist)
Readinglist.belongsTo(User)
Blog.hasMany(Readinglist)
Readinglist.belongsTo(Blog)

// Session
Session.belongsTo(User)

module.exports = {
  Blog,
  User,
  Readinglist,
  Session
}
