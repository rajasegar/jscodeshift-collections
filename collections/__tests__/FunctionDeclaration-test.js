const Collection = require('jscodeshift/src/Collection');
const recast = require('recast');


const nodes = [recast.parse(
  'function foo() {}',
  'function bar(a,b,c) {}',
)];

const FunctionDeclarationCollection = require('../FunctionDeclaration');

FunctionDeclarationCollection.register();

test('find all function declarations', () => {
  const declarators = Collection.fromNodes(nodes).findFunctionDeclarations();
  expect(declarators.getTypes()).toContain('FunctionDeclaration');
});


test('rename function declarations', () => {
  Collection.fromNodes(nodes)
    .findFunctionDeclarations('foo')
    .renameTo('xyz');

  const declarators = Collection.fromNodes(nodes).findFunctionDeclarations('xyz');
  expect(declarators.length).toBe(1);
});
