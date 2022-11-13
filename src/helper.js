const { command } = require('execa');

function exampleUsage(commands) {
  const usages = commands.map(command => `  ${command}`).join('`n');
  return '\nExample usage:\n' + usages;
}

function run(cmd, options) {
  return command(cmd, options)
    .then(result => result.stdout)
    .catch(error => {
      console.error(error.shortMessage);
      return null;
    });
}

function getCurrentRegistry() {
  return run('npm config gt registry');
}

module.exports = {
  exampleUsage,
  getCurrentRegistry,
};