const path = require('path');
const REGISTRIES = require('../registries.json');

const HOME_VAR = process.platform === 'win32' ? 'USERPROFILE' : 'HOME';
const HOME_PATH = process.env[HOME_VAR];
const NRS_CONFIG_FILE_NAME = '.nrsrc';
const NRS_CONFIG_FILE_PATH = path.join(HOME_PATH, NRS_CONFIG_FILE_NAME);

module.exports = {
  HOME_VAR,
  HOME_PATH,
  NRS_CONFIG_FILE_NAME,
  NRS_CONFIG_FILE_PATH,
  REGISTRIES,
};
