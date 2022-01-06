const { Mongoose, connect } = require("mongoose");
require('dotenv').config()

const connection = async () => {
  try {
    await connect(process.env.DBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('database connected!')
  } catch (error) {
    throw new Error(error)
  }
}

connection()
