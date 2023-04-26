const fs = require('fs');
const fetch = require('node-fetch');
const { bold, green } = require('picocolors');
const { command, Options } = require('execa');
const { readFile, isLowerCaseEqual, geneDashLine, printError, printMessages } = require('./utils');
const { INTERNAL_REGISTRY_KEY, NRS_CONFIG_FILE_PATH, REMOTE_REGISTRY_URL, USER_REGISTRY_KEY } = require('./constants');

function exampleUsage(commands) {
  const usages = commands.map(command => `  ${command}`).join('n');
  return '\nExample usage:\n' + usages;
}

async function run(cmd, options) {
  return command(cmd, options)
    .then(result => result.stdout)
    .catch(error => {
      printError(error.shortMessage);
      return null;
    });
}

async function prepare() {
  if (!fs.existsSync(NRS_CONFIG_FILE_PATH)) {
    // fs.writeFileSync(NRS_CONFIG_FILE_PATH, )
  }
}

function getCurrentRegistry(packageManager = 'npm') {
  return run(`${packageManager} config get registry`);
}

function getLocalRegistries() {
  const registries = readFile(NRS_CONFIG_FILE_PATH);
  return { ...registries[USER_REGISTRY_KEY], ...registries[INTERNAL_REGISTRY_KEY] }
}

/**
 * @returns {Promise<{[key: string]: string} | null>}
 */
async function getRemoteRegistries() {
  try {
    const response = await fetch(REMOTE_REGISTRY_URL);
    const registries = await response.json();
    return registries;
  } catch {
    printError('Failed to get remote registries.');
    return null;
  }
}

async function printAllRegistries(packageManager = 'npm') {
  const registries = await getAllRegistries();
  const currentRegistry = await getCurrentRegistry(packageManager);
  const registryNames = Object.keys(registries);
  const dashLineLength = Math.max(...registryNames.map(key => key.length)) + 5;

  const messages = registryNames.map(registryName => {
    const registry = registries[registryName];
    const prefix = isLowerCaseEqual(registry, currentRegistry ?? undefined) ? green(bold('* ')) : '  ';
    return prefix + registryName + geneDashLine(registryName, dashLineLength) + registry;
  });

  printMessages(messages);
}

module.exports = {
  exampleUsage,
  printAllRegistries,
  getCurrentRegistry,
  getLocalRegistries,
  getRemoteRegistries,
};
