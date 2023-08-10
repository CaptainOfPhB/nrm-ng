#!/usr/bin/env node

import commandFactory from './commandFactory.mjs'

const program = commandFactory()

if (process.argv.length > 2) {
  program.parse(process.argv, { from: 'node' })
} else {
  program.help()
}