const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const uuid = require('uuid/v4')
const fs = require('fs')
const cors = require('cors')

app.use(cors())
app.disable('x-powered-by')
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(bodyParser.json())

const movieRoutes = require('./routes/routes')
app.use('/', movieRoutes)

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ error: err })
})

app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Not found' }})
})

const listener = () => `Listening on port ${port}!`
app.listen(port, listener)

module.exports = app
