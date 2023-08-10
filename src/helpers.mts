import fs from 'fs';
import ini from 'ini';
import fetch from 'node-fetch';
import { error, exit, print } from './utils.mjs';
import { REMOTE_REGISTRY_URL, NRM_CONFIG_FILE_PATH, NPM_CONFIG_FILE_PATH } from './constants.mjs';

function setCurrentRegistry(registry: string) {
  const npmrc = read<Record<string, unknown>>(NPM_CONFIG_FILE_PATH);
  const content = npmrc || {};
  content.registry = registry;
  write(NPM_CONFIG_FILE_PATH, content);
}

function getCurrentRegistry() {
  const content = read<{ registry: string }>(NPM_CONFIG_FILE_PATH);
  return content?.registry;
}

function getLocalRegistries() {
  const registries = read<Registry>(NRM_CONFIG_FILE_PATH) || {};
  const [registryNames, registryUrls] = Object.entries(registries).reduce<[string[], string[]]>(
    ([names, urls], [key, value]) => ([names.concat(key), urls.concat(value.registry)]),
    [[], []],
  );
  return { registries, registryUrls, registryNames };
}

function setLocalRegistries(registries: Registry) {
  write(NRM_CONFIG_FILE_PATH, registries);
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

function read<T = unknown>(filepath: string) {
  try {
    const iniContent = fs.readFileSync(filepath, 'utf-8');
    const jsonContent = ini.parse(iniContent);
    return jsonContent as T;
  } catch (e) {
    if (!isNrmrcExist()) {
      print('Did you forget to run \'nrm init\' to initialize nrm-ng?\n');
    }
    print(error(`Failed to read config file '${filepath}'.`));
    exit((e as Error).message);
  }
}

function write(filepath: string, content: unknown) {
  try {
    fs.writeFileSync(filepath, ini.encode(content));
  } catch (e) {
    print(error(`Failed to write config file '${filepath}'.`));
    exit((e as Error).message);
  }
}

function isNrmrcExist() {
  return fs.existsSync(NRM_CONFIG_FILE_PATH);
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
  isNrmrcExist,
  tryNormalizeUrl,
  setCurrentRegistry,
  getCurrentRegistry,
  getLocalRegistries,
  setLocalRegistries,
  getRemoteRegistries,
};
