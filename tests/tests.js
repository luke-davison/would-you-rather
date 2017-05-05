const test = require('tape')

const processes = require('../processes.js')

test('test setup working', function (t) {
  t.pass()
  t.end()
})

test('getOptions returns an object with two strings in parameters', function (t) {
  const expected = 'string'
  const actual = processes.getOptions('1', '2')
  if (actual.hasOwnProperty('option1')) {
    t.pass('object has option1 property')
    t.ok(typeof actual.option1 === expected, 'option1 is a string: ' + actual.option1)
  } else {
    t.fail('object does not have an option1 property')
  }
  if (actual.hasOwnProperty('option2')) {
    t.pass('object has option2 property')
    t.ok(typeof actual.option2 === expected, 'option1 is a string: ' + actual.option2)
  } else {
    t.fail('object does not have an option2 property')
  }
  t.end()
})

test('getOptions also returns the parameters as IDs', function (t) {
  const values = ['1', '2']
  const actual = processes.getOptions(values[0], values[1])
  t.equals(Number(values[0]), actual.id1, 'id1 is the same parameter that was entered')
  t.equals(Number(values[1]), actual.id2, 'id2 is the same parameter that was entered')

  t.end()
})

test('getRankings returns an object containing a table of percentages and questions', function (t) {
  const actual = processes.getRankings()
  let expected = 'object'
  t.ok(typeof actual === expected, 'an object is returned')
  expected = 31
  t.equals(actual.table.length, expected, 'the array has 31 entries')
  t.end()
})
