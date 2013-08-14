module.exports = function (node) {
  var lines = node.source().replace(/[^\n]/g, '')
  var res = node.tag.source() + '({raw:' + quasi(node, 'raw') + ',cooked:' + quasi(node, 'cooked') + '},'
          + node.quasi.expressions.map(e => e.source()).join(',') + ')'
  res += lines.substring(res.replace(/[^\n]/g, '').length)
  return res
}

function quasi(node, type) {
  return JSON.stringify(node.quasi.quasis.map(v => v.value[type]))
}