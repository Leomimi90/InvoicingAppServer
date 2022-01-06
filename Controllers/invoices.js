const Invoice = require("../Schema/invoices");
const { signRefreshToken } = require("../Middleware/authToken");

const createInvoice = async (req, res) => {
  try {
    let {
      customeraddress,
      customerInvoice,
      issueDate,
      dueDate,
      total,
      amountPaid,
      balance,
    } = req.body;
    let user = await Invoice.find({
      customerEmail: customeraddress.email.trim(),
    });
    let customerInvoiceData = {
      items: customerInvoice.items,
      description: customerInvoice.descriptions,
      rate: customerInvoice.rates,
      qty: customerInvoice.qtys,
      valuePrice: () => this.rate.map((a, i) => a * this.qty[i]),
      price: customerInvoiceData.valuePrice() || customerInvoice.price,
      totalAmountMethod: () => this.price.reduce((a, b) => a + b),
      total: customerInvoiceData.totalAmountMethod() || total,
      amountPaid: amountPaid,
      balance: total - amountPaid || balance,
    };
    let { valuePrice, totalAmountMethod, ...others } = customerInvoiceData;
    let userInvoiceData = {
      userId: `${req.user.sub}`,
      custormerEmail: customeraddress.email,
      customerInfo: customeraddress,
      issueDate: issueDate || Date.now(),
      dueDate: dueDate,
    };
    if (user.length == 0) {
      (customerInvoiceData["invoiceNumber"] = 1),
        (userInvoiceData["customerInvoice"] = others);
    } else {
      customerInvoiceData["invoiceNumber"] =
        eval(user.customerInvoice.invoiceNumber) + 1;
    }
    // await Invoice.create(userInvoiceData)
    const token = await signRefreshToken(req.user.sub);
    res.status(200).json({ status: 200, message: token });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

const updateInvoice = async (req, res) => {
  try {
    let {
      customeraddress,
      customerInvoice,
      dueDate,
      total,
      amountPaid,
      balance,
    } = req.body;

    let customerInvoiceData = {
      items: customerInvoice.items,
      description: customerInvoice.descriptions,
      rate: customerInvoice.rates,
      qty: customerInvoice.qtys,
      valuePrice: () => this.rate.map((a, i) => a * this.qty[i]),
      price: customerInvoiceData.valuePrice() || customerInvoice.price,
      totalAmountMethod: () => this.price.reduce((a, b) => a + b),
      total: customerInvoiceData.totalAmountMethod() || total,
      amountPaid: amountPaid,
      balance: total - amountPaid || balance,
    };

    let { valuePrice, totalAmountMethod, ...others } = customerInvoiceData;
    let userInvoiceData = {
      custormerEmail: customeraddress.email,
      customerInfo: customeraddress,
      dueDate: dueDate,
      customerInvoice: others,
    };
    await Invoice.findByIdAndUpdate(req.params.id, { $set: userInvoiceData });

    const token = await signRefreshToken(req.user.sub);
    res.status(200).json({ status: 200, message: token });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    const token = await signRefreshToken(req.user.sub);
    res.status(200).json({ status: 200, message: token });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

const getAllInvoices = async (req, res) => {
  try {
    let AllInvoices = await Invoice.find({ userId: `${req.user.sub}` });
    res.status(200).json({ status: 200, message: AllInvoices });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};
module.exports = {
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getAllInvoices,
};