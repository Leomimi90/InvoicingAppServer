
const { createUser, signIn, activateUserAccount, resendVerificationCode } = require('../Controllers/authConroller')
const { signUpValidator, signInValidator, forgotpasswordValidatror } = require('../Middleware/validation')
const { authToken } = require('../Middleware/authToken')
const { createInvoice } = require('../Controllers/invoices')

const Routes = require('express').Router()
Routes.get('/', (req, res) => {
  res.status(200).json({ status: 200, message: 'InvoicingAppServer is Active' })
})

Routes.post('/signUp', [signUpValidator], createUser)
Routes.post('/signIn', [signInValidator], signIn)
Routes.post('/activate', activateUserAccount)
// Routes.post('/passwordReset', [forgotpasswordValidatror], passwordReset)
Routes.post('/resendCode', resendVerificationCode)


Routes.post('/createInvoice', [authToken], createInvoice)
module.exports = Routes