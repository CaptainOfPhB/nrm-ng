import fs from 'fs';
import {
  convertUrl,
  writeConfig,
  setCurrentRegistry,
  getCurrentRegistry,
  getRegistryList,
  setRegistryList,
  getRemoteRegistryList,
} from './helpers.mjs';
import pc from 'picocolors';
import fetch from 'node-fetch';
import { geneDashLine, printError, printSuccess, printMessages } from './utils.mjs';
import { USER_REGISTRY_KEY, NRS_CONFIG_FILE_PATH, INTERNAL_REGISTRY_KEY } from './constants.mjs';

async function onInit() {
  // we consider that nrs has been initialized if the .nrsrc existed
  if (fs.existsSync(NRS_CONFIG_FILE_PATH)) {
    printError('The nrs has already been initialized.');
  }
  const remoteRegistryList = await getRemoteRegistryList();
  writeConfig({ [INTERNAL_REGISTRY_KEY]: remoteRegistryList! });
  printSuccess(`Congratulations, nrs has been initialized. Now, try use ${pc.underline('nrs list')} to see all registryList.`);
}

async function onList() {
  const currentRegistry = await getCurrentRegistry();
  const { registryList, registryNameList } = getRegistryList();
  const dashLineLength = Math.max(...registryNameList.map(key => key.length)) + 5;

  const messages = registryNameList.map(registryName => {
    const registry = registryList[registryName];
    const prefix = convertUrl(registry) === convertUrl(currentRegistry!) ? pc.green(pc.bold('-> ')) : '   ';
    return prefix + registryName + geneDashLine(registryName, dashLineLength) + registry;
  });

  printMessages(messages);
}

async function onCurrent() {
  const currentRegistry = await getCurrentRegistry();
  printSuccess(`The current registry is ${pc.underline(currentRegistry!)}.`);
}

async function onUse(registryName: string) {
  const { registryList, registryNameList } = getRegistryList();
  if (!registryNameList.includes(registryName)) {
    printError(`The registry name ${pc.underline(registryName)} is not existed.`)
  }
  const registry = registryList[registryName];
  await setCurrentRegistry(registry);
  printSuccess(`The registry has been set to ${pc.underline(registryName)}(${registry}).`);
}

function onAdd(registryName: string, registry: string) {
  const { userRegistryList, registryUrlList, registryNameList } = getRegistryList();
  if (registryUrlList.includes(convertUrl(registry))) {
    printError(`The registry url ${pc.underline(registry)} is already existed.`)
  }
  if (registryNameList.includes(registryName)) {
    printError(`The registry name ${pc.underline(registryName)} is already existed.`)
  }
  userRegistryList[registryName] = convertUrl(registry);
  setRegistryList(USER_REGISTRY_KEY, userRegistryList);
  printSuccess(`The registry ${pc.underline(registryName)}(${registry}) has been added.`);
}

async function onDelete(registryName: string) {
  const currentRegistry = await getCurrentRegistry();
  const { registryList, internalRegistryNameList, userRegistryNameList, userRegistryList } = getRegistryList();
  if (internalRegistryNameList.includes(registryName)) {
    printError(`The registry ${pc.underline(registryName)}(${registryList[registryName]}) is an internal registry, you can't delete it.`)
  }
  if (!userRegistryNameList.includes(registryName)) {
    printError(`The registry ${pc.underline(registryName)} is not existed.`)
  }
  if (currentRegistry === userRegistryList[registryName]) {
    printError(`The registry ${pc.underline(registryName)}(${registryList[registryName]}) is in use, you can't delete it.`);
  }
  delete userRegistryList[registryName];
  setRegistryList(USER_REGISTRY_KEY, userRegistryList);
  printSuccess(`The registry ${pc.underline(registryName)}(${registryList[registryName]}) has been deleted.`);
}

async function onUpdate() {
  const remoteRegistryList = await getRemoteRegistryList();
  setRegistryList(INTERNAL_REGISTRY_KEY, remoteRegistryList!);
  printSuccess('The internal registry list is up to date.');
}

async function onPing() {
  const { internalRegistryList, internalRegistryNameList } = getRegistryList();

  const results = await Promise.all(
    Object
      .entries(internalRegistryList)
      .map(async function ([registryName, registryUrl]) {
        let ok = false;
        const start = Date.now();

        try {
          const response = await fetch(registryUrl + 'node');
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

  const messages: string[] = [];
  const currentRegistry = await getCurrentRegistry();

  const length = Math.max(...internalRegistryNameList.map(name => name.length)) + 3;
  results.forEach(({ registryUrl, registryName, ok, time }) => {
    const prefix = registryUrl === currentRegistry ? pc.green('-> ') : '   ';
    let suffix = time === fastestTime ? `${time} ms ${pc.green(`<-- fastest`)}` : `${time} ms`;
    if (!ok) {
      suffix += pc.red(' failed');
    }
    messages.push(prefix + registryName + geneDashLine(registryName, length) + suffix);
  });

  printMessages(messages);
}

export {
  onInit,
  onList,
  onCurrent,
  onUse,
  onAdd,
  onDelete,
  onUpdate,
  onPing,
};