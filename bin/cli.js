#!/usr/bin/env node

'use strict'

var fs = require('fs')
var path = require('path')

var lsr = require('lsr').sync
var mkdir = require('mkdirp').sync

var compile = require('../')

var read = fs.readFileSync
var write = fs.writeFileSync
var join = path.join

var source = process.argv[2]
var destination = process.argv[3]

if (source) {
  var stat = fs.statSync(source)
  if (stat.isFile()) {
    if (destination) {
      write(destination, compile(source, read(source, 'utf8')))
    } else {
      process.stdout.write(compile(source, read(source, 'utf8')))
    }
  } else {
    compile.folder(source, destination)
  }
} else {
  var source = ''
  process.stdin.on('data', function (data) {
    source += data
  })
  process.stdin.on('end', function () {
    process.stdout.write(compile(join(process.cwd() + 'file.js'), source))
  })
}
