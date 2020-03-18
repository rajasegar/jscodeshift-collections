const Collection = require('jscodeshift/src/Collection');
const recast = require('recast');

const types = recast.types.namedTypes;

const nodes = [recast.parse(
  'foo()',
  'bar(a,b,c)',
)];

const CallExpressionCollection = require('../CallExpression');

CallExpressionCollection.register();

test('find all call expressions', () => {
  const declarators = Collection.fromNodes(nodes).findCallExpressions();
  expect(declarators.getTypes()).toContain('CallExpression');
});


test('rename call expressions', () => {
  Collection.fromNodes(nodes)
    .findCallExpressions('foo')
    .renameTo('xyz');

  const declarators = Collection.fromNodes(nodes).findCallExpressions('xyz');
  expect(declarators.length).toBe(1);
});

test('remove params', () => {
  Collection.fromNodes(nodes)
    .findCallExpressions('bar')
    .removeParam('a');

  const identifiers = Collection.fromNodes(nodes).find(types.Identifier, { name: 'a' });
  expect(identifiers.length).toBe(0);
});

test('add params', () => {
  Collection.fromNodes(nodes)
    .findCallExpressions('bar')
    .addParam('d');

  const declarators = Collection.fromNodes(nodes).find(types.Identifier, { name: 'd' });
  expect(declarators.length).toBe(1);
});
