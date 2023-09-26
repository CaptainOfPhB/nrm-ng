const {
  isNrmrcExist,
  tryNormalizeUrl,
  getCurrentRegistry,
  setCurrentRegistry,
  getLocalRegistries,
  setLocalRegistries,
  getRemoteRegistries,
} = require('./helpers');
const fetch = require('node-fetch');
const { generateDashLine, print, exit, error } = require('./utils');

async function onInit() {
  if (!isNrmrcExist()) {
    setLocalRegistries({});
  }
  onUpdate();
}

function onList() {
  const currentRegistry = getCurrentRegistry();
  const { registries, registryNames } = getLocalRegistries();
  const dashLineLength = Math.max(...registryNames.map(nme => nme.length)) + 5;

  const messages = registryNames.map(name => {
    const registry = registries[name].registry;
    const prefix = currentRegistry && tryNormalizeUrl(registry) === tryNormalizeUrl(currentRegistry) ? '-> ' : '   ';
    return prefix + name + generateDashLine(name, dashLineLength) + registry;
  });

  print(messages);
}

function onCurrent() {
  const currentRegistry = getCurrentRegistry();
  currentRegistry && print(currentRegistry);
}

function onUse(name) {
  const { registries, registryNames } = getLocalRegistries();
  if (!registryNames.includes(name)) {
    exit(`The registry name ${name} is not existed.`);
  }
  const target = registries[name];
  setCurrentRegistry(target.registry);
}

function onAdd(name, url) {
  const { registries } = getLocalRegistries();
  const normalizedUrl = tryNormalizeUrl(url);
  registries[name] = registries[name] || {};
  registries[name].registry = normalizedUrl;
  setLocalRegistries(registries);
}

function onDelete(name) {
  const { registries } = getLocalRegistries();
  delete registries[name];
  setLocalRegistries(registries);
}

async function onUpdate() {
  const remoteRegistryList = await getRemoteRegistries();
  const { registries } = getLocalRegistries();
  setLocalRegistries({ ...remoteRegistryList, ...registries });
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
  });

  const messages = [];
  const currentRegistry = getCurrentRegistry();

  const length = Math.max(...registryNames.map(name => name.length)) + 3;
  results.forEach(({ registryUrl, registryName, ok, time }) => {
    const prefix = currentRegistry && registryUrl === currentRegistry ? '-> ' : '   ';
    let suffix = time + ' ms';
    if (time === fastestTime) {
      suffix += ' <- fastest';
    }
    if (!ok) {
      suffix += error(' <- failed');
    }
    messages.push(prefix + registryName + generateDashLine(registryName, length) + suffix);
  });

  print(messages);
}

module.exports = {
  onUse,
  onAdd,
  onInit,
  onList,
  onPing,
  onDelete,
  onUpdate,
  onCurrent,
};