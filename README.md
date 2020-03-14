# jscodeshift-collections

Some more Collections for jscodeshift for easy and accessible api for writing Codemods

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
