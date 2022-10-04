const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Readinglist })
Blog.belongsToMany(User, { through: Readinglist })

/*
// Super Many-to-Many relationship
User.hasMany(Readinglist)
Readinglist.belongsTo(User)
Blog.hasMany(Readinglist)
Readinglist.belongsTo(Readinglist)
*/


module.exports = {
  Blog,
  User,
  Readinglist,
}
