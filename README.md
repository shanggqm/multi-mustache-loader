## Multi Mustache loader for [webpack](https://webpack.github.io/)

[![NPM version](https://img.shields.io/npm/v/multi-mustache-loader.svg)](https://www.npmjs.com/package/multi-mustache-loader)
[![NPM downloads total](https://img.shields.io/npm/dt/multi-mustache-loader.svg)](https://www.npmjs.com/package/multi-mustache-loader)
[![NPM license](https://img.shields.io/npm/l/multi-mustache-loader.svg)](https://www.npmjs.com/package/multi-mustache-loader)
[![Build Status](https://travis-ci.org/shanggqm/multi-mustache-loader.svg?branch=master)](https://travis-ci.org/shanggqm/multi-mustache-loader)
[![bitHound Overalll Score](https://www.bithound.io/github/shanggqm/multi-mustache-loader/badges/score.svg)](https://www.bithound.io/github/shanggqm/multi-mustache-loader)
[![Dependency Status](https://david-dm.org/shanggqm/multi-mustache-loader.svg)](https://david-dm.org/shanggqm/multi-mustache-loader)
[![devDependency Status](https://david-dm.org/shanggqm/multi-mustache-loader/dev-status.svg)](https://david-dm.org/shanggqm/multi-mustache-loader#info=devDependencies)

Compiles [Mustache](https://mustache.github.io/) templates with [Hogan](https://twitter.github.io/hogan.js/) and optionally [html-minifier](https://github.com/kangax/html-minifier). Support both single template file and multi template file.

the multi template file should only write as below:
```html
<script type="template/text" id="tmp-multi-a"></script>
<script type="template/text" id="tmp-multi-b"></script>
```

### Install

```sh
$ npm i multi-mustache-loader
```

### Usage

```javascript
module: {
    loaders: [ {
        test: /\.html$/,
        loader: 'multi-mustache'
        // loader: 'multi-mustache?minify'
        // loader: 'multi-mustache?{ minify: { removeComments: false } }'
        // loader: 'multi-mustache?noShortcut'
    } ]
}
```

### one file one template
template.html

```html
<ul>
{{#user}}
<li>{{name}}</li>
{{/user}}
</ul>
```
```javascript
var template = require('./template.html');
var html = template({ foo: 'bar' });
```

### one file more than one template
multi-template.html

```html
<script type="template/text" id="tmp-name">
	<span>{{name}}</span>
</script>
<script type="template/text" id="tmp-post">
	<span>{{post}}</span>
</script>
```
```javascript
var template = require('./multi-template.html');
var htmlName = template['tmp-name']({ name: 'multi-mustache-loader' });
var htmlPost = template['tmp-post']({post:'hello multi-mustache-loader!'});
```

If `noShortcut` is passed, then Hogan compiled template is returned instead, so
you can pass it as partial.

```javascript
var template = require('./template.html');
var template2 = require('./template2.html');
var html = template({ foo: 'bar' }, {partial: template2});
```

[Documentation: Using loaders](https://webpack.github.io/docs/using-loaders.html).

### License
MIT

