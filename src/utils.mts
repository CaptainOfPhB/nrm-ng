import { $ } from 'execa';
import pc from 'picocolors';

async function run(cmd: string) {
  return $`${cmd.split(' ')}`
    .then(result => result.stdout)
    .catch(error => printError(error.shortMessage));
}

function geneDashLine(message: string, length: number) {
  const dashLine = new Array(Math.max(2, length - message.length + 2)).join('-');
  return ` ${pc.dim(dashLine)} `;
}

function printSuccess(message: string) {
  console.log(`${pc.bgGreen(pc.white(' SUCCESS '))} ${pc.green(message)}`);
}

function printError(error: string) {
  console.log(`${pc.bgRed(pc.white(' ERROR '))} ${pc.red(error)}`);
  process.exit(0);
}

function printMessages(messages: string[]) {
  for (const message of messages) {
    console.log(message);
  }
}

function isLowerCaseEqual(str1: string, str2: string) {
  if (str1 && str2) {
    return str1.toLowerCase() === str2.toLowerCase();
  } else {
    return !str1 && !str2;
  }
}

export {
  run,
  printError,
  printSuccess,
  printMessages,
  geneDashLine,
  isLowerCaseEqual,
}