const path = require('path');

const isDEV = process.env.NODE_ENV === 'dev';

const REMOTE_REGISTRY_URL = 'https://nrm-ng-registry.deno.dev/';

const HOME_VAR = process.platform === 'win32' ? 'USERPROFILE' : 'HOME';
const HOME_PATH = isDEV ? process.cwd() : process.env[HOME_VAR];

const NRM_CONFIG_FILE_PATH = path.join(HOME_PATH, '.nrmrc');
const NPM_CONFIG_FILE_PATH = path.join(HOME_PATH, '.npmrc');

module.exports = { REMOTE_REGISTRY_URL, NRM_CONFIG_FILE_PATH, NPM_CONFIG_FILE_PATH };
