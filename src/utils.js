const fs = require('fs');
const ini = require('ini');
const { NRS_CONFIG_FILE_PATH } = require('./constants');
const { bgGreen, green, bgRed, red, white, dim, underline } = require('picocolors');

function geneDashLine(message, length) {
  const dashLine = new Array(Math.max(2, length - message.length + 2)).join('-');
  return ` ${dim(dashLine)} `;
}

function printSuccess(message) {
  console.log(`${bgGreen(white(' SUCCESS '))} ${green(message)}`);
}

function printError(error) {
  console.log(`${bgRed(white(' ERROR '))} ${red(error)}`);
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
    printError(`File ${underline(NRS_CONFIG_FILE_PATH)} does not exist. Do you forget to run ${underline('nrm init')}?`);
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

module.exports = {
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