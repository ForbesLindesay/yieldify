module.exports = function (node) {
  if (node.parent.type === 'TaggedTemplateExpression') return
  var cooked = node.quasis.map(v => v.value.cooked)
  var res = []
  for (var i = 0; i < cooked.length; i++) {
    res.push(JSON.stringify(cooked[i]))
    if (i != cooked.length - 1) {
      res.push(node.expressions[i].source())
    }
  }
  var lines = node.source().replace(/[^\n]/g, '')
  return res.join('+') + lines
}