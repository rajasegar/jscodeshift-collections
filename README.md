# jscodeshift-collections

![Build and Deploy](https://github.com/rajasegar/jscodeshift-collections/workflows/CI/badge.svg)
[![npm version](http://img.shields.io/npm/v/jscodeshift-collections.svg?style=flat)](https://npmjs.org/package/jscodeshift-collections "View this project on npm")
[![Coverage Status](https://coveralls.io/repos/github/rajasegar/jscodeshift-collections/badge.svg?branch=master)](https://coveralls.io/github/rajasegar/jscodeshift-collections?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)


Some more Collections for jscodeshift for easy and terse api for writing Codemods

## Install
```
npm install jscodeshift-collections
```

## Usage
```js
const jscsCollections = require('jscodeshift-collections');

module.exports = function(fileInfo, api) {
  const j =  api.jscodeshift;

  jscsCollections.registerCollections(j);

  return j(fileInfo.source)
    .findFunctionDeclarations('foo')
    .renameTo('bar')
    .toSource();
}
```

## FunctionDeclaration

Say for example, if you want to rename a function declaration `foo` to `bar` 

### Transform with new Collection API
```js
j.findFunctionDeclarations('foo')
 .renameTo('bar')
```

### Before

```js
function foo() {
}
```


### After

```js
function bar() {
}
```

## List of Collections:

### FunctionDeclaration

```js
// Find all function declarations
j.findFunctionDeclarations()

// Find all function declarations with name=foo and rename them to bar
j.findFunctionDeclarations('foo')
    .renameTo('xyz');

// Find and remove params
  j.findFunctionDeclarations('bar')
    .removeParam('a');

// Find and add params
  j.findFunctionDeclarations('bar')
    .addParam('d');
```

### CallExpression

```js
// Find all call expressions
  j.findCallExpressions();

// Find all member expressions
  j.findCallExpressions('foo.bar');


// Find all nested member expressions
  j.findCallExpressions('foo.bar.baz');

// Find and rename call expressions
  j.findCallExpressions('foo')
  .renameTo('xyz');

// Find and rename member expressions
  j.findCallExpressions('foo')
  .renameTo('foo.bar');

//  Find and remove params
  j.findCallExpressions('bar')
  .removeParam('a');

// Find and add params
  j.findCallExpressions('bar')
  .addParam('d');
```

### ImportDeclaration

```js
// Find all import declarations
  j.findImportDeclarations();

// Find and rename
  j.findImportDeclarations('a')
  .renameTo('xyz');

// Find and remove specifiers
  j.findImportDeclarations('a')
  .removeSpecifier('a');

// Find and add specifiers
  j.findImportDeclarations('a')
  .addSpecifier('c');
```
