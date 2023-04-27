const fs = require('fs');
const ini = require('ini');
const { underline } = require('picocolors');
const { printAllRegistries, getRemoteRegistries } = require('./helpers.js');
const { NRS_CONFIG_FILE_PATH, INTERNAL_REGISTRY_KEY } = require('./constants');
const { printSuccess, printError, readConfig, writeConfig, exitWhenFileExist } = require('./utils.js');

async function onInit() {
  // we consider that nrs has been initialized if the .nrsrc existed
  exitWhenFileExist();
  const remoteRegistries = await getRemoteRegistries();
  writeConfig({ [INTERNAL_REGISTRY_KEY]: remoteRegistries });
  printSuccess(`Congratulations, nrs has been initialized. Now, try use ${underline('nrs list')} to see all registries.`);
}

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

async function onUpdate() {
  const remoteRegistries = await getRemoteRegistries();
  const config = readConfig();
  writeConfig({ ...config, [INTERNAL_REGISTRY_KEY]: remoteRegistries });
  printSuccess('The internal registry list updated successfully.');
}

function onTest() {
  console.log('onTest');
}

module.exports = {
  onInit,
  onList,
  onUse,
  onAdd,
  onDelete,
  onUpdate,
  onTest,
};