const fs = require('fs');
const ini = require('ini');
const fetch = require('node-fetch');
const { error, exit, print } = require('./utils');
const { REMOTE_REGISTRY_URL, NRM_CONFIG_FILE_PATH, NPM_CONFIG_FILE_PATH } = require('./constants');

function setCurrentRegistry(registry) {
  const npmrc = read(NPM_CONFIG_FILE_PATH);
  const content = npmrc || {};
  content.registry = registry;
  write(NPM_CONFIG_FILE_PATH, content);
}

function getCurrentRegistry() {
  const content = read(NPM_CONFIG_FILE_PATH);
  return content.registry;
}

function getLocalRegistries() {
  const registries = read(NRM_CONFIG_FILE_PATH) || {};
  const [registryNames, registryUrls] = Object.entries(registries).reduce(
    ([names, urls], [key, value]) => ([names.concat(key), urls.concat(value.registry)]),
    [[], []],
  );
  return { registries, registryUrls, registryNames };
}

function setLocalRegistries(registries) {
  write(NRM_CONFIG_FILE_PATH, registries);
}

async function getRemoteRegistries() {
  try {
    const response = await fetch(REMOTE_REGISTRY_URL);
    const registries = await response.json();
    return registries;
  } catch {
    exit('Failed to fetch remote registry list, please try again later.');
  }
}

function read(filepath) {
  try {
    const iniContent = fs.readFileSync(filepath, 'utf-8');
    const jsonContent = ini.parse(iniContent);
    return jsonContent;
  } catch (e) {
    if (!isNrmrcExist()) {
      print('Did you forget to run \'nrm init\' to initialize nrm-ng?\n');
    }
    exit(e.message);
  }
}

function write(filepath, content) {
  try {
    fs.writeFileSync(filepath, ini.encode(content));
  } catch (e) {
    print(error(`Failed to write config file '${filepath}'.`));
    exit(e.message);
  }
}

function isNrmrcExist() {
  return fs.existsSync(NRM_CONFIG_FILE_PATH);
}

function tryNormalizeUrl(url) {
  try {
    return new URL(url).href;
  } catch {
    exit(`The url '${url}' is invalid.`);
  }
}

module.exports = {
  isNrmrcExist,
  tryNormalizeUrl,
  setCurrentRegistry,
  getCurrentRegistry,
  getLocalRegistries,
  setLocalRegistries,
  getRemoteRegistries,
};
