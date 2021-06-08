const NodeCollection = require('jscodeshift/src/collections/Node');
const once = require('jscodeshift/src/utils/once');
const recast = require('recast');
const j = require('jscodeshift');

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

  addParam(param) {
    return this.forEach((path) => {
      path.value.params.push(j.identifier(param));
    });
  },

  removeParam(param) {
    return this.forEach((path) => {
      const newParams = path.value.params.filter((p) => p.name !== param);
      path.value.params = newParams; // eslint-disable-line
    });
  },
};

function register(jscodeshift) {
  NodeCollection.register();
  jscodeshift.registerMethods(globalMethods);
  jscodeshift.registerMethods(transformMethods, FunctionDeclaration);
}

exports.register = once(register);
