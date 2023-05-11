import fs from 'fs';
import ini from 'ini';
import pc from 'picocolors';
import { NRS_CONFIG_FILE_PATH } from './constants.mjs';

function geneDashLine(message, length) {
  const dashLine = new Array(Math.max(2, length - message.length + 2)).join('-');
  return ` ${pc.dim(dashLine)} `;
}

function printSuccess(message) {
  console.log(`${pc.bgGreen(pc.white(' SUCCESS '))} ${pc.green(message)}`);
}

function printError(error) {
  console.log(`${pc.bgRed(pc.white(' ERROR '))} ${pc.red(error)}`);
  process.exit(0);
}

function printMessages(messages) {
  for (const message of messages) {
    console.log(message);
  }
}

function isLowerCaseEqual(str1, str2) {
  if (str1 && str2) {
    return str1.toLowerCase() === str2.toLowerCase();
  } else {
    return !str1 && !str2;
  }
}

function exitWhenFileExist() {
  if (fs.existsSync(NRS_CONFIG_FILE_PATH)) {
    printError('The nrs has already been initialized.');
  }
}

function exitWhenFileNotExist() {
  if (!fs.existsSync(NRS_CONFIG_FILE_PATH)) {
    printError(`File ${pc.underline(NRS_CONFIG_FILE_PATH)} does not exist. Do you forget to run ${pc.underline('nrm init')}?`);
  }
}

function readConfig() {
  exitWhenFileNotExist();
  const iniContent = fs.readFileSync(NRS_CONFIG_FILE_PATH, 'utf-8');
  const jsonContent = ini.parse(iniContent);
  return jsonContent;
}

function writeConfig(content) {
  fs.writeFileSync(NRS_CONFIG_FILE_PATH, ini.encode(content));
}

export {
  readConfig,
  writeConfig,
  printError,
  printSuccess,
  printMessages,
  geneDashLine,
  isLowerCaseEqual,
  exitWhenFileExist,
  exitWhenFileNotExist,
}