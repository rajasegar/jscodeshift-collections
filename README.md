# jscodeshift-collections

Some more Collections for jscodeshift for easy and terse api for writing Codemods

## Install
```
npm install jscodeshift-collections
```

## Usage
```
const jscsCollections = require('jscodeshift-collections');

module.exports = function(fileInfo, api) {
  const { jscodeshift } = api;

  jscsCollections.registerCollections(jscodeshift);

  return jscodeshift(fileInfo.source)
    .findFunctionDeclarations('foo')
    .renameTo('bar')
    .toSource();
}
```

## FunctionDeclaration

Say for example, if you want to rename a function declaration `foo` to `bar` 

### Before

```js
function foo() {
}
```

### Codemod with new Collection API
```js
j.findFunctionDeclarations('foo')
 .renameTo('bar')
```

### After

```js
function bar() {
}
```

## List of Collection:
- FunctionDeclaration
- CallExpression
