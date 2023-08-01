import path from 'path';

const PROJECT_DIR = process.cwd();
const IS_DEV = process.env.NODE_ENV === 'development';
const HOME_VAR = process.platform === 'win32' ? 'USERPROFILE' : 'HOME';
const HOME_PATH = IS_DEV ? PROJECT_DIR : process.env[HOME_VAR];
const NRM_CONFIG_FILE_NAME = '.nrmrc';
const NRM_CONFIG_FILE_PATH = path.join(HOME_PATH!, NRM_CONFIG_FILE_NAME);
const REMOTE_REGISTRY_URL = 'https://nrm-ng-registry.deno.dev/';

export {
  HOME_VAR,
  HOME_PATH,
  REMOTE_REGISTRY_URL,
  NRM_CONFIG_FILE_NAME,
  NRM_CONFIG_FILE_PATH,
};
