
const { createUser, signIn, activateUserAccount } = require('../Controllers/authConroller')
const { signUpValidator, signInValidator, forgotpasswordValidatror } = require('../Middleware/validation')
const { signRefreshToken, signAccessToken, authToken, timer } = require('../Middleware/authToken')


const Routes = require('express').Router()
Routes.get('/', (req, res) => {
  res.status(200).json({ status: 200, message: 'InvoicingAppServer is Active' })
})

Routes.post('/signUp', [signUpValidator], createUser)
Routes.post('/signIn', [signInValidator], signIn)
Routes.post('/activate', activateUserAccount)
// Routes.post('/passwordReset', [forgotpasswordValidatror], passwordReset)

module.exports = Routes