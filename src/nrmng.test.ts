import test from 'ava'
import mock from 'mock-fs'
import NrmNg from './nrmng.mjs'
import { interceptStdio } from 'capture-console'
import { NPM_CONFIG_FILE_PATH, NRM_CONFIG_FILE_PATH } from './constants.mjs'

const $ = (input: string) => NrmNg().parse(input.split(' '), { from: 'user' })
const run = (fn: (...args: any[]) => void, ...rest: any[]) => interceptStdio(() => fn(...rest))
const nrmng = {
  ls: () => $('ls'),
  init: () => $('init'),
  ping: () => $('ping'),
  current: () => $('current'),
  rm: (name: string) => $(`rm ${name}`),
  use: (name: string) => $(`use ${name}`),
  add: (name: string, url: string) => $(`add ${name} ${url}`),
}

test.beforeEach(() => {
  mock.restore()
})

test('nrs should show registry list', t => {
  mock({
    [NRM_CONFIG_FILE_PATH]: '[npm]\nregistry=https://registry.npmjs.org/\n[taobao]\nregistry=https://registry.npm.taobao.org/\n',
    [NPM_CONFIG_FILE_PATH]: 'registry=https://registry.npmjs.org/'
  })

  const { stdout } = run(nrmng.add, 'rere', 'http://baidu.com')
  console.log('🚀 -> stdout:', stdout)

  t.pass();
})

// test('nrs should show current registry in use', t => {
//   t.pass();
// })

// test('nrs should change the current registry', t => {
//   t.pass();
// })

// test('nrs should add a new registry', t => {
//   t.pass();
// })

// test('nrs should delete a registry', t => {
//   t.pass();
// })

// test('nrs should list the response speed of each registry', t => {
//   t.pass();
// })

// test('nrs should update the internal registry list', t => {
//   t.pass();
// })