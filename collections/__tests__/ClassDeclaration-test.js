/* globals test expect */
const Collection = require('jscodeshift/src/Collection');
const recast = require('recast');

const ClassDeclarationCollection = require('../ClassDeclaration');

ClassDeclarationCollection.register(Collection);

test('find all class declarations', () => {
  const nodes = [
    recast.parse(
      'class Component extends BaseComponent {}',
      'class HTMLElement {}'
    ),
  ];

  const declarators = Collection.fromNodes(nodes).findClassDeclarations();
  expect(declarators.getTypes()).toContain('ClassDeclaration');
});

test('rename class declarations', () => {
  const nodes = [
    recast.parse('class foo extends BaseComponent {}', 'class HTMLElement {}'),
  ];
  Collection.fromNodes(nodes).findClassDeclarations('foo').renameTo('bar');

  const declarators = Collection.fromNodes(nodes).findClassDeclarations('bar');
  expect(declarators.length).toBe(1);
});
