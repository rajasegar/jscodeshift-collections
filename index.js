const FunctionDeclarationCollection = require('./collections/FunctionDeclaration');
const CallExpressionCollection = require('./collections/CallExpression');
const ImportDeclarationCollection = require('./collections/ImportDeclaration');

function registerCollections(jscodeshift) {
  FunctionDeclarationCollection.register(jscodeshift);
  CallExpressionCollection.register(jscodeshift);
  ImportDeclarationCollection.register(jscodeshift);
}

module.exports = {
  registerCollections,
  FunctionDeclarationCollection,
  CallExpressionCollection,
  ImportDeclarationCollection,
};
