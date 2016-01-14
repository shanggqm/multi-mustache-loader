## Multi Mustache loader for [webpack](https://webpack.github.io/)

Compiles [Mustache](https://mustache.github.io/) templates with [Hogan](https://twitter.github.io/hogan.js/) and optionally [html-minifier](https://github.com/kangax/html-minifier). Support both single template file and multi template file.

the multi template file should only write as below:
```html
<script type="template/text" id="tmp-multi-a"></script>
<script type="template/text" id="tmp-multi-b"></script>
```

### Install

```sh
$ npm i -S multi-mustache-loader
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

1. one file one template
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

2. one file more than one template
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

