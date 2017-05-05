const express = require('express')

const processes = require('./processes.js')
const router = express.Router()

router.get('/', (req, res) => {
  //  got to welcome page
  res.redirect('/welcome')
})

router.get('/welcome', (req, res) => {
  //  load the welcome page
  res.render('index', {home: 'welcome'})
})

router.post('/welcome', (req, res) => {
  //  redirects to the main game page, retaining the name as a query
  const options = processes.getRandomOptions()
  res.redirect(`/wouldyourather/${options[0]}/${options[1]}/0?name=${req.body.name}`)
})

router.get('/wouldyourather/:op1/:op2/:taunt', (req, res) => {
  let options = processes.getOptions(req.params.op1, req.params.op2)

  options.name = req.query.name //  so that this name can be added to the heading and hyperlinks
  options.option1url = `/wouldyourather/submit/${options.id1}/${options.id2}/0?name=${req.query.name}`
  options.option2url = `/wouldyourather/submit/${options.id2}/${options.id1}/0?name=${req.query.name}`
  options.rankingurl = `/rankings/${options.id1}/${options.id2}/${req.params.taunt}?name=${req.query.name}`
  options.homeurl = `/wouldyourather/${options.id1}/${options.id2}/h${req.params.taunt}?name=${req.query.name}`

  options.taunt = processes.getTaunt(req.params.taunt, req.query.name)
  options.cantchoose = processes.getCantChoose(req.params.taunt)
  const nextTaunt = processes.getNextTaunt(req.params.taunt)
  options.cantchooseurl = `/wouldyourather/${options.id1}/${options.id2}/${nextTaunt}?name=${req.query.name}`

  res.render('game', options)
})

router.get('/wouldyourather/submit/:win/:lose/:taunt', (req, res) => {
  //  save the win and lose results and reload the game page
  processes.saveChoice(req.params.win, req.params.lose)
  const options = processes.getRandomOptions()

  res.redirect(`/wouldyourather/${options[0]}/${options[1]}/${req.params.taunt}?name=${req.query.name}`)
})

router.get('/wouldyourather/cantchoose/:op1/:op2/:taunt', (req, res) => {
  //  redirect back to the game page with a new taunt
})

router.get('/rankings/:op1/:op2/:taunt', (req, res) => {
  //  load the rankings page
  let rankings = processes.getRankings()  //  format {table: ['string', 'string', 'string']}

  rankings.name = req.query.name  //  so that this name can be added to the heading and hyperlinks
  rankings.homeurl = `/wouldyourather/${req.params.op1}/${req.params.op2}/${req.params.taunt}?name=${req.query.name}`

  res.render('ranking', rankings)
})

module.exports = router
