const FunctionDeclarationCollection = require('./collections/FunctionDeclaration');
const CallExpressionCollection = require('./collections/CallExpression');

function registerCollections(jscodeshift) {
  FunctionDeclarationCollection.register(jscodeshift);
  CallExpressionCollection.register(jscodeshift);
}

module.exports = {
  registerCollections,
  FunctionDeclarationCollection,
  CallExpressionCollection,
};
