

//firstname, lastname, email, password, password confirmation

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')

// const coinSchema = new mongoose.Schema({
//   coin_name: ({ type: String, required: true, unique: true }),
//   coin_id: ({ type: String, required: true }),
//   number: ({ type: String, required: true })
// })

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
  // portfolio: [ coinSchema ]
}, {
  timestamps: true
  // toJSON: {
  //   transform(doc, json) {
  //     return { name: json.firstname }
  //   }
  // }
})
//returns first name opposed to ID

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

//creates a virtual pw confirmation field


userSchema
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      this.invalidate('password confirmation', 'does not match passsword')
    }
    next()
  })

//basically - make sure that PW and PW confirmation matches, even if modified

userSchema
  .pre('save', function hasPassword(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

// saves new password if modified

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}
//function that validates password


userSchema.plugin(uniqueValidator)
// coinSchema.plugin(uniqueValidator)



module.exports = mongoose.model('User', userSchema)