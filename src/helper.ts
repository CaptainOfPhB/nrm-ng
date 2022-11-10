export const exampleUsage = (commands: string[]) => {
  const usages = commands.map(command => `  ${command}`).join('`n');
  return '\nExample usage:\n' + usages;
}