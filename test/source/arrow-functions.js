var assert = require('assert')

var square = x => x * x
function Selfish(x) {
  this.x = x
  this.getX = () => this.x
  this.setX = x => {
    this.x = x
    return this
  }
}

it('handles default parameters', function () {
  assert(square(2) === 4)
  var s = new Selfish(4)
  var get = s.getX
  var set = s.setX
  assert(get() === 4)
  assert(set(42).getX() === 42)
})