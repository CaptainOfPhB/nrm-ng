#!/usr/bin/env node

import NrmNg from './nrmng.mjs'

const nrmng = NrmNg()

if (process.argv.length > 2) {
  nrmng.parse(process.argv, { from: 'node' })
} else {
  nrmng.help()
}