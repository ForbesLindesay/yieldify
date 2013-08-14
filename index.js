'use strict'

var fs = require('fs')
var path = require('path')
var util = require('util')

var lsr = require('lsr').sync
var mkdir = require('mkdirp').sync
var parse = require('esprima').parse

module.exports = compile
module.exports.folder = compileFolder

function compile(path, source) {
  return require('./lib/falafel')(source, require('./lib/transform'))
}

function compileFolder(source, destination, options) {
  mkdir(destination)
  var sources = lsr(source)
  for (var i = 0; i < sources.length; i++) {
    if (sources[i].isFile() && /\.js$/.test(sources[i].name)) {
      if (options && options.ast) {
        var ast = parse(fs.readFileSync(sources[i].fullPath, 'utf8'))
        fs.writeFileSync(path.join(destination, sources[i].path).replace(/\.js$/, '.ast.js'), util.inspect(ast, false, 1000, false))
      }
      fs.writeFileSync(path.join(destination, sources[i].path), compile(source, fs.readFileSync(sources[i].fullPath, 'utf8')))
    } else if (sources[i].isDirectory()) {
      mkdir(path.join(destination, sources[i].path))
    }
  }
}