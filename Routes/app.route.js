
const { createUser, signIn, activateUserAccount, resendVerificationCode } = require('../Controllers/authConroller')
const { signUpValidator, signInValidator, forgotpasswordValidatror } = require('../Middleware/validation')
const { authToken } = require('../Middleware/authToken')
const { createInvoice, updateInvoice, deleteInvoice, getAllInvoices } = require('../Controllers/invoices')
const { events, updateEvents, deleteEvent, getAllEvent } = require('../Controllers/event')

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
Routes.put('/updateInvoice/:id'[authToken], updateInvoice)
Routes.delete('/deleteInvoice/:id', [authToken], deleteInvoice)
Routes.get('/allInvoices', getAllInvoices)

Routes.post('/createEvent', [authToken], events)
Routes.put('/updateEvent/:id', [authToken], updateEvents)
Routes.delete('/deleteEvent/:id', [authToken], deleteEvent)
Routes.get('/getEvents', getAllEvent)


module.exports = Routes