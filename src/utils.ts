import fs from 'fs';
import ini from 'ini';
import { bgGreen, green, bgRed, red, white, dim } from 'picocolors';

function geneDashLine(message: string, length: number) {
  const dashLine = new Array(Math.max(2, length - message.length + 2)).join('-');
  return ` ${dim(dashLine)} `;
}

function printSuccess(message: string) {
  console.log(`${bgGreen(white(' SUCCESS '))} ${green(message)}`);
}

function printError(error: string) {
  console.log(`${bgRed(white(' ERROR '))} ${red(error)}`);
}

function printMessages(messages: string[]) {
  for (const message of messages) {
    console.log(message);
  }
}

function isLowerCaseEqual(str1?: string, str2?: string) {
  if (str1 && str2) {
    return str1.toLowerCase() === str2.toLowerCase();
  } else {
    return !str1 && !str2;
  }
}

function createFileIfNotExit(path: string) {
  if(!fs.existsSync(path)) {
    // fs.
  }

}

function readFile(file: string) {
  const iniContent = fs.readFileSync(file, 'utf-8');
  const jsonContent = ini.parse(iniContent);
  return jsonContent;
}

function writeFile(path: string, content: string) {
  fs.writeFileSync(path, ini.stringify(content));
}

export {
  writeFile,
  readFile,
  printSuccess,
  printError,
  printMessages,
  geneDashLine,
  isLowerCaseEqual,
}