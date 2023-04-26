#!/usr/bin/env node

const actions = require('./actions');
const helpers = require('./helpers');
const { Command, Option } = require('commander');

const program = new Command();

program
  .name('nrs')
  .description('A tool to easy switch npm registry');

program
  .description('List all registries')
  .command('ls')
  .action(actions.onList)
  .addHelpText('after', helpers.exampleUsage(['$ nrs ls']));

program
  .description('Switch registry')
  .command('use <name>')
  .addOption(
    new Option('-s, --scope <scope>', 'The scope of set registry')
      .choices(['global', 'user', 'project'])
      .default('user')
  )
  .action(actions.onUse)
  .addHelpText('after', helpers.exampleUsage(['$ nrs use gh', '$ nrs use gh -s global']));

program
  .description('Add a new registry')
  .command('add <name> <registry>')
  .action(actions.onAdd)
  .addHelpText('after', helpers.exampleUsage(['$ nrs add gh https://npm.pkg.github.com']));

program
  .description('Delete a registry')
  .command('rm <name>')
  .action(actions.onDelete)
  .addHelpText('after', helpers.exampleUsage(['$ nrs rm gh']));

program
  .description('Test the response speed of all registries')
  .command('test')
  .action(actions.onTest)
  .addHelpText('after', helpers.exampleUsage(['$ nrs test']));

program.parse();