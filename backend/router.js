
const router = require('express').Router()
const portfolios = require('./controllers/portfolios')
const users = require('./controllers/users')
// Secure route is our custom middleware
// const secureRoute = require('./lib/secureRoute')
const secureRoute = require('./lib/secureRoute')

//All these are secure Routes


router.route('/portfolio')
  .get(portfolios.index) // WORKS
  .post(secureRoute, portfolios.create)

router.route('/portfolio/:userId')
  .get(portfolios.userAll) // works

//can only get these if you are the specific user
router.route('/portfolio/single/:id')
  .get(portfolios.show) // works
  .put(portfolios.update) // works - temp taken off varification
  .delete(portfolios.remove) // works - temp taken off varification 

router.route('/portfolio/:id/coins')
  .get(portfolios.showCoins) // works
  .post(portfolios.addCoins) // works - NO WORKS



router.route('/portfolio/:id/:coinId')
  .delete(portfolios.deleteCoins) // works - taken off varification
  .put(portfolios.updateCoins) // works - taken off varification




//------USER

//No need for either of these to be secure

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

module.exports = router
