const Collection = require('jscodeshift/src/Collection');
const recast = require('recast');

const types = recast.types.namedTypes;


const FunctionDeclarationCollection = require('../FunctionDeclaration');

FunctionDeclarationCollection.register();

test('find all function declarations', () => {
  const nodes = [recast.parse(
    'function foo() {}',
    'var a = 1',
  )];
  const declarators = Collection.fromNodes(nodes).findFunctionDeclarations();
  expect(declarators.getTypes()).toContain('FunctionDeclaration');
});


test('rename function declarations', () => {
  const nodes = [recast.parse(
    'function foo() {}',
    'function bar(a,b,c) {}',
  )];
  Collection.fromNodes(nodes)
    .findFunctionDeclarations('foo')
    .renameTo('xyz');

  const declarators = Collection.fromNodes(nodes).findFunctionDeclarations('xyz');
  expect(declarators.length).toBe(1);
});

test('remove params', () => {
  const nodes = [recast.parse(
    'function foo() {}',
    'function bar(a,b,c) {}',
  )];
  Collection.fromNodes(nodes)
    .findFunctionDeclarations('bar')
    .removeParam('a');

  const declarators = Collection.fromNodes(nodes).find(types.Identifier, { name: 'a' });
  expect(declarators.length).toBe(0);
});

test('add params', () => {
  const nodes = [recast.parse(
    'function bar(a,b,c) {}',
  )];
  Collection.fromNodes(nodes)
    .findFunctionDeclarations('bar')
    .addParam('d');

  const firstNode = nodes[0].program.body[0];
  expect(firstNode.params.length).toBe(4);
});
