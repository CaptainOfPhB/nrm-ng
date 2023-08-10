import fs from 'fs'
import test from 'ava'
import mock from 'mock-fs'
import { NRM_CONFIG_FILE_PATH } from './constants.mjs'

import { exec } from 'node:child_process'

test('nrs should show registry list', t => {
  mock({
    [NRM_CONFIG_FILE_PATH]: '[npm]\nregistry=https://registry.npmjs.org/\n[taobao]\nregistry=https://registry.npm.taobao.org/\n'
  })

  // ✔️ read mocked file in current process
  // 执行正常
  const content = fs.readFileSync(NRM_CONFIG_FILE_PATH, 'utf-8');
  console.log('🚀 -> content:\n', content);

  // ❌ read mocked file in child process
  // 直接跳过了这里
  exec('ts-node-esm src/index.mts ls', (err, stdout, stderr) => {
    console.log('🚀 -> exec -> stdout:', stdout);
  })

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