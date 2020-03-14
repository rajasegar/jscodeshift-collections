const Collection = require('jscodeshift/src/Collection');
const recast = require('recast');


const nodes = [recast.parse(
  'function foo() {}',
  'function bar(a,b,c) {}',
)];

console.log(recast.print(nodes[0]));
const FunctionDeclarationCollection = require('./collections/FunctionDeclaration');

FunctionDeclarationCollection.register();


const declarators = Collection.fromNodes(nodes).findFunctionDeclarations();

console.log('Length', declarators.length);

Collection.fromNodes(nodes)
  .findFunctionDeclarations('foo')
  .renameTo('xyz');


console.log(recast.print(nodes[0]));
