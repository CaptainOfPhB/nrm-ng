const fs = require('fs');
const ini = require('ini');
const {
  geneDashLine,
  printError,
  printSuccess,
  printMessages,
  readConfig,
  writeConfig,
  exitWhenFileExist
} = require('./utils.js');
const {
  convertUrl,
  setCurrentRegistry,
  getCurrentRegistry,
  getRegistryList,
  setRegistryList,
  getRemoteRegistryList,
} = require('./helpers.js');
const fetch = require('node-fetch');
const { red, yellow, green, bold, underline, bgGreen } = require('picocolors');
const { NRS_CONFIG_FILE_PATH, USER_REGISTRY_KEY, INTERNAL_REGISTRY_KEY } = require('./constants');

async function onInit() {
  // we consider that nrs has been initialized if the .nrsrc existed
  exitWhenFileExist();
  const remoteRegistryList = await getRemoteRegistryList();
  writeConfig({ [INTERNAL_REGISTRY_KEY]: remoteRegistryList });
  printSuccess(`Congratulations, nrs has been initialized. Now, try use ${underline('nrs list')} to see all registryList.`);
}

async function onList() {
  const currentRegistry = await getCurrentRegistry();
  const { registryList, registryNameList } = getRegistryList();
  const dashLineLength = Math.max(...registryNameList.map(key => key.length)) + 5;

  const messages = registryNameList.map(registryName => {
    const registry = registryList[registryName];
    const prefix = convertUrl(registry) === convertUrl(currentRegistry) ? green(bold('-> ')) : '   ';
    return prefix + registryName + geneDashLine(registryName, dashLineLength) + registry;
  });

  printMessages(messages);
}

async function onCurrent() {
  const currentRegistry = await getCurrentRegistry();
  printSuccess(`The current registry is ${underline(currentRegistry)}.`);
}

async function onUse(registryName) {
  const { registryList, registryNameList } = getRegistryList();
  if (!registryNameList.includes(registryName)) {
    printError(`The registry name ${underline(registryName)} is not existed.`)
  }
  const registry = registryList[registryName];
  await setCurrentRegistry(registry);
  printSuccess(`The registry has been set to ${underline(registryName)}(${registry}).`);
}

function onAdd(registryName, registry) {
  const { userRegistryList, registryUrlList, registryNameList } = getRegistryList();
  if (registryUrlList.includes(convertUrl(registry))) {
    printError(`The registry url ${underline(registry)} is already existed.`)
  }
  if (registryNameList.includes(registryName)) {
    printError(`The registry name ${underline(registryName)} is already existed.`)
  }
  userRegistryList[registryName] = convertUrl(registry);
  setRegistryList(USER_REGISTRY_KEY, userRegistryList);
  printSuccess(`The registry ${underline(registryName)}(${registry}) has been added.`);
}

async function onDelete(registryName) {
  const currentRegistry = await getCurrentRegistry();
  const { registryList, internalRegistryNameList, userRegistryNameList, userRegistryList } = getRegistryList();
  if (internalRegistryNameList.includes(registryName)) {
    printError(`The registry ${underline(registryName)}(${registryList[registryName]}) is an internal registry, you can't delete it.`)
  }
  if (!userRegistryNameList.includes(registryName)) {
    printError(`The registry ${underline(registryName)} is not existed.`)
  }
  if (currentRegistry === userRegistryList[registryName]) {
    printError(`The registry ${underline(registryName)}(${registryList[registryName]}) is in use, you can't delete it.`);
  }
  delete userRegistryList[registryName];
  setRegistryList(USER_REGISTRY_KEY, userRegistryList);
  printSuccess(`The registry ${underline(registryName)}(${registryList[registryName]}) has been deleted.`);
}

async function onUpdate() {
  const remoteRegistryList = await getRemoteRegistryList();
  setRegistryList(INTERNAL_REGISTRY_KEY, remoteRegistryList);
  printSuccess('The internal registry list is up to date.');
}

async function onTest() {
  const { internalRegistryList, internalRegistryNameList } = getRegistryList();

  const results = await Promise.all(
    Object
      .entries(internalRegistryList)
      .map(async function ([registryName, registryUrl]) {
        let ok = false;
        const start = Date.now();

        try {
          const response = await fetch(registryUrl + 'node', { timeout: 2000 });
          ok = response.ok;
        } finally {
          return { registryUrl, registryName, ok, time: Date.now() - start };
        }
      })
  );

  let fastestTime = 10000;
  results.forEach(it => {
    if (it.ok && it.time < fastestTime) {
      fastestTime = it.time;
    }
  })

  const messages = [];
  const currentRegistry = await getCurrentRegistry();

  const length = Math.max(...internalRegistryNameList.map(name => name.length)) + 3;
  results.forEach(({ registryUrl, registryName, ok, time }) => {
    const prefix = registryUrl === currentRegistry ? green('-> ') : '   ';
    let suffix = time === fastestTime ? `${time} ms ${green(`<-- fastest`)}` : `${time} ms`;
    if (!ok) {
      suffix += red(' failed');
    }
    messages.push(prefix + registryName + geneDashLine(registryName, length) + suffix);
  });

  printMessages(messages);
}

module.exports = {
  onInit,
  onList,
  onCurrent,
  onUse,
  onAdd,
  onDelete,
  onUpdate,
  onTest,
};