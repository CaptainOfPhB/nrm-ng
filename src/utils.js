const fs = require('fs');
const ini = require('ini');
const { bgGreen, green, bgRed, red, white, dim } = require('picocolors');

function geneDashLine(message, length) {
  const dashLine = new Array(Math.max(2, length - message.length + 2)).join('-');
  return ` ${dim(dashLine)} `;
}

function printSuccess(message) {
  console.log(`${bgGreen(white(' SUCCESS '))} ${green(message)}`);
}

function printError(error) {
  console.log(`${bgRed(white(' ERROR '))} ${red(error)}`);
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

function createFileIfNotExit(path) {
  if (!fs.existsSync(path)) {
    // fs.
  }

}

function readFile(file) {
  const iniContent = fs.readFileSync(file, 'utf-8');
  const jsonContent = ini.parse(iniContent);
  return jsonContent;
}

function writeFile(path, content) {
  fs.writeFileSync(path, ini.stringify(content));
}

module.exports = {
  writeFile,
  readFile,
  printSuccess,
  printError,
  printMessages,
  geneDashLine,
  isLowerCaseEqual,
}