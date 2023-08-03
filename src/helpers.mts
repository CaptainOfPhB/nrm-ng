import fs from 'fs';
import ini from 'ini';
import fetch from 'node-fetch';
import { run, error, exit, print } from './utils.mjs';
import { REMOTE_REGISTRY_URL, NRM_CONFIG_FILE_PATH } from './constants.mjs';

async function setCurrentRegistry(registry: string) {
  return run(`npm set registry ${registry}`);
}

async function getCurrentRegistry() {
  return run(`npm get registry`);
}

function getLocalRegistries() {
  const registries = read() || {};
  const [registryNames, registryUrls] = Object.entries(registries).reduce<[string[], string[]]>(
    ([names, urls], [key, value]) => ([names.concat(key), urls.concat(value.registry)]),
    [[], []],
  );
  return { registries, registryUrls, registryNames };
}

function setLocalRegistries(registries: Registry) {
  write(registries);
}

async function getRemoteRegistries() {
  try {
    const response = await fetch(REMOTE_REGISTRY_URL);
    const registries = await response.json();
    return registries as Registry;
  } catch {
    exit('Failed to fetch remote registry list, please try again later.');
  }
}

function read() {
  try {
    const iniContent = fs.readFileSync(NRM_CONFIG_FILE_PATH, 'utf-8');
    const jsonContent = ini.parse(iniContent);
    return jsonContent as Registry;
  } catch (e) {
    print(error(`Failed to read config file '${NRM_CONFIG_FILE_PATH}'.`));
    if (e instanceof ReferenceError) {
      print(error('Please run \'nrm init\' to initialize nrm-ng.'));
    }
    exit((e as Error).message);
  }
}

function write(content: Registry) {
  try {
    fs.writeFileSync(NRM_CONFIG_FILE_PATH, ini.encode(content));
  } catch (e) {
    print(error(`Failed to write config file '${NRM_CONFIG_FILE_PATH}'.`));
    exit((e as Error).message);
  }
}

function tryNormalizeUrl(url: string) {
  try {
    return new URL(url).href;
  } catch {
    exit(`The url '${url}' is invalid.`);
  }
}

export {
  read,
  write,
  tryNormalizeUrl,
  setCurrentRegistry,
  getCurrentRegistry,
  getLocalRegistries,
  setLocalRegistries,
  getRemoteRegistries,
};
