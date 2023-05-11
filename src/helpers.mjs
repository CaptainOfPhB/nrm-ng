import fs from 'fs';
import{
  readConfig,
  writeConfig,
  isLowerCaseEqual,
  geneDashLine,
  printError,
  printMessages,
} from './utils.mjs';
import{
  NRS_CONFIG_FILE_PATH,
  REMOTE_REGISTRY_URL,
  USER_REGISTRY_KEY,
  INTERNAL_REGISTRY_KEY,
} from './constants.mjs';
import execa from 'execa';
import pc from 'picocolors';
import fetch from 'node-fetch';

async function run(cmd, options) {
  return execa.command(cmd, options)
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
    printError(`The url ${pc.underline(string)} is invalid.`);
  }
}

export {
  setCurrentRegistry,
  getCurrentRegistry,
  getRegistryList,
  setRegistryList,
  getRemoteRegistryList,
  convertUrl,
};
