const Collection = require('jscodeshift/src/Collection');
const recast = require('recast');

const types = recast.types.namedTypes;

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

test('remove params', () => {
  Collection.fromNodes(nodes)
    .findFunctionDeclarations('bar')
    .removeParam('a');

  const declarators = Collection.fromNodes(nodes).find(types.Identifier, { name: 'a' });
  expect(declarators.length).toBe(0);
});

test('add params', () => {
  Collection.fromNodes(nodes)
    .findFunctionDeclarations('bar')
    .addParam('d');

  const declarators = Collection.fromNodes(nodes).find(types.Identifier, { name: 'd' });
  expect(declarators.length).toBe(1);
});
