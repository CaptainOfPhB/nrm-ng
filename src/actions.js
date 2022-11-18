const { printAllRegistries } = require('./helpers');

async function onList() {
  printAllRegistries();
}

function onUse(name, scope) {
  console.log(name, scope)
}

function onAdd(name, registry) {
  console.log(name, registry);
}

function onDelete(name) {
  console.log('onDelete', name);
}

function onUpdate() {
  console.log('onUpdate');
}

function onTest() {
  console.log('onTest');
}

module.exports = {
  onList,
  onUse,
  onAdd,
  onDelete,
  onUpdate,
  onTest,
};