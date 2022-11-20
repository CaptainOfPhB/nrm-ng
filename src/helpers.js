const {
  readFile,
  isLowerCaseEqual,
  geneDashLine,
  printError,
  printMessages,
} = require('./utils');
const { command } = require('execa');
const { bold, green } = require('picocolors');
const { NRS_CONFIG_FILE_PATH, REGISTRIES } = require('./constants');

function exampleUsage(commands) {
  const usages = commands.map(command => `  ${command}`).join('n');
  return '\nExample usage:\n' + usages;
}

function run(cmd, options) {
  return command(cmd, options)
    .then(result => result.stdout)
    .catch(error => {
      printError(error.shortMessage);
      return null;
    });
}

function getCurrentRegistry() {
  return run('npm config get registry');
}

async function getAllRegistries() {
  const userRegistries = await readFile(NRS_CONFIG_FILE_PATH);
  return Object.assign({}, REGISTRIES, userRegistries);
}

async function printAllRegistries() {
  const registries = await getAllRegistries();
  const currentRegistry = await getCurrentRegistry();
  const registryNames = Object.keys(registries);
  const dashLineLength = Math.max(...registryNames.map(key => key.length)) + 5;

  const messages = registryNames.map(registryName => {
    const registry = registries[registryName];
    const prefix = isLowerCaseEqual(registry, currentRegistry) ? green(bold('* ')) : '  ';
    return prefix + registryName + geneDashLine(registryName, dashLineLength) + registry;
  });

  printMessages(messages);
}

module.exports = {
  exampleUsage,
  getCurrentRegistry,
  getAllRegistries,
  printAllRegistries,
};
