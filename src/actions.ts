import { printAllRegistries } from './helpers'
import fs from 'fs'
import ini from 'ini'

function onInit() {
  // TODO: create .nrs and fetch the latest registries, then store them
  // onUpdate()
}

async function onList() {
  // printAllRegistries();
  fs.writeFileSync('xxx', ini.stringify({ internal_registry: { taobao: 'asdfasd' } }));
}

function onUse(name: string, scope: string) {
  console.log(name, scope)
}

function onAdd(name: string, registry: string) {
  console.log(name, registry);
}

function onDelete(name: string) {
  console.log('onDelete', name);
}

function onUpdate() {
  console.log('onUpdate');
}

function onTest() {
  console.log('onTest');
}

export {
  onList,
  onUse,
  onAdd,
  onDelete,
  onUpdate,
  onTest,
};