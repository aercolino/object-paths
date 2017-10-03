# Object Paths [![Build Status](https://travis-ci.org/aercolino/object-paths.svg?branch=master)](https://travis-ci.org/aercolino/object-paths) [![Coverage Status](https://coveralls.io/repos/github/aercolino/object-paths/badge.svg?branch=master)](https://coveralls.io/github/aercolino/object-paths?branch=master)


Find all nodes of a tree object whose values match a regular expression and get their paths from the root as a list of keys separated by dots.




## Installation

```bash
$ npm install @aercolino/object-paths
```




## Example

```js
const { selectPaths } = require('@aercolino/object-paths');

const someObject = {
    a: {
        b: {
            c: [
                {
                    d: 123,
                    e: 456
                }
            ],
            h: 'hello'
        },
        f: 23,
        g: 45
    },
    j: 'world'
};

selectPaths(someObject); 
// [ 'a.b.c.0.d', 'a.b.c.0.e', 'a.b.h', 'a.f', 'a.g', 'j' ]

selectPaths(someObject, /^..$/); 
// [ 'a.f', 'a.g' ]

selectPaths(someObject, { test: x => 34 < x && x < 345 }); 
// [ 'a.b.c.0.d', 'a.g' ]
```




## Tests

```
$ npm test
```
