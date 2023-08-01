#!/usr/bin/env node

import { Command } from 'commander';
import * as actions from './actions.mjs';

const program = new Command();

program
  .name('nrm-ng')
  .description('A cli tool to easy switch npm registry');

program
  .command('init')
  .action(actions.onInit)
  .description('Initialize nrm-ng')

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
  .command('ping')
  .action(actions.onPing)
  .description('Ping the registry response speed')

program
  .command('update')
  .action(actions.onUpdate)
  .description('Keep the internal registry list up to date')

program.parse();