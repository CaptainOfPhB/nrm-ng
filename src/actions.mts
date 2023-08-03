import {
  isNrmrcExist,
  tryNormalizeUrl,
  getCurrentRegistry,
  setCurrentRegistry,
  getLocalRegistries,
  setLocalRegistries,
  getRemoteRegistries,
} from './helpers.mjs';
import fetch from 'node-fetch';
import { generateDashLine, print, exit, error } from './utils.mjs';

async function onInit() {
  if (!isNrmrcExist()) {
    setLocalRegistries({});
  }
  onUpdate();
}

async function onList() {
  const currentRegistry = await getCurrentRegistry();
  const { registries, registryNames } = getLocalRegistries();
  const dashLineLength = Math.max(...registryNames.map(nme => nme.length)) + 5;

  const messages = registryNames.map(name => {
    const registry = registries[name].registry;
    const prefix = tryNormalizeUrl(registry) === tryNormalizeUrl(currentRegistry!) ? '-> ' : '   ';
    return prefix + name + generateDashLine(name, dashLineLength) + registry;
  });

  print(messages);
}

async function onCurrent() {
  const currentRegistry = await getCurrentRegistry();
  print(currentRegistry);
}

async function onUse(name: string) {
  const { registries, registryNames } = getLocalRegistries();
  if (!registryNames.includes(name)) {
    exit(`The registry name ${name} is not existed.`);
  }
  const target = registries[name];
  await setCurrentRegistry(target.registry);
}

function onAdd(name: string, url: string) {
  const { registries } = getLocalRegistries();
  const normalizedUrl = tryNormalizeUrl(url)!;
  registries[name] = registries[name] || {};
  registries[name].registry = normalizedUrl;
  setLocalRegistries(registries);
}

async function onDelete(name: string) {
  const { registries } = getLocalRegistries();
  delete registries[name];
  setLocalRegistries(registries);
}

async function onUpdate() {
  const remoteRegistryList = await getRemoteRegistries();
  const { registries } = getLocalRegistries();
  setLocalRegistries({ ...remoteRegistryList, ...registries, });
}

async function onPing() {
  print('This action may take a while, please wait...');

  const { registries, registryNames } = getLocalRegistries();

  const results = await Promise.all(
    Object
      .entries(registries)
      .map(async function ([registryName, { registry: registryUrl }]) {
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

  const length = Math.max(...registryNames.map(name => name.length)) + 3;
  results.forEach(({ registryUrl, registryName, ok, time }) => {
    const prefix = registryUrl === currentRegistry ? '-> ' : '   ';
    let suffix = time === fastestTime ? `${time} ms <- fastest` : `${time} ms`;
    if (!ok) {
      suffix += error(' failed');
    }
    messages.push(prefix + registryName + generateDashLine(registryName, length) + suffix);
  });

  print(messages);
}

export {
  onUse,
  onAdd,
  onInit,
  onList,
  onPing,
  onDelete,
  onUpdate,
  onCurrent,
};