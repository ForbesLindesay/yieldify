
module.exports = function (node) {
  if (typeof exports[node.type] === 'function') {
    var res = exports[node.type](node)
    if (res !== undefined) {
      node.update(res)
    }
  }
}
exports = module.exports
exports['TaggedTemplateExpression'] = require('./types/tagged-template-expression')
exports['TemplateLiteral'] = require('./types/template-literal')
exports['FunctionExpression'] = require('./types/function-expression')
exports['FunctionDeclaration'] = require('./types/function-expression')
exports['ArrowFunctionExpression'] = require('./types/function-expression')
exports['ClassDeclaration'] = require('./types/class-declaration')
exports['CallExpression'] = require('./types/call-expression')