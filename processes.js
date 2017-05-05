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
  let op1Index = 0
  let op2Index = 0

  options.id1 = Number(op1)
  op1Index = findIndex(options.id1)

  options.id2 = Number(op2)
  op2Index = findIndex(options.id2)

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
      return a.rank - b.rank
    }
    return ap - bp
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
  return Number(tauntNum) + 1
}

function getCantChoose (tauntNum) {
  return 'I can\'t choose'
}

function getTaunt (tauntNum) {
  return 'Choose wisely'
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
  //return 1
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
