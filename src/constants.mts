import path from 'path'

const projectDir = process.cwd()
const isDev = process.env.NODE_ENV === 'development'

const REMOTE_REGISTRY_URL = 'https://nrm-ng-registry.deno.dev/'

const HOME_VAR = process.platform === 'win32' ? 'USERPROFILE' : 'HOME'
const HOME_PATH = isDev ? projectDir : process.env[HOME_VAR]

const NRM_CONFIG_FILE_PATH = path.join(HOME_PATH!, '.nrmrc')

const NPM_CONFIG_FILE_PATH = path.join(process.env[HOME_VAR]!, '.npmrc')

export { REMOTE_REGISTRY_URL, NRM_CONFIG_FILE_PATH, NPM_CONFIG_FILE_PATH }
