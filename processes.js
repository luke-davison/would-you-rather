var mainArray = require('./start')

function saveChoice (winner, loser) {
  const winIndex = findIndex(Number(winner))
  const loseIndex = findIndex(Number(loser))

  updateRankings(winIndex, loseIndex)
}

function getOptions (op1, op2) {
  let options = {}

  const rNum1 = Math.floor(Math.random() * mainArray.length)
  let rNum2 = Math.floor(Math.random() * mainArray.length)
  while (rNum1 === rNum2) {
    rNum2 = Math.floor(Math.random() * mainArray.length)
  }
  options.option1 = mainArray[rNum1].question
  options.id1 = mainArray[rNum1].id
  options.option2 = mainArray[rNum2].question
  options.id2 = mainArray[rNum2].id
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
  getRankings: getRankings
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
