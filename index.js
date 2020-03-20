const FunctionDeclarationCollection = require('./collections/FunctionDeclaration');
const CallExpressionCollection = require('./collections/CallExpression');

function registerCollections() {
  FunctionDeclarationCollection.register();
}

module.exports = {
  registerCollections,
  FunctionDeclarationCollection,
  CallExpressionCollection,
};
