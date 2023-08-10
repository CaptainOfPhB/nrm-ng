
import * as actions from './actions.mjs'
import { createCommand } from 'commander'
import packageJson from '../package.json' assert { type: "json" }

function commandFactory() {
  const program = createCommand()

  program.version(packageJson.version, '-v, --version');

  program
    .name('nrm')
    .description('A cli tool to easy switch npm registry')

  program
    .command('init')
    .action(actions.onInit)
    .description('Initialize nrm-ng')

  program
    .command('current')
    .action(actions.onCurrent)
    .description('Show the registry currently in use')

  program
    .command('ls')
    .action(actions.onList)
    .description('List all local registries')

  program
    .command('use <name>')
    .action(actions.onUse)
    .description('Switch registry')

  program
    .command('add <name> <registry>')
    .action(actions.onAdd)
    .description('Add a registry')

  program
    .command('rm <name>')
    .action(actions.onDelete)
    .description('Remove a registry')

  program
    .command('ping')
    .action(actions.onPing)
    .description('Ping registry response speed')

  program
    .command('update')
    .action(actions.onUpdate)
    .description('Keep local registry list up to date with remote')

  return program
}

export default commandFactory