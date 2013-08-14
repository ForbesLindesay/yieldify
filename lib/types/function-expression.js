//This file handles FunctionExpression, FunctionDeclaration and ArrowFunctionExpression
//It also handles FunctionExpression as the value of a MethodDefinition

module.exports = function (node) {
  var result = 'function '
  if (node.id) {
    result += node.id.source()
  }
  result += '('
  result += node.params.map(function (n) {return n.source()}).join(', ')
  result += ') {'
  var body = node.body.type === 'BlockStatement' ?
             node.body.source().substr(1, node.body.source().length - 2) :
             node.body.source()
  var indent = /^(?:\r|\n|\{)*(\s*)/.exec(body.replace(/^\n*/, ''))[1]
  for (var i = 0; i < node.defaults.length; i++) {
    if (node.defaults[i] !== undefined) {
      result += '\n' + indent
      result += 'if (' + node.params[i].source() + ' === undefined) ' +
                node.params[i].source() + ' = ' + node.defaults[i].source()
    }
  }
  if (node.rest) {
      result += '\n' + indent
      result += node.rest.source() + ' = Array.prototype.slice.call(arguments, ' + node.params.length + ')'
  }
  if (node.type === 'ArrowFunctionExpression' && node.body.type !== 'BlockStatement') {
    result += 'return '
  }
  result += body
  result += '}'
  if (node.type === 'ArrowFunctionExpression' && containsThis(node.body)) {
    result += '.bind(this)'
  }
  return result
}
function containsThis(node, circular) {
  if (!node || typeof node !== 'object' ||
      !node.type || typeof node.type !== 'string') {
    return false
  }
  if (node.type === 'FunctionExpression' || node.type === 'FunctionDeclaration') {
    return false
  }
  if (node.type === 'ThisExpression') {
    return true
  }
  var keys = Object.keys(node)
  for (var i = 0; i < keys.length; i++) {
    if (keys[i] === 'parent') continue
    if (node[keys[i]] && Array.isArray(node[keys[i]])) {
      for (var x = 0; x < node[keys[i]].length; x++) {
        if (containsThis(node[keys[i]][x])) return true
      }
    } else if (containsThis(node[keys[i]])) {
      return true
    }
  }
  return false
}