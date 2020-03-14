const Collection = require('jscodeshift/src/Collection');
const NodeCollection = require('jscodeshift/src/collections/Node');
const once = require('jscodeshift/src/utils/once');
const recast = require('recast');

const types = recast.types.namedTypes;

const { FunctionDeclaration } = recast.types.namedTypes;

/**
* @mixin
*/
const globalMethods = {
  /**
   * Finds all function declarations, optionally filtered by name.
   *
   * @param {string} name
   * @return {Collection}
   */
  findFunctionDeclarations(name) {
    const filter = name ? { id: { name } } : null;
    return this.find(FunctionDeclaration, filter);
  },
};

/**
* @mixin
*/
const transformMethods = {
  /**
   * Renames a function declaration
   *
   * @param {string} newName
   * @return {Collection}
   */
  renameTo(newName) {
    return this.forEach((path) => {
      const node = path.value;
      node.id.name = newName;
    });
  },
};

function register() {
  NodeCollection.register();
  Collection.registerMethods(globalMethods);
  Collection.registerMethods(transformMethods, FunctionDeclaration);
}

exports.register = once(register);
