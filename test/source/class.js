var assert = require('assert')

class Animal {
  constructor(name = 'anonymous animal') {
    this.name = name
  }
  getName() {
    return this.name
  }
}

class Dog extends Animal {
  constructor() {
    super('Dog')
  }
  bark() {
    return 'woof'
  }
}
class Cat extends Animal {
  constructor() {
    super('Cat')
  }
  purr() {
    return 'meoww'
  }
}
it('can construct basic classes', function () {
  var a = new Animal()
  assert(a.getName() === 'anonymous animal')
  assert(a instanceof Animal)
  var d = new Dog()
  assert(d.getName() === 'Dog')
  assert(d.bark() === 'woof')
  assert(d instanceof Animal)
  assert(d instanceof Dog)
  var c = new Cat()
  assert(c.getName() === 'Cat')
  assert(c.purr() === 'meoww')
  assert(c instanceof Animal)
  assert(c instanceof Cat)
})