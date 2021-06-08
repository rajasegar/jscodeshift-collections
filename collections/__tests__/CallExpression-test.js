const Collection = require('jscodeshift/src/Collection');
const recast = require('recast');

const CallExpressionCollection = require('../CallExpression');

CallExpressionCollection.register(Collection);

test('find all call expressions', () => {
  const nodes = [recast.parse(
    'foo()',
    'bar(a,b,c)',
  )];

  const declarators = Collection.fromNodes(nodes).findCallExpressions();
  expect(declarators.getTypes()).toContain('CallExpression');
});


test('find all member expressions', () => {
  const nodes = [recast.parse(
    'foo.bar()',
  )];

  const declarators = Collection.fromNodes(nodes).findCallExpressions('foo.bar');
  expect(declarators.getTypes()).toContain('CallExpression');
});

test('find all nested member expressions', () => {
  const nodes = [recast.parse(
    'foo.bar.baz()',
  )];

  const declarators = Collection.fromNodes(nodes).findCallExpressions('foo.bar.baz');
  expect(declarators.getTypes()).toContain('CallExpression');
});
test('rename call expressions', () => {
  const nodes = [recast.parse(
    'foo()',
    'bar(a,b,c)',
  )];

  Collection.fromNodes(nodes)
    .findCallExpressions('foo')
    .renameTo('xyz');

  const declarators = Collection.fromNodes(nodes).findCallExpressions('xyz');
  expect(declarators.length).toBe(1);
});

test('rename member expressions', () => {
  const nodes = [recast.parse(
    'foo()',
  )];

  Collection.fromNodes(nodes)
    .findCallExpressions('foo')
    .renameTo('foo.bar');

  const callExpressionNode = nodes[0].program.body[0];
  // console.log(callExpressionNode);
  expect(callExpressionNode.expression.callee.object.name).toBe('foo');
  expect(callExpressionNode.expression.callee.property.name).toBe('bar');
});

test('remove params', () => {
  const nodes = [recast.parse(
    'bar(a,b,c)',
  )];

  Collection.fromNodes(nodes)
    .findCallExpressions('bar')
    .removeParam('a');

  const callExpressionNode = nodes[0].program.body[0];
  expect(callExpressionNode.expression.arguments.length).toBe(2);
});

test('add params', () => {
  const nodes = [recast.parse(
    'bar(a,b,c)',
  )];

  Collection.fromNodes(nodes)
    .findCallExpressions('bar')
    .addParam('d');

  const callExpressionNode = nodes[0].program.body[0];
  expect(callExpressionNode.expression.arguments.length).toBe(4);
});
