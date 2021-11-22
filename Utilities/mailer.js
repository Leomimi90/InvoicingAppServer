const { createTransport } = require('nodemailer')
require('dotenv').config()



const transport = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
})

const sendEmail = async (userEmail, subject, htmlmessage) => {
  try {
    await transport.sendMail({ from: process.env.MAIL_USERNAME, to: userEmail, subject: subject, html: htmlmessage })

  } catch (error) {
    throw new Error(error)
  }
}

module.exports = { sendEmail }
