const fs = require('fs');
const ini = require('ini');
const { bgGreen, green, bgRed, red, white, dim } = require('picocolors');

function padding(message) {
  return ` ${message} `;
}

function geneDashLine(message, length) {
  const dashLine = new Array(Math.max(2, length - message.length + 2)).join('-');
  return padding(dim(dashLine));
}

function printSuccess(message) {
  console.log(`${bgGreen(white(' SUCCESS '))} ${green(message)}`);
}

function printError(error) {
  console.log(`${bgRed(white(' ERROR '))} ${red(error)}`);
}

function isLowerCaseEqual(str1, str2) {
  if (str1 && str2) {
    return str1.toLowerCase() === str2.toLowerCase();
  } else {
    return !str1 && !str2;
  }
}

function exit(error) {
  if (error) {
    printError(error);
  }
  process.exit(1);
}

function tryRun(callback) {
  try {
    callback()
  } catch (error) {
    exit(error);
  }
}

async function readFile(file) {
  return new Promise(resolve => {
    if (!fs.existsSync(file)) {
      exit(`File ${file} does not exist`);
    }
    tryRun(() => {
      const content = ini.parse(fs.readFileSync(file, 'utf-8'));
      resolve(content);
    })
  });
}

async function writeFile(path, content) {
  return new Promise(resolve => tryRun(() => {
    fs.writeFileSync(path, ini.stringify(content));
    resolve();
  }));
}

module.exports = {
  exit,
  padding,
  writeFile,
  readFile,
  printSuccess,
  printError,
  geneDashLine,
  isLowerCaseEqual,
}