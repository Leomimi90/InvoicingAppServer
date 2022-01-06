const { verify, sign } = require('jsonwebtoken')
const { resolve } = require('path')
const { readFileSync } = require('fs')
require('dotenv').config()

const PRIVATE_KEY = readFileSync(resolve(__dirname + `/../Environment/priv.pem`), 'utf8')
const PUBLIC_KEY = readFileSync(resolve(__dirname + `/../Environment/pub.pem`), 'utf8')

const signToken = async (_id, exp) => {

  try {

    const payload = {
      sub: _id,
      iat: Date.now()
    }

    const signedToken = sign(payload, PRIVATE_KEY, { expiresIn: exp, algorithm: 'RS256' })
    return {
      token: "Bearer " + signedToken,
      expiresIn: exp,
      iat: Date.now()
    }
  } catch (error) {
    return error
  }
}

const signAccessToken = (_id) => signToken(_id, 3600)
const signRefreshToken = (_id) => signToken(_id, 300)

const authToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split('')[1]

    if (!token) return res.status(401).json({ status: 401, message: 'Invalid Request' })
    verify(token, PUBLIC_KEY, { algorithms: 'RS256', ignoreExpiration: false }, (err, user) => {
      if (err) {
        return res.status(401).json({ status: 401, message: err })
      }
      const { sub } = user
      if (!sub) { return res.status(500).json({ status: 500, message: 'Request header data could not be found' }) }

      const expires = timer(user.iat)
      if (expires) {
        return res.status(403).json({ status: 403, message: 'Access Denied' })
      }
      req.user = user
      next()

    })
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message })
  }
}

const timer = (iat) => {
  const now = new Date()
  const issue_at = new Date(iat);
  ((now.getHours() - issue_at.getHours()) != 0 || (now.getMinutes() - issue_at.getMinutes()) > 6) ? true : false

}


module.exports = { signRefreshToken, signAccessToken, authToken, timer }

