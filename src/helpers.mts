import execa from 'execa';
import pc from 'picocolors';
import fetch from 'node-fetch';
import { readConfig, writeConfig, printError, } from './utils.mjs';
import { REMOTE_REGISTRY_URL, USER_REGISTRY_KEY, INTERNAL_REGISTRY_KEY, } from './constants.mjs';

async function run(cmd: string) {
  return execa
    .command(cmd)
    .then(result => result.stdout)
    .catch(error => printError(error.shortMessage));
}

async function setCurrentRegistry(registry: string) {
  return run(`npm config set registry=${registry}`);
}

async function getCurrentRegistry() {
  return run(`npm config get registry`);
}

function getRegistryList() {
  const config = readConfig();
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
    return registries as Record<string, string>;
  } catch {
    printError('Failed to fetch remote registries.');
  }
}

function setRegistryList(registryKey: string, registryList: Record<string, string>) {
  const config = readConfig();
  writeConfig({ ...config, [registryKey]: registryList });
}

function convertUrl(url: string) {
  try {
    return new URL(url).href;
  } catch {
    printError(`The url ${pc.underline(url)} is invalid.`);
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
