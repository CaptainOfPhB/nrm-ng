import fs from 'fs';
import ini from 'ini';
import pc from 'picocolors';
import fetch from 'node-fetch';
import { run, printError } from './utils.mjs';
import { REMOTE_REGISTRY_URL, USER_REGISTRY_KEY, INTERNAL_REGISTRY_KEY, NRS_CONFIG_FILE_PATH, } from './constants.mjs';

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

function readConfig() {
  if (!fs.existsSync(NRS_CONFIG_FILE_PATH)) {
    printError(`File ${pc.underline(NRS_CONFIG_FILE_PATH)} does not exist. Do you forget to run ${pc.underline('nrm init')}?`);
  }
  const iniContent = fs.readFileSync(NRS_CONFIG_FILE_PATH, 'utf-8');
  const jsonContent = ini.parse(iniContent);
  return jsonContent;
}

function writeConfig(content: Record<string, Record<string, string>>) {
  fs.writeFileSync(NRS_CONFIG_FILE_PATH, ini.encode(content));
}

export {
  setCurrentRegistry,
  getCurrentRegistry,
  getRegistryList,
  setRegistryList,
  getRemoteRegistryList,
  convertUrl,
  readConfig,
  writeConfig,
};
