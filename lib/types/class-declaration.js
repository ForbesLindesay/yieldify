module.exports = function (node) {
  var constructor
  for (var i = 0; i < node.body.body.length; i++) {
    if (node.body.body[i].type === 'MethodDefinition' && node.body.body[i].key.source() === 'constructor') {
      constructor = node.body.body[i]
    }
  }
  var result = constructor.value.source().replace(/^function /, 'function ' + node.id.source())
  var proto = node.id.source() + '.prototype'

  if (node.superClass) {
    result += '\n' + proto + ' = Object.create(' + node.superClass.source() + '.prototype)'
            + '\n' + proto + '.constructor = ' + node.id.source()
  }

  for (var i = 0; i < node.body.body.length; i++) {
    if (node.body.body[i].key.source() !== 'constructor') {
      result += '\n' + proto + '.' + node.body.body[i].key.source() + ' = ' + node.body.body[i].value.source()
    }
  }
  return result
}