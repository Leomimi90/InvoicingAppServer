
const { createUser, signIn } = require('../Controllers/authConroller')
const { signUpValidator, signInValidator, forgotpasswordValidatror } = require('../Middleware/validation.js')


const Routes = require('express').Router()
Routes.get('/', (req, res) => {
  res.status(200).json({ status: 200, message: 'InvoicingAppServer is Active' })
})

Routes.post('/signUp', [signUpValidator], createUser)
Routes.post('/signIn', [signInValidator], signIn)
Routes.post('/passwordReset', [forgotpasswordValidatror], passwordReset)

module.exports = Routes