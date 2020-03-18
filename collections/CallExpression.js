const Collection = require('jscodeshift/src/Collection');
const NodeCollection = require('jscodeshift/src/collections/Node');
const once = require('jscodeshift/src/utils/once');
const recast = require('recast');
const j = require('jscodeshift');

const { CallExpression } = recast.types.namedTypes;

/**
* @mixin
*/
const globalMethods = {
  /**
   * Finds all call expressions optionally filtered by name.
   *
   * @param {string} name
   * @return {Collection}
   */
  findCallExpressions(name) {
    const filter = name ? { callee: { name } } : null;
    return this.find(CallExpression, filter);
  },
};

/**
* @mixin
*/
const transformMethods = {
  /**
   * Renames a call expression
   *
   * @param {string} newName
   * @return {Collection}
   */
  renameTo(newName) {
    return this.forEach((path) => {
      const node = path.value;
      node.callee.name = newName;
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
      path.value.params = newParams;
    });
  },
};

function register() {
  NodeCollection.register();
  Collection.registerMethods(globalMethods);
  Collection.registerMethods(transformMethods, CallExpression);
}

exports.register = once(register);
