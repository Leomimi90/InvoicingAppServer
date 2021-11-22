const { Schema, Model } = require('mongoose')

const Users = new Schema({
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
  active: {
    type: boolean,
    default: false
  },

},
  {
    timestamps: true,

  }
)

module.exports = model('users', Users)