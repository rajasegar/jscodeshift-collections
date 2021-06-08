const NodeCollection = require('jscodeshift/src/collections/Node');
const once = require('jscodeshift/src/utils/once');
const recast = require('recast');
const j = require('jscodeshift');

const { CallExpression } = recast.types.namedTypes;

function memberExpressionFilter(name) {
  const parts = name.split('.');
  if (parts.length === 2) {
    return {
      object: { name: parts[0] },
      property: { name: parts[1] },
    };
  }
  const exceptLast = parts.slice(0, parts.length - 1);
  return {
    object: memberExpressionFilter(exceptLast.join('.')),
    property: { name: parts[parts.length - 1] },
  };
}

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
    const callees = name ? name.split('.') : [];
    let filter;
    if (callees.length === 1) {
      filter = { callee: { name } };
    } else if (callees.length > 1) {
      filter = { callee: memberExpressionFilter(name) };
    } else {
      filter = null;
    }
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
    const isMemberExpression = newName.includes('.');
    return this.forEach((path) => {
      const node = path.value;
      if (isMemberExpression) {
        const [object, property] = newName.split('.');
        node.callee = j.memberExpression(
          j.identifier(object),
          j.identifier(property)
        );
      } else {
        node.callee.name = newName;
      }
    });
  },

  addParam(param) {
    return this.forEach((path) => {
      path.value.arguments.push(j.identifier(param));
    });
  },

  removeParam(param) {
    return this.forEach((path) => {
      const newParams = path.value.arguments.filter((p) => p.name !== param);
      path.value.arguments = newParams; // eslint-disable-line
    });
  },
};

function register(jscodeshift) {
  NodeCollection.register();
  jscodeshift.registerMethods(globalMethods);
  jscodeshift.registerMethods(transformMethods, CallExpression);
}

exports.register = once(register);
