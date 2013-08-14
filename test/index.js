'use strict'

var fs = require('fs')
var path = require('path')
var lsr = require('lsr').sync
var compile = require('../')

compile.folder(path.join(__dirname, '..', 'src'), path.join(__dirname, '..', 'lib'))
compile.folder(__dirname + '/source', __dirname + '/destination', {ast: true})
var files = lsr(__dirname + '/destination')
for (var i = 0; i < files.length; i++) {
  if (path.dirname(files[i].fullPath) === path.join(__dirname, 'destination')  && !/\.ast\.js$/.test(files[i].name)) {
    try {
      var fn = Function('', fs.readFileSync(files[i].fullPath, 'utf8'))
    } catch (ex) {
      it(files[i].path, function () {
        throw ex
      })
      continue
    }
    describe(files[i].path, function () {
      require(files[i].fullPath)
    })
  }
}