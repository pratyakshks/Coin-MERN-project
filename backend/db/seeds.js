// This seeds.js is really a self contained program we can run with
// a script we defined in package.json: `npm run seed`

// It's job is to give our db a bunch of data before we start developing
// It connects to mongoose, inserts data, then closes the connection.
const mongoose = require('mongoose')
const { DBuri } = require('../config/enviroment')
const Portfolio = require('../models/Portfolio')
const User = require('../models/User')

mongoose.connect(
  DBuri,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, db) => {
    if (err) return console.log(err)
    db.dropDatabase()
      .then(() => {
        return User.create([
          {
            firstname: 'Pratyaksh',
            surname: 'Kumar Singh',
            email: 'pratyakshsk12@gmail.com',
            password: '123',
            passwordConfirmation: '123'

          }
        ])
      })
      .then((users) => {
        // Insert data
        return Portfolio.create([
          {
            portfolioname: 'test1',
            user: users[0]
            
          },
          {
            portfolioname: 'test2',
            user: users[0]
            
          },
          {
            portfolioname: 'test3',
            user: users[0]
            
          }
          
        ]
        )
      })
      .then(portfolios => console.log(`${portfolios.length} Portfolios created`))
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  }
)