import { Command } from 'commander';
import packageJson from '../package.json';

import { exampleUsage } from './helper';
import { onAdd, onDelete, onList, onTest, onUse } from './actions';

const program = new Command();

program
  .name(packageJson.name)
  .version(packageJson.version)
  .description(packageJson.description);

program
  .command('ls')
  .description('List all registries')
  .action(onList)
  .addHelpText('after', exampleUsage(['$ nrm ls']));

program
  .command('use <name>')
  .description('Switch registry')
  .action(onUse)
  .addHelpText('after', exampleUsage(['$ nrm use gh']));

program
  .command('add <name> <registry>')
  .description('Add a new registry')
  .action(onAdd)
  .addHelpText('after', exampleUsage(['$ nrm add gh https://npm.pkg.github.com']));

program
  .command('rm <name>')
  .description('Delete a registry')
  .action(onDelete)
  .addHelpText('after', exampleUsage(['$ nrm rm gh']));

program
  .command('test')
  .description('Test the response speed of all registries')
  .action(onTest)
  .addHelpText('after', exampleUsage(['$ nrm test']));

program.parse();