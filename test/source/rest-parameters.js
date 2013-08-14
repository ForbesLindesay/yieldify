var assert = require('assert')

var f = {}
var s = {}

it('handles default parameters', function () {
  function better(first, second, ...rest) {
    assert(first === f)
    assert(second === s)
    return rest
  }
  assert.deepEqual(better(f, s, 1, 2, 3), [1, 2, 3])
  assert.deepEqual(better(f, s), [])
  assert.deepEqual(better(f, s, true), [true])
})