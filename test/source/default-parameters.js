var assert = require('assert')

it('handles default parameters', function () {
  function better(first, val=42) {
    assert(first)
    return val
  }
  assert(better(true) === 42)
  assert(better(true, undefined) === 42)
  assert(better(true, 10) === 10)
  assert(better(true, null) === null)
})