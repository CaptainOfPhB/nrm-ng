import fs from 'fs';
import pc from 'picocolors';
import { printError } from './utils.mjs';
import { NRS_CONFIG_FILE_PATH } from './constants.mjs';

function exitWhenNrsNotInitialized() {
  if (!fs.existsSync(NRS_CONFIG_FILE_PATH)) {
    printError(`File ${pc.underline(NRS_CONFIG_FILE_PATH)} does not exist. Do you forget to run ${pc.underline('nrs init')}?`);
  }
}