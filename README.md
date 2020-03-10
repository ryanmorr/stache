# stache

[![Version Badge][version-image]][project-url]
[![Build Status][build-image]][build-url]
[![License][license-image]][license-url]

> Micro mustache-style template parser

## Install

Download the [CJS](https://github.com/ryanmorr/stache/raw/master/dist/stache.cjs.js), [ESM](https://github.com/ryanmorr/stache/raw/master/dist/stache.esm.js), [UMD](https://github.com/ryanmorr/stache/raw/master/dist/stache.umd.js) versions or install via NPM:

``` sh
npm install @ryanmorr/stache
```

## Usage

Similar to how tagged templates parse template literals, stache parses a mustache string template into an array of static strings and an array of the interpolated values:

``` javascript
import stache from '@ryanmorr/stache';

const tpl = stache('{{firstName}} {{lastName}}');

const [strings, values] = tpl({
    firstName: 'John',
    lastNamea: 'Doe'
});

console.log(strings); //=> ["", " ", ""]
console.log(values); //=> ["John", "Doe"]
```

In addition to simple value interpolation, loops, if statements, and expressions are also supported:

``` javascript
const tpl = stache(`
    {{each items as item, i}}
        {{if i === 0}}
            {{ item + 10 }}
        {{else if i === 1}}
            {{ item - 10 }}
        {{else}}
            {{ item }}
        {{/if}}
    {{/each}}
`);

const [strings, values] = tpl({
    items: [10, 20, 30]
});

console.log(strings); //=> ["", "", "", ""]
console.log(values); //=> [20, 10, 30]
```

## Examples

You can use the arrays of strings and values to formulate your own custom templating solution. For example, here's a basic string templating engine:

``` javascript
import stache from '@ryanmorr/stache';

function createTemplate(source) {
    const tpl = stache(source);
    return (data) => {
        const [strings, values] = tpl(data);
        return strings.reduce((acc, str, i) => acc + (values[i - 1]) + str);
    };
}

const tpl = createTemplate(`
    <ul>
        {{each items as item}}
            <li>{{item}}</li>
        {{/each}}
    </ul>
`);

const html = tpl({
    items: ['foo', 'bar', 'baz']
});

console.log(html); //=> "<ul><li>foo</li><li>bar/li><li>baz</li></ul>
```

You can also combine stache with a tagged template compatible parser for expanded functionality. The following uses [htm](https://github.com/developit/htm) for a hyperscript-based solution:

``` javascript
import htm from 'htm';
import stache from '@ryanmorr/stache';

const html = htm.bind(createElement);

function createElement(tag, props, ...children) {
    return {tag, props, children};
}

function createTemplate(source) {
    const tpl = stache(source);
    return (data) => {
        const [strings, values] = tpl(data);
        return html(strings, ...values);
    }
}

const tpl = createTemplate('<div id={{id}} onclick={{handler}}>{{content}}</div>');

const vnode = tpl({
    id: 'foo',
    content: 'bar',
    handler: () => console.log('clicked')
});

console.log(vnode); //=> {tag: 'div', props: {id: 'foo', onclick: handler}, children: ['bar']}
```

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).

[project-url]: https://github.com/ryanmorr/stache
[version-image]: https://badge.fury.io/gh/ryanmorr%2Fstache.svg
[build-url]: https://travis-ci.org/ryanmorr/stache
[build-image]: https://travis-ci.org/ryanmorr/stache.svg
[license-image]: https://img.shields.io/badge/license-Unlicense-blue.svg
[license-url]: UNLICENSE