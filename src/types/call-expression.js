module.exports = function (node) {
  if (node.callee.source() === 'super') {
    var superName
    var parent = node.parent
    while (parent && parent.parent !== parent) {
      if (parent.type === 'ClassDeclaration') {
        superName = parent.superClass.source()
        break
      } else {
        parent = parent.parent
      }
    }
    return superName + '.call(this, ' + node.arguments.map(a => a.source()).join(', ') + ')'
  }
}