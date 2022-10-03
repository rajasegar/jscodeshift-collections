const NodeCollection = require('jscodeshift/src/collections/Node');
const once = require('jscodeshift/src/utils/once');
const recast = require('recast');

const { ClassDeclaration } = recast.types.namedTypes;

/**
 * @mixin
 */
const globalMethods = {
  /**
   * Finds all class declarations by class name.
   *
   * @param {string} name
   * @return {Collection}
   */
  findClassDeclarations(name = null) {
    let filter;
    if (name) {
      filter = { id: { name } };
    } else {
      filter = null;
    }
    return this.find(ClassDeclaration, filter);
  },
};

/**
 * @mixin
 */
const transformMethods = {
  /**
   * Renames a class declaration
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

function register(jscodeshift) {
  NodeCollection.register();
  jscodeshift.registerMethods(globalMethods);
  jscodeshift.registerMethods(transformMethods, ClassDeclaration);
}

exports.register = once(register);
