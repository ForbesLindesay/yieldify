# yieldify

Transpiler for ES6 to ES5 with no runtime component.  The design goals of this project are:

1. Use the esprima parser rather than writing a custom parser.  Using the `harmony` branch gives pretty good support, and if it turns out to be lacking, it can be patched.
2. Produce output code that is as readable as possible.
3. Produce output code that is as performant as the input code where possible.

Non goals include:

1. Performance of the conversion, unless it gets unreasonably slow.
2. Supporting features that can be "polyfilled"
3. Supporting the entirety of ES6

In short, this gives you those helpful syntactic shortcuts without the bloat that often acompanies transpilers.

You can see a live demo of yieldify at [demos.forbeslindesay.co.uk/yieldify](http://demos.forbeslindesay.co.uk/yieldify/)

[![Build Status](https://img.shields.io/travis/ForbesLindesay/yieldify/master.svg)](https://travis-ci.org/ForbesLindesay/yieldify)
[![Dependency Status](https://img.shields.io/gemnasium/ForbesLindesay/yieldify.svg)](https://gemnasium.com/ForbesLindesay/yieldify)
[![NPM version](https://img.shields.io/npm/v/yieldify.svg)](http://badge.fury.io/js/yieldify)

## Features supported

 - template strings <code>`I am a ${"template"} string`</code>
 - classes `class Dog extends Animal { constructor() { super('Dog') }}`
 - arrow functions `var squares = [1, 2, 3, 4].map(x => x * x)`

Ironically not `yield` a this stage :(

## Installation

    npm install yieldify

## CLI

To compile from the CLI you can use a number of methods:

```
$ yieldify input.js > output.js
$ yieldify < input.js > output.js
$ yieldify input.js output.js
$ yieldify input.js | uglify-js --minify > output.js
```

You can also compile an entire directory

```
$ yieldify input output
```

## API

Individual files:

```js
var compile = require('yieldify')

fs.writeFileSync('output.js', compile('input.js', fs.readFileSync('input.js', 'utf8')))
```

Entire direcotries:

```js
var compile = require('yieldify')

compile.folder(input, output)
```

## License

  MIT
