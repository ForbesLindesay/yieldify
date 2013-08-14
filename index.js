'use strict'

var falafel = require('./lib/falafel')
var transform = require('./lib/transform')

module.exports = compile

function compile(path, source) {
  return falafel(source, transform).toString()
}