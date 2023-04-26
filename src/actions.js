const fs = require('fs');
const ini = require('ini');
const { printAllRegistries, getRemoteRegistries } = require('./helpers.js');

function onInit() {
  // TODO: create .nrs and fetch the latest registries, then store them
  // onUpdate()
}

async function onList() {
  const registry = await getRemoteRegistries();

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