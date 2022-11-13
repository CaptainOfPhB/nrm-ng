function exampleUsage(commands) {
  const usages = commands.map(command => `  ${command}`).join('`n')
  return '\nExample usage:\n' + usages
}

module.exports = {
  exampleUsage
}