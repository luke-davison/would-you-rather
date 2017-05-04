const express = require('express')
const backUp = require('./backup.js')
const router = express.Router()

router.get('/', (req, res) => {
  //  got to welcome page
  res.redirect('/welcome')
})

router.get('/welcome', (req, res) => {
  //  load the welcome page
  res.render('index')
})

router.post('/welcome', (req, res) => {
  res.redirect('/wouldyourather?name=' + req.body.name)
})

router.get('/wouldyourather/', (req, res) => {
  //  load the game page
  // name will be in req.query.name
  res.render('game', {})
})

router.get('/wouldyourather/:win/:lose', (req, res) => {
  //  save the win and lose results and reload the game page
  res.redirect('/wouldyourather?name=' + req.query.name)
})

router.get('/rankings', (req, res) => {
  //  load the rankings page
  res.render('/ranking', {})
})

module.exports = router
