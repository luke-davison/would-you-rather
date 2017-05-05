var mainArray = require('./start')

function saveChoice (winner, loser) {
  const winIndex = findIndex(Number(winner))
  const loseIndex = findIndex(Number(loser))

  updateRankings(winIndex, loseIndex)
  mainArray[winIndex].wins ++
  mainArray[winIndex].count ++
  mainArray[loseIndex].count ++
}

function getOptions (op1, op2) {
  let options = {}

  options.id1 = Number(op1)
  const op1Index = findIndex(options.id1)

  options.id2 = Number(op2)
  const op2Index = findIndex(options.id2)

  options.option1 = mainArray[op1Index].question
  options.option2 = mainArray[op2Index].question
  return options
}

function getRankings () {
  let sortedArray = mainArray.sort((a, b) => {
    let ap = 0.5
    let bp = 0.5
    if (a.count > 0) {
      ap = a.wins / a.count
    }
    if (b.count > 0) {
      bp = b.wins / b.count
    }
    if (ap === bp) {
      return b.rank - a.rank
    }
    return bp - ap
  })
  let table = sortedArray.map((x) => {
    if (x.count === 0) {
      return {
        question: x.question,
        percentage: '50%'
      }
    }
    return {
      question: x.question,
      percentage: Math.floor(x.wins / x.count * 100) + '%'
    }
  })
  return {table: table}
}

module.exports = {
  saveChoice,
  getOptions,
  getRankings,
  getRandomOptions,
  getTaunt,
  getNextTaunt,
  getCantChoose
}


function getNextTaunt (tauntNum) {
  if (tauntNum.substr(0, 1) === 'h') {
    return tauntNum.substr(1)
  }
  return Number(tauntNum) + 1
}

function getCantChoose (tauntNum) {
  if (tauntNum.substr(0, 1) === 'h') {
    return 'I can\'t choose'
  }
  switch (Number(tauntNum)) {
    case 0: return 'I can\'t choose'
    case 1: return 'I still can\'t choose'
    case 2: return 'I\'m really bad at choosing'
    case 3: return 'I truly can\'t decide'
    case 4: return 'I\'m going to press it'
    case 5: return 'Yes, how did you know?'
    case 6: return 'Skip!'
    case 7: return 'Skip again!'
    case 8: return 'Skip?'
    case 9: return 'Because I really can\'t choose'
    case 10: return 'Then why are you even giving me this option?'
    case 11: return 'That\'s your opinion'
    case 12: return 'It is? I thought it was my destiny to dance'
    default: return '(This does nothing)'

  }
}

function getTaunt (tauntNum, name) {
  if (tauntNum.substr(0, 1) === 'h') {
    return `Nice try, ${name}`
  }
  switch (Number(tauntNum)) {
    case 0: return 'Choose wisely'
    case 1: return 'Please try to answer this question'
    case 2: return 'We\'d prefer if you answered this important question'
    case 3: return `I'm sorry to hear that you are indecisive, ${name}`
    case 4: return 'Please do not press the skip button again'
    case 5: return 'You certainly are persistent'
    case 6: return 'Okay, fine - press once more to skip this question'
    case 7: return 'Sorry, I meant twice more'
    case 8: return `I can't believe you fell for that ${name}`
    case 9: return 'Why are you even still clicking that button?'
    case 10: return 'Don\'t you know there is no escape?'
    case 11: return 'You can\'t escape answering this question'
    case 12: return 'It is your destiny to answer this question'
    default: return 'ANSWER NOW!'
  }
}

function findIndex (id) {
  for (var i = 0; i < mainArray.length; i++) {
    if (mainArray[i].id === id) {
      return i
    }
  }
}

function updateRankings (winIndex, loseIndex) {
  mainArray[winIndex].rank += getAdjustment(mainArray[winIndex].rank, mainArray[loseIndex].rank)
  mainArray[loseIndex].rank -= getAdjustment(mainArray[winIndex].rank, mainArray[loseIndex].rank)
}

function getAdjustment (winnerRank, loserRank) {
  //  return 1
  const K = 40
  return Math.floor(K * (1 - 1 / (1 + Math.pow(10, ((loserRank - winnerRank) / 400)))))
}

function getRandomOptions () {
  const op1Index = Math.floor(Math.random() * mainArray.length)
  let results = []
  results.push(mainArray[op1Index].id)
  let op2Index = Math.floor(Math.random() * mainArray.length)
  while (op2Index === op1Index) {
    op2Index = Math.floor(Math.random() * mainArray.length)
  }
  results.push(mainArray[op2Index].id)
  return results
}
