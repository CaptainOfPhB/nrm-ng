const { command } = require('execa')

function onList() {
  command('npm config get registry')
    .then(output => {
      console.log(output);
      console.log(output.stdout);
    })
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
}