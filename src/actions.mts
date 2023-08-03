import {
  tryNormalizeUrl,
  getCurrentRegistry,
  setCurrentRegistry,
  getLocalRegistries,
  setLocalRegistries,
  getRemoteRegistries,
} from './helpers.mjs';
import fetch from 'node-fetch';
import { generateDashLine, print, success, exit, error } from './utils.mjs';

async function onInit() {
  console.log('To be implemented');

  // we consider that nrs has been initialized if the .nrsrc existed
  // if (fs.existsSync(NRS_CONFIG_FILE_PATH)) {
  //   printError('The nrs has already been initialized.');
  // }
  // const remoteRegistryList = await getRemoteRegistryList();
  // writeConfig({ [INTERNAL_REGISTRY_KEY]: remoteRegistryList! });
  // printSuccess(`Congratulations, nrs has been initialized. Now, try use ${pc.underline('nrs list')} to see all registryList.`);
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
  print(success(`The current registry is ${currentRegistry}.`));
}

async function onUse(name: string) {
  const { registries, registryNames } = getLocalRegistries();
  if (!registryNames.includes(name)) {
    exit(`The registry name ${name} is not existed.`);
  }
  const target = registries[name];
  await setCurrentRegistry(target.registry);
  print(success(`The registry has been set to '${name}'.`));
}

function onAdd(name: string, url: string) {
  const { registries } = getLocalRegistries();
  const normalizedUrl = tryNormalizeUrl(url)!;
  registries[name].registry = normalizedUrl;
  setLocalRegistries(registries);
  print(success(`The registry ${name} has been added/updated.`));
}

async function onDelete(name: string) {
  const { registries } = getLocalRegistries();
  delete registries[name];
  setLocalRegistries(registries);
  print(success(`The registry '${name}' has been deleted.`));
}

async function onUpdate() {
  const remoteRegistryList = await getRemoteRegistries();
  const { registries } = getLocalRegistries();
  setLocalRegistries({ ...remoteRegistryList, ...registries, });
  print(success('The registry list is up to date.'));
}

async function onPing() {
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
    const prefix = registryUrl === currentRegistry ? success('-> ') : '   ';
    let suffix = time === fastestTime ? `${time} ms ${success(`<-- fastest`)}` : `${time} ms`;
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