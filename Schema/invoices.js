const { Schema, model } = require('mongoose')

const Invoice = new Schema({
  itemNumber: {
    type: Number,
    require: [true, 'This field is required']
  },
  description: {
    type: String,
    require: [true, 'This field is required']
  },
  unitPrice: {
    type: Number,
    require: [true, 'This field is required']
  },
  quantity: {
    type: Number,
    require: [true, 'This field is required']
  },
  amount: {
    type: Number,
    require: [true, 'This field is required']
  },
},
  {
    timestamps: true,

  }
)

module.exports = model('invoice', Invoice)
