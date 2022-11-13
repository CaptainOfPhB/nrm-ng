const { getCurrentRegistry } = require('./helper');

async function onList() {
  const registry = await getCurrentRegistry();
  if (!registry) return;
  console.log(registry);
}

function onUse() {
  console.log('onUse');
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