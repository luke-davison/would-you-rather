var mainArray = require('./start')

function saveChoice (winner, loser) {
  const winIndex = findIndex(Number(winner))
  const loseIndex = findIndex(Number(loser))

  updateRankings(winIndex, loseIndex)
}

function getOptions (op1, op2) {
  let options = {}
  let op1Index = 0
  let op2Index = 0

  options.id1 = Number(op1)
  op1Index = findIndex(options.id1)

  options.id2 = Number(op2)
  op2Index = findIndex(options.id2)

  console.log(op1Index, op2Index)
  options.option1 = mainArray[op1Index].question
  options.option2 = mainArray[op2Index].question
  return options
}

function getRankings () {
  let sortedArray = mainArray.sort((a, b) => a.rank - b.rank)
  let table = sortedArray.map((x) => x.question + '  ,  ' + x.rank)
  return {table: table}
}

module.exports = {
  saveChoice: saveChoice,
  getOptions: getOptions,
  getRankings: getRankings,
  getRandomOptions: getRandomOptions
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
  return 1
  //  const K = 10
  //  return K * (1 - 1 / (1 + Math.pow(10, ((loserRank - winnerRank) / 400))))
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
