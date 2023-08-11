
import * as actions from './actions.mjs'
import { createCommand } from 'commander'
import packageJson from '../package.json' assert { type: "json" }

function NrmNg() {
  const cli = createCommand()

  cli.version(packageJson.version, '-v, --version');

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

  return cli
}

export default NrmNg