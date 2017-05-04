const test = require('tape')

const processes = require('../processes.js')

test('test setup working', function (t) {
  t.pass()
  t.end()
})

test('getOptions returns a object with two strings in parameters', function (t) {
  const expected = 'string'
  const actual = processes.getOptions()
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
