const Collection = require('jscodeshift/src/Collection');
const NodeCollection = require('jscodeshift/src/collections/Node');
const once = require('jscodeshift/src/utils/once');
const recast = require('recast');
const j = require('jscodeshift');

const { ImportDeclaration } = recast.types.namedTypes;

/**
* @mixin
*/
const globalMethods = {
  /**
   * Finds all import declarations, optionally filtered by source.
   *
   * @param {string} name
   * @return {Collection}
   */
  findImportDeclarations(name) {
    const filter = name ? { source: { value: name } } : null;
    return this.find(ImportDeclaration, filter);
  },
};

/**
* @mixin
*/
const transformMethods = {
  /**
   * Renames a source of import declaration
   *
   * @param {string} newName
   * @return {Collection}
   */
  renameTo(newName) {
    return this.forEach((path) => {
      const node = path.value;
      node.source.value = newName;
    });
  },

  addSpecifier(imported, local = undefined) {
    const newLocal = local || imported;
    const newSpecifier = j.importSpecifier(j.identifier(imported), j.identifier(newLocal));
    return this.forEach((path) => {
      path.value.specifiers.push(newSpecifier);
    });
  },

  removeSpecifier(param) {
    return this.forEach((path) => {
      const newSpecifiers = path.value.specifiers.filter((p) => p.imported.name !== param);
      path.value.specifiers = newSpecifiers; // eslint-disable-line
    });
  },
};

function register() {
  NodeCollection.register();
  Collection.registerMethods(globalMethods);
  Collection.registerMethods(transformMethods, ImportDeclaration);
}

exports.register = once(register);
