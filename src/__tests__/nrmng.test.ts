import ini from 'ini'
import test from 'ava'
import mock from 'mock-fs'
import NrmNg from '../nrmng.mjs'
import { interceptStdio } from 'capture-console'
import registry from '../../registry.json' assert { type: "json" }
import { NPM_CONFIG_FILE_PATH, NRM_CONFIG_FILE_PATH } from '../constants.mjs'

const nrmng = {
  ls: () => $('ls'),
  init: () => $('init'),
  ping: () => $('ping'),
  current: () => $('current'),
  rm: (name: string) => $(`rm ${name}`),
  use: (name: string) => $(`use ${name}`),
  add: (name: string, url: string) => $(`add ${name} ${url}`),
}
const $ = (input: string) => NrmNg().parse(input.split(' '), { from: 'user' })
const run = (fn: (...args: any[]) => void, ...rest: any[]) => interceptStdio(() => fn(...rest))

const nrmrc = ini.encode(registry)
const npmrc = ini.encode({ registry: registry.npm.registry })

test.beforeEach(() => {
  mock({
    [NPM_CONFIG_FILE_PATH]: npmrc,
    [NRM_CONFIG_FILE_PATH]: nrmrc
  })
});

test.afterEach(() => {
  mock.restore()
})

test('nrm-ng can show registry list', t => {
  const output = run(nrmng.ls).stdout
  // the reason for calling `mock.restore()` early
  // https://github.com/tschaub/mock-fs#using-with-jest-snapshot-testing 
  mock.restore();
  t.snapshot(output)
})

test('nrm-ng can show current registry in use', t => {
  const output = run(nrmng.current).stdout
  t.is(output.trim(), registry.npm.registry)
})

test('nrm-ng can change the current registry', t => {
  const output1 = run(nrmng.current).stdout
  t.is(output1.trim(), registry.npm.registry)

  nrmng.use('yarn')

  const output2 = run(nrmng.current).stdout
  t.is(output2.trim(), registry.yarn.registry)
})

test('nrm-ng can add a new registry', t => {
  const output1 = run(nrmng.ls).stdout
  t.snapshot(output1)

  nrmng.add('github', 'https://npm.pkg.github.com')

  const output2 = run(nrmng.ls).stdout
  t.snapshot(output2)
})

test('nrm-ng can delete a registry', t => {
  const output1 = run(nrmng.ls).stdout
  t.snapshot(output1)

  nrmng.rm('yarn')

  const output2 = run(nrmng.ls).stdout
  t.snapshot(output2)
})

// test('nrm-ng should list the response speed of each registry', t => {
//   t.pass();
// })

test('nrm-ng can update the built-in registry list', t => {
  t.pass();
})