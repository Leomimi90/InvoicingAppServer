const { Schema, model } = require('mongoose')

const SignedUpUser = new Schema({
  name: {
    type: String,
    required: [true, 'this field is required']
  },
  email: {
    type: String,
    required: [true, 'this field is required']
  },
  password: {
    type: String,
    required: [true, 'this field is required']
  },
  verificationCode: {
    type: String,
    reqired: true
  },
  active: {
    type: Boolean,
    default: false
  },

},
  {
    timestamps: true,

  }
)

module.exports = model('signedUpUser', SignedUpUser)