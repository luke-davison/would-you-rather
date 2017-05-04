const express = require('express')
const hbs = require('express-handlebars')

const routes = require('./routes')

const app = express()

const hbsConfig = {
  extname: 'hbs',
  defaultLayout: 'main'
}

app.engine('hbs', hbs(hbsConfig))
app.set('view engine', 'hbs')
app.use('/', routes)

module.exports = app
