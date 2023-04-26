const path = require('path');

const HOME_VAR = process.platform === 'win32' ? 'USERPROFILE' : 'HOME';
const HOME_PATH = process.env[HOME_VAR];
const NRS_CONFIG_FILE_NAME = '.nrsrc';
const NRS_CONFIG_FILE_PATH = path.join(HOME_PATH, NRS_CONFIG_FILE_NAME);
const USER_REGISTRY_KEY = 'user_registry';
const INTERNAL_REGISTRY_KEY = 'internal_registry';
const REMOTE_REGISTRY_URL = 'https://nrs-get-latest-registries.deno.dev/';

module.exports = {
  HOME_VAR,
  HOME_PATH,
  NRS_CONFIG_FILE_NAME,
  NRS_CONFIG_FILE_PATH,
  USER_REGISTRY_KEY,
  INTERNAL_REGISTRY_KEY,
  REMOTE_REGISTRY_URL,
};
