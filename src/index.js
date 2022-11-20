#!/usr/bin/env node

const { Command, Option } = require('commander');

const packageJson = require('../package.json');

const { exampleUsage } = require('./helpers')
const { onAdd, onDelete, onList, onTest, onUse } = require('./actions')

const program = new Command();

program
  .name(packageJson.name)
  .version(packageJson.version)
  .description(packageJson.description);

program
  .command('ls')
  .description('List all registries')
  .action(onList)
  .addHelpText('after', exampleUsage(['$ nrs ls']));

program
  .command('use <name>')
  .addOption(
    new Option('-s, --scope <scope>', 'The scope of set registry')
      .choices(['global', 'user', 'project'])
      .default('user')
  )
  .description('Switch registry')
  .action(onUse)
  .addHelpText('after', exampleUsage(['$ nrs use gh', '$ nrs use gh -s global']));

program
  .command('add <name> <registry>')
  .description('Add a new registry')
  .action(onAdd)
  .addHelpText('after', exampleUsage(['$ nrs add gh https://npm.pkg.github.com']));

program
  .command('rm <name>')
  .description('Delete a registry')
  .action(onDelete)
  .addHelpText('after', exampleUsage(['$ nrs rm gh']));

program
  .command('test')
  .description('Test the response speed of all registries')
  .action(onTest)
  .addHelpText('after', exampleUsage(['$ nrs test']));

program.parse();