const { check } = require('express-validator')


const signUpValidator = [
  check('name', 'Name is not correct').trim().isLength({
    min: 3
  }).custom(val => /^([a-zA-Z]{3,})+\s+[a-zA-Z]{3,}$/i.test(val)).bail(),
  check('email', 'Invalid Email').trim().isEmail().bail(),
  check('password', 'Incorrect password').custom(val => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test()).bail(),
  check('confirmPassword', 'Password Mismatch').custom((val, { req }) => val === req.body.password)
]

const signInValidator = [
  check('email', 'Invalid Email').trim().isEmail().bail(),
  check('password', 'Incorrect password').custom(val => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test())
]


const forgotpasswordValidatror = [
  check('resetPassword').custom(val => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const phoneRegex = /^(\+237)(2|6)[0-9]{8,15}$/

    if (emailRegex.test(val) || phoneRegex.test(val)) {

      return val

    }
  })
]

module.exports = { signUpValidator, signInValidator, forgotpasswordValidatror }