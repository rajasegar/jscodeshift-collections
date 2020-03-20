const FunctionDeclarationCollection = require('./collections/FunctionDeclaration');
const CallExpressionCollection = require('./collections/CallExpression');

function registerCollections() {
  FunctionDeclarationCollection.register();
  CallExpressionCollection.register();
}

module.exports = {
  registerCollections,
  FunctionDeclarationCollection,
  CallExpressionCollection,
};
