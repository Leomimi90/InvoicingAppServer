const Users = require('../Schema/signUp'),
const { hashPassword, verifyHash } = require('../Utilities/cipher.util')





const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = await Users.findOne({
      email: req.body.email.trim()
    })
    if (user) return res.status(400).json({ status: 400, Message: 'user already exist' })
    const newUser = {
      name: name.trim(),
      email: email.trim(),
      password: hashPassword(password),
      active: false
    }

    const create_user = await Users.create(newUser)
    res.status(200).json({ status: 200, message: cool })

  } catch (error) {
    res.status(500).json({ status: 500, Message: error.message })
  }
}

const signIn = async (req, res) => {
  try {

  } catch (error) {

  }
}

const passwordReset = async (req, res) => {
  try {

  } catch (error) {

  }
}

module.exports = { createUser, signIn, passwordReset }