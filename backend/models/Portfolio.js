const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const coinSchema = new mongoose.Schema({
  coin_name: ({ type: String, required: true }),
  coin_id: ({ type: String }),
  number: ({ type: String, required: true })
})

const portfolioSchema = new mongoose.Schema({
  portfolioname: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  coins: [ coinSchema ]

},
{
  timestamps: true
})

coinSchema.plugin(uniqueValidator)
portfolioSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Portfolio', portfolioSchema)