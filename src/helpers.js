const fs = require('fs');
const fetch = require('node-fetch');
const { bold, green } = require('picocolors');
const { command, Options } = require('execa');
const { readConfig, isLowerCaseEqual, geneDashLine, printError, printMessages } = require('./utils');
const { INTERNAL_REGISTRY_KEY, NRS_CONFIG_FILE_PATH, REMOTE_REGISTRY_URL, USER_REGISTRY_KEY } = require('./constants');

async function run(cmd, options) {
  return command(cmd, options)
    .then(result => result.stdout)
    .catch(error => {
      printError(error.shortMessage);
      return '';
    });
}

async function getCurrentRegistry() {
  return run(`npm config get registry`);
}

function getLocalRegistries() {
  const registries = readConfig(NRS_CONFIG_FILE_PATH);
  return { ...registries[USER_REGISTRY_KEY], ...registries[INTERNAL_REGISTRY_KEY] }
}

async function getRemoteRegistries() {
  try {
    const response = await fetch(REMOTE_REGISTRY_URL);
    const registries = await response.json();
    return registries;
  } catch {
    printError('Failed to fetch remote registries.', 'ERROR_FAILED_FETCH');
  }
}

async function printAllRegistries() {
  const registries = await getLocalRegistries();
  const currentRegistry = await getCurrentRegistry();
  const registryNames = Object.keys(registries);
  const dashLineLength = Math.max(...registryNames.map(key => key.length)) + 5;

  const messages = registryNames.map(registryName => {
    const registry = registries[registryName];
    const prefix = isLowerCaseEqual(registry, currentRegistry ?? undefined) ? green(bold('-> ')) : '   ';
    return prefix + registryName + geneDashLine(registryName, dashLineLength) + registry;
  });

  printMessages(messages);
}

module.exports = {
  printAllRegistries,
  getCurrentRegistry,
  getLocalRegistries,
  getRemoteRegistries,
};
