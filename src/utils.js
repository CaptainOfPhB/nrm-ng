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
      resolve({});
      return;
    }
    tryRun(() => {
      const content = ini.parse(fs.readFileSync(file, 'utf-8'));
      resolve(content);
    })
  });
}

async function writeFile(path, content) {
  return new Promise(resolve => tryRun(() => {
    fs.writeFile(path, ini.stringify(content), error => {
      if (error) {
        exit(error);
      }
      resolve(true);
    });
  }));
}

module.exports = {
  exit,
  padding,
  writeFile,
  readFile,
  printSuccess,
  printError,
  printMessages,
  geneDashLine,
  isLowerCaseEqual,
}