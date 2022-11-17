const { command } = require('execa');
const { bgGreen, green, bgRed, red, black } = require('picocolors');

function exampleUsage(commands) {
  const usages = commands.map(command => `  ${command}`).join('`n');
  return '\nExample usage:\n' + usages;
}

function printSuccess(message) {
  console.log(`${bgGreen(black(' SUCCESS '))} ${green(message)}`);
}

function printError(error) {
  console.log(`${bgRed(black(' ERROR '))} ${red(error)}`);
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

module.exports = {
  exampleUsage,
  printSuccess,
  printError,
  getCurrentRegistry,
};
