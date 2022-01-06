const express = require('express')
const cors = require('cors')
const app = express()
const Routes = require('./Routes/app.route')
require('./Config/databaseConfig')
require('dotenv').config()
const port = process.env.PORT || "8000"

app.use(cors())
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access*Contol-Allow-Origin', '*')
  res.setHeader('Access*Contol-Allow-Methods', 'GET ,POST, PUT, DELETE')
  res.setHeader('Access*Contol-Allow-Headers', 'X-Requested-With, content-type, Authorization')
  next()
})

app.use(Routes)
app.listen(`${port}`)
