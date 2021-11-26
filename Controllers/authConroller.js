const SignedUpUser = require('../Schema/signUp')
const SignedInUser = require('../Schema/signIn')
const { sendEmail } = require('../Utilities/mailer')
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
      verificationCode: Math.round(Math.random() * 1000000).toString(),
      active: false
    }

    // send user confirmation code 
    await sendEmail(newUser.email, `Account Activation`, `
    <h2>
    Your Verification Code for your account
    <strong>
    ${newUser.verificationCode}
    </strong>
    </h2>
    <br>
    <p>
    Please Enter the verification code on our application to get Started
    In our app.
    </p>
    `)

    const create_user = await SignedUpUser.create(newUser)

    res.status(200).json({ status: 200, message: create_user })

  } catch (error) {
    // console.log('wahala dey');
    res.status(500).json({ status: 500, message: error.message })
  }
}

const signIn = async (req, res) => {
  user
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
      await sendEmail(signIn.email, `Sign In`, `
      <h3>Sign In from a new device ${signIn.user_agent}</h3>
      `)
      res.status(200).json({ status: 200, message: token })
    } else {
      res.status(200).json({ status: 200, message: token })
    }

  } catch (error) {
    res.status(500).json({ status: 500, message: error.message })
  }
}

// const passwordReset = async (req, res) => {
//   try {

//   } catch (error) {

//   }
// }

const activateUserAccount = async (req, res) => {
  try {
    const { email, verificationCode } = req.body
    const user = await SignedUpUser.findOne({ email: email.trim(), verificationCode: verificationCode })
    const token = signAccessToken(user._id)

    if (!user) return res.status(400).json({ status: 400, message: 'Verification code not correct' })
    // token
    await SignedUpUser.updateOne({ $where: user }, { $set: { active: true } })

    res.status(200).json({ status: 200, message: token })

  } catch (error) {
    res.status(500).json({ status: 500, message: error.message })

  }
}

const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body
    const user = await SignedUpUser.findOne({ email: email.trim() })
    // send user confirmation code 
    await sendEmail(email.trim(), `Account Activation`, `
    <h2>
    Your Verification Code for your account
    <strong>
    ${user.verificationCode.toString()}
    </strong>
    </h2>
    <br>
    <p>
    Please Enter the verification code on our application to get Started
    In our app.
    </p>
    `)

    res.status(200).json({ status: 200, message: 'Sent' })
  } catch (error) {

  }
}

module.exports = { createUser, signIn, activateUserAccount, resendVerificationCode }
