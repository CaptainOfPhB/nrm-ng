const fs = require('fs');
const {
  readConfig,
  writeConfig,
  isLowerCaseEqual,
  geneDashLine,
  printError,
  printMessages,
} = require('./utils');
const {
  NRS_CONFIG_FILE_PATH,
  REMOTE_REGISTRY_URL,
  USER_REGISTRY_KEY,
  INTERNAL_REGISTRY_KEY,
} = require('./constants');
const fetch = require('node-fetch');
const { command, Options } = require('execa');
const { bold, green, underline } = require('picocolors');

async function run(cmd, options) {
  return command(cmd, options)
    .then(result => result.stdout)
    .catch(error => printError(error.shortMessage));
}

async function setCurrentRegistry(registry) {
  return run(`npm config set registry=${registry}`);
}

async function getCurrentRegistry() {
  return run(`npm config get registry`);
}

function getRegistryList() {
  const config = readConfig(NRS_CONFIG_FILE_PATH);
  const userRegistryList = config[USER_REGISTRY_KEY] || {};
  const internalRegistryList = config[INTERNAL_REGISTRY_KEY];
  const registryList = { ...userRegistryList, ...internalRegistryList };
  return {
    registryList,
    registryUrlList: Object.values(registryList),
    registryNameList: Object.keys(registryList),
    userRegistryList,
    userRegistryUrlList: Object.values(userRegistryList),
    userRegistryNameList: Object.keys(userRegistryList),
    internalRegistryList,
    internalRegistryUrlList: Object.values(internalRegistryList),
    internalRegistryNameList: Object.keys(internalRegistryList),
  }
}

async function getRemoteRegistryList() {
  try {
    const response = await fetch(REMOTE_REGISTRY_URL);
    const registries = await response.json();
    return registries;
  } catch {
    printError('Failed to fetch remote registries.');
  }
}

function setRegistryList(registryKey, registryList) {
  const config = readConfig();
  writeConfig({ ...config, [registryKey]: registryList });
}

function convertUrl(string) {
  try {
    const url = new URL(string);
    return url.href;
  } catch {
    printError(`The url ${underline(string)} is invalid.`);
  }
}

module.exports = {
  setCurrentRegistry,
  getCurrentRegistry,
  getRegistryList,
  setRegistryList,
  getRemoteRegistryList,
  convertUrl,
};
