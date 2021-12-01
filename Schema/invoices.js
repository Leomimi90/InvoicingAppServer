const { Schema, model } = require('mongoose')

const Invoice = new Schema({
  itemNumber: {
    type: number,
    require: [true, 'This field is required']
  },
  description: {
    type: string,
    require: [true, 'This field is required']
  },
  unitPrice: {
    type: number,
    require: [true, 'This field is required']
  },
  quantity: {
    type: number,
    require: [true, 'This field is required']
  },
  amount: {
    type: number,
    require: [true, 'This field is required']
  },
},
  {
    timestamps: true,

  }
)

module.exports = model('invoice', Invoice)
