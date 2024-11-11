const port = 8000
const DBPrefix = 'mongodb://localhost/'
const dbname = 'coin-project'
const secret = 'This is a secret coin sting 12//$$$///$$$89'


const DBuri = `${DBPrefix}${dbname}`

module.exports = {
  port,
  DBuri,
  secret
}