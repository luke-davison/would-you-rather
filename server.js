const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')

const routes = require('./routes')

const app = express()

const hbsConfig = {
  extname: 'hbs',
  defaultLayout: 'main'
}

app.use(express.static('public'))

app.engine('hbs', hbs(hbsConfig))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({extended: false}))
app.use('/', routes)

module.exports = app
