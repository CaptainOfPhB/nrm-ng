import { exec } from 'child_process';

async function run(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error.message);
        exit(error.message);
      }
      if (stderr) {
        reject(stderr);
        exit(stderr);
      }
      resolve(stdout);
    });
  });
}

function generateDashLine(message: string, length: number) {
  const dashLine = new Array(Math.max(2, length - message.length + 2)).join('-');
  return ` \x1b[2m${dashLine}\x1b[0m `;
}

// TODO consider remove this, no message is good message
function success(msg: string) {
  return `\x1b[32mSUCCESS: ${msg}\x1b[0m`;
}

function error(msg: string) {
  return `\x1b[31mERROR: ${msg}\x1b[0m`;
}

function exit(msg: string) {
  print(error(msg));
  process.exit(1);
}

function print(message: string | string[]) {
  const messages = typeof message === 'string' ? [message] : message;
  for (const msg of messages) {
    console.log(msg);
  }
}

export {
  run,
  exit,
  print,
  error,
  success,
  generateDashLine,
};