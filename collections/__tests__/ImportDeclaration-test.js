/* globals test expect */

const Collection = require('jscodeshift/src/Collection');
const recast = require('recast');

const ImportDeclarationCollection = require('../ImportDeclaration');

ImportDeclarationCollection.register(Collection);

test('find all import declarations', () => {
  const nodes = [recast.parse('function foo() {}', 'import a from "a"')];
  const declarators = Collection.fromNodes(nodes).findImportDeclarations();
  expect(declarators.getTypes()).toContain('ImportDeclaration');
});

test('rename import declarations', () => {
  const nodes = [recast.parse('import a from "a"')];
  Collection.fromNodes(nodes).findImportDeclarations('a').renameTo('xyz');

  const firstNode = nodes[0].program.body[0];
  expect(firstNode.source.value).toBe('xyz');
});

test('remove specifiers', () => {
  const nodes = [recast.parse('import { a, b } from "a"')];
  Collection.fromNodes(nodes).findImportDeclarations('a').removeSpecifier('a');

  const firstNode = nodes[0].program.body[0];
  expect(firstNode.specifiers.length).toBe(1);
});

test('add specifiers', () => {
  const nodes = [recast.parse('import { a, b } from "a"')];
  Collection.fromNodes(nodes).findImportDeclarations('a').addSpecifier('c');

  const firstNode = nodes[0].program.body[0];
  expect(firstNode.specifiers.length).toBe(3);
});
