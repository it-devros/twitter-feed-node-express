
module.exports = function(app) {
  const home = require('./home')

  app.use('/', home)
}