const Portfolio = require('../models/Portfolio')

function create(req, res) {
  req.body.user = req.currentUser //this links to the secure route.
  Portfolio.create(req.body)
    .then(portfolio => res.status(201).json(portfolio))
    .catch(err => res.status(400).json({ message: err }))
}

function index(req, res) {
  Portfolio
    .find()
    .populate('user') //this bascially means it also shows the object user.  Without this, its just the ID!
    .then(portfolio => res.status(200).json(portfolio))
    .catch(err => res.status(400).json({ message: err }))
}
function userAll(req, res) {
  Portfolio.find({ user: req.params.userId })
    .populate('user')
    .then(portfolios => res.status(200).json(portfolios))
    .catch(err => res.status(400).json(console.log(err)))

}

function show(req, res) {
  Portfolio.findById(req.params.id)
    .then(portfolio => {
      if (!portfolio) res.status(404).json({ message: '404 Not found' })
      else res.status(200).json(portfolio)
    })
    .catch(err => res.status(400).json({ message: err }))
}
function update(req, res) {
  Portfolio
    .findById(req.params.id)
    .then(portfolio => {
      if (!portfolio) return res.status(404).json({ message: '404 Not found' })
      // if (!req.currentUser._id.equals(portfolio.user)) return res.status(401).json({ message: 'This is not your Portfolio' })
      return portfolio.set(req.body)
    })
    .then(portfolio => portfolio.save())
    .then(portfolio => res.status(202).json(portfolio))
    .catch(err => res.status(400).json({ message: err }))
}

function remove(req, res) {
  Portfolio
    .findById(req.params.id)
    .then(portfolio => {
      if (!portfolio) return res.status(404).json({ message: 'Not Found' })
      // if (!req.currentUser._id.equals(portfolio.user)) return res.status(401).json({ message: 'This is not your Portfolio' })
      return portfolio.remove()
    })
    .then(() => res.status(200).json({ message: 'Portfolio deleted' }))
    .catch(err => res.status(400).json({ message: err }))
}
function showCoins(req, res) {
  Portfolio.findById(req.params.id)
    .then(portfolio => {
      if (!portfolio) res.status(404).json({ message: '404 Not found' })
      else res.status(200).json(portfolio.coins)
    })
    .catch(err => res.status(400).json({ message: err }))
}

//with this function, need to see if the coin is unique! 
// or does the is unique function deal with this??


function addCoins(req, res) {
  // req.body.user = req.currentUser
  Portfolio
    .findById(req.params.id)
    .then(portfolio => {
      if (!portfolio) return res.status(404).json({ message: 'Not Found' })
      portfolio.coins.push(req.body)
      return portfolio.save()
    })
    .then(portfolio => res.status(201).json(portfolio))
    .catch(err => console.log(err))
}

function deleteCoins(req, res) {
  Portfolio
    .findById(req.params.id)
    .then(portfolio => {
      if (!portfolio) return res.status(404).json({ message: 'Not Found' })
      const coin = portfolio.coins.id(req.params.coinId)
      coin.remove()
      return portfolio.save()
    })
    .then(portfolio => res.status(200).json(portfolio))
    .catch(err => res.status(404).json({ message: err }))
}
function updateCoins(req, res) {
  Portfolio
    .findById(req.params.id)
    .then(portfolio => {
      if (!portfolio) return res.status(404).json({ message: 'Not Found' })
      // if (!req.currentUser._id.equals(portfolio.user)) return res.status(401).json({ message: 'This is not your Portfolio' })
      const coin = portfolio.coins.id(req.params.coinId)
      coin.set(req.body)
      return portfolio.save()
    })
    .then(portfolio => res.status(200).json(portfolio))
    .catch(err => res.status(404).json({ message: err }))
}



module.exports = {
  create,
  index,
  show,
  update,
  remove,
  showCoins,
  addCoins,
  updateCoins,
  deleteCoins,
  userAll
}