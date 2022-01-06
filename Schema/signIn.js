const { Schema, model } = require('mongoose')

const SignedInUser = new Schema({
  user_id: {
    type: String,
    require: [true, 'This field is required']
  },
  email: {
    type: String,
    required: [true, 'this field is required']
  },
  user_agent: {
    type: String,
    required: [true, 'this field is required']
  }
},
  {
    timestamps: true,

  })

module.exports = model('signedInUser', SignedInUser)