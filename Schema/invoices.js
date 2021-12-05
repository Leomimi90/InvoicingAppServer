const { Schema, model } = require('mongoose')

const Invoice = new Schema({

  userId: String,
  custormerEmail: {
    type: String,
    require: [true, 'This field is required']
  },
  customerInfo: Array || Object,
  customerInvoice: Array || Object,
  issueDate: {
    type: String,
    require: [true, 'This field is required']
  },
  dueDate: {
    type: String,
    require: [true, 'This field is required']
  },

},
  {
    timestamps: true,

  }
)

module.exports = model('invoice', Invoice)