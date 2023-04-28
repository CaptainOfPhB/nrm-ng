#!/usr/bin/env node

const actions = require('./actions');
const { Command, Option } = require('commander');

const program = new Command();

program
  .name('nrs')
  .description('A tool to easy switch npm registry');

program
  .command('init')
  .action(actions.onInit)
  .description('Initialize nrs')

program
  .command('current')
  .action(actions.onCurrent)
  .description('Show current registry in use')

program
  .command('ls')
  .action(actions.onList)
  .description('List all registries')

program
  .command('use <name>')
  .action(actions.onUse)
  .description('Switch registry')

program
  .command('add <name> <registry>')
  .action(actions.onAdd)
  .description('Add a new registry')

program
  .command('rm <name>')
  .action(actions.onDelete)
  .description('Delete a registry')

program
  .command('test')
  .action(actions.onTest)
  .description('Test the response speed of all registries')

program
  .command('update')
  .action(actions.onUpdate)
  .description('Keep the internal registry list up to date')

program.parse();