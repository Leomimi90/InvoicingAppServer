const Invoice = require('../Schema/invoices')
const { signRefreshToken } = require('../Middleware/authToken')
const createInvoice = async (req, res) => {
  try {
    let { customerEmail, customerInfo, customerInvoice, issueDate, dueDate } = req.body
    let user = await Invoice.find({ customerEmail: customerEmail })
    let customerInvoiceData = {
      items: customerInvoice.items,
      description: customerInvoice.description,
      rate: customerInvoice.rate,
      qty: customerInvoice.qty,
      valuePrice: () => this.rate.map((a, i) => a + this.qty[i]),
      price: customerInvoiceData.valuePrice(),
      totalAmountMethod: () => this.price.reduce((a, b) => a + b),
      total: customerInvoiceData.totalAmountMethod(),
      amountPaid: customerInvoice.amountPaid,
      balance: customerInvoice.total - customerInvoice.amountPaid
    }
    let { valuePrice, totalAmountMethod, ...others } = customerInvoiceData
    let userInvoiceData = {
      custormerEmail: customerEmail,
      customerInfo: customerInfo,
      issueDate: issueDate || Date.now(),
      dueDate: dueDate
    }
    if (user.length == 0) {
      customerInvoiceData["number"] = 1,
        userInvoiceData["customerInvoice"] = others
    } else {
      customerInvoiceData["number"] = user.customerInvoice.number + 1
    }
    const token = await signRefreshToken(req.user.sub)
    res.status(200).json({ status: 200, message: token })
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message })
  }
}

module.exports = {
  createInvoice
}