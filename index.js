'use strict';

var loaderUtils = require('loader-utils');
var Hogan = require('hogan.js');
var minifier = require('html-minifier');

// https://github.com/kangax/html-minifier#options-quick-reference
var minifierDefaults = {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    caseSensitive: true
};

var extend = function(target, source) {
    target = JSON.parse(JSON.stringify(target));

    Object.keys(source).forEach(function(key) {
        target[key] = source[key];
    });

    return target;
};

module.exports = function(source) {
    var query = loaderUtils.parseQuery(this.query);
    var originalSource = source;

    if (this.cacheable) {
        this.cacheable();
    }

    // minify?
    if (query.minify) {
        // `?minify`
        var minifierOptions = minifierDefaults;

        // `?{minify:{...}}`
        if (Object.prototype.toString.call(query.minify) === '[object Object]') {
            minifierOptions = extend(minifierOptions, query.minify);
        }

        source = minifier.minify(source, minifierOptions);
    }

    var suffix;
    if (query.noShortcut) {
        suffix = 'return T; }()';
    } else {
        suffix = 'return T.render.apply(T, arguments); }';
    }

    var splitRegExp = /<script.+?id\s*?=\s*?"(.+?)".*?>([\s\S]+?)<\/script>/g;
    var matched = [];
    var match;
    // if tpl file is multiple template or wrap with script tag?
    if (source.match(splitRegExp)) {
        while ((match = splitRegExp.exec(source)) !== null) {
            if (match.length >= 3) {
                matched.push({
                    id: match[1],
                    text: match[2]
                });
            } else {
                // throw some info log
            }
        }

        var multiExports = [];
        matched.forEach(function(m) {
            multiExports.push('"' + m.id + '": function(){ var T = new H.Template(' + Hogan.compile(m.text, {
                asString: true
            }) + ',' + JSON.stringify(m.text) + ',H);' + suffix);
        });

        multiExports.join(',');

        return 'var H = require("hogan.js");\n' +
            'module.exports = {' + multiExports.join(',') + '}';
    }
    return 'var H = require("hogan.js");\n' +
        'module.exports = function() { ' +
        'var T = new H.Template(' +
        Hogan.compile(source, {
        asString: true
    }) +
        ', ' +
        JSON.stringify(source) +
        ', H);' + suffix;
};
