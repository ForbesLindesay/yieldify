var assert = require('assert')

it('handles plain template literals', function () {
  var x = `foo`
  assert(x === 'foo')
  x = `foo
bar`
  assert(x === 'foobar')
})
it('handles templates with replacements', function () {
  var x = `foo`
  var y = `yy${x}yy`
  assert(y === 'yyfooyy')
})
it('handles tagged templates', function () {
  function html(str) {
    var res = ''
    for (var i = 0; i < str.cooked.length; i++) {
      res += str.cooked[i]
      if (i != str.cooked.length - 1) {
        res += (arguments[i + 1] + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      }
    }
    return res
  }
  var z = html`<strong>\n${'foo & <bar>'}\n</strong>`
  assert(z === '<strong>\nfoo &amp; &lt;bar&gt;\n</strong>')
})