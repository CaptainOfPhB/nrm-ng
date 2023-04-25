import fs from 'fs'
import fetch from 'node-fetch'
import { command, Options } from 'execa'
import { bold, green } from 'picocolors'
import { INTERNAL_REGISTRY_KEY, NRS_CONFIG_FILE_PATH, USER_REGISTRY_KEY } from './constants'
import { readFile, isLowerCaseEqual, geneDashLine, printError, printMessages } from './utils'

function exampleUsage(commands: string[]) {
  const usages = commands.map(command => `  ${command}`).join('n');
  return '\nExample usage:\n' + usages;
}

async function run(cmd: string, options?: Options) {
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

function getCurrentRegistry() {
  return run('npm config get registry');
}

function getLocalRegistries() {
  const registries = readFile(NRS_CONFIG_FILE_PATH);
  return { ...registries[USER_REGISTRY_KEY], ...registries[INTERNAL_REGISTRY_KEY] }
}

async function getRemoteRegistries() {
  // const registries = await 
}

async function printAllRegistries() {
  const registries = await getAllRegistries();
  const currentRegistry = await getCurrentRegistry();
  const registryNames = Object.keys(registries);
  const dashLineLength = Math.max(...registryNames.map(key => key.length)) + 5;

  const messages = registryNames.map(registryName => {
    const registry = registries[registryName as keyof typeof registries];
    const prefix = isLowerCaseEqual(registry, currentRegistry ?? undefined) ? green(bold('* ')) : '  ';
    return prefix + registryName + geneDashLine(registryName, dashLineLength) + registry;
  });

  printMessages(messages);
}

export {
  exampleUsage,
  getCurrentRegistry,
  // getAllRegistries,
  printAllRegistries,
};
