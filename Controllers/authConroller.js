const SignedUpUser = require('../Schema/SignedUpUser')
const SignedInUser = require('../Schema/SignedInUser')
const { hashPassword, verifyHash } = require('../Utilities/cipher.util')
const { signAccessToken, signRefreshToken } = require('../Middleware/authToken')


const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const user = await SignedUpUser.findOne({
      email: email.trim()
    })

    if (user) return res.status(400).json({ status: 400, Message: 'user already exist' })

    const newUser = {
      name: name.trim(),
      email: email.trim(),
      password: hashPassword(password),
      verificationCode: Math.round(Math.random() * 100000).toString(),
      active: false
    }

    // send user confirmation code 

    const create_user = await SignedUpUser.create(newUser)

    res.status(200).json({ status: 200, message: `cool` })

  } catch (error) {
    res.status(500).json({ status: 500, message: error.message })
  }
}

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await SignedUpUser.findOne({
      email: email.trim(),

    })

    const hashPassword = verifyHash(
      password, user.password
    )

    if (!user) return res.status(400).json({ status: 400, message: 'Acount does not exist' })

    if (!user && !hashPassword) return res.status(400).json({ status: 400, message: 'Invalid Email or passwor' })

    if (!user.active) return res.status(400).json({ status: 400, message: 'Please activate your account' })

    const signedIn = await SignedInUser.find({ _id: user._id })

    const { user_agent } = signedIn[signedIn.length - 1]

    let signIn = {
      user_id: user._id,
      email: user.email,
      user_agent: req.headers['user.agent']
    }

    const createUser = await SignedInUser.create(signIn)
    const token = signRefreshToken(user._id)

    if (user_agent != req.headers[user_agent]) {

      // 'You are logged in from a different device'
      res.status(200).json({ status: 200, message: token })
    } else {
      res.status(200).json({ status: 200, message: token })
    }

  } catch (error) {
    res.status(500).json({ status: 500, message: error.message })
  }
}

const passwordReset = async (req, res) => {
  try {

  } catch (error) {

  }
}

const activateUserAccount = async (req, res) => {
  try {
    const { email, verificationCode } = req.body
    const user = await SignedUpUser.findOne({ email: email.trim(), verificationCode: verificationCode })
    const token = signAccessToken(user._id)

    if (!user) return res.status(400).json({ status: 400, message: 'Verification code not correct' })
    // token
    await SignedUpUser.update({ $where: user }, { $set: { active: true } })

    res.status(200).json({ status: 200, message: token })

  } catch (error) {
    res.status(500).json({ status: 500, message: error.message })

  }
}
module.exports = { createUser, signIn, passwordReset, activateUserAccount }
