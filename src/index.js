#!/usr/bin/env node

const actions = require('./actions');
const { version } = require('../package.json');
const { createCommand } = require('commander');

const cli = createCommand()

cli
  .version(version, '-v, --version');

cli
  .name('nrm')
  .description('A cli tool to easy switch npm registry')

cli
  .command('init')
  .action(actions.onInit)
  .description('Initialize nrm-ng')

cli
  .command('current')
  .action(actions.onCurrent)
  .description('Show the registry currently in use')

cli
  .command('ls')
  .action(actions.onList)
  .description('List all local registries')

cli
  .command('use <name>')
  .action(actions.onUse)
  .description('Switch registry')

cli
  .command('add <name> <registry>')
  .action(actions.onAdd)
  .description('Add a registry')

cli
  .command('rm <name>')
  .action(actions.onDelete)
  .description('Remove a registry')

cli
  .command('ping')
  .action(actions.onPing)
  .description('Ping registry response speed')

cli
  .command('update')
  .action(actions.onUpdate)
  .description('Keep local registry list up to date with remote')


if (process.argv.length > 2) {
  cli.parse(process.argv, { from: 'node' });
} else {
  cli.help();
}