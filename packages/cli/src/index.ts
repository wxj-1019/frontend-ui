#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { addComponent } from './commands/add.js';
import { listComponents } from './commands/list.js';
import { initProject } from './commands/init.js';

const program = new Command();

program
  .name('frontend-ui')
  .description('CLI tool for frontend-ui component library')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize frontend-ui in your project')
  .action(initProject);

program
  .command('add')
  .argument('<component>', 'Component name to add')
  .description('Add a component to your project')
  .option('-o, --output <path>', 'Output directory', './components/ui')
  .option('-y, --yes', 'Skip confirmation prompts')
  .action(addComponent);

program
  .command('list')
  .description('List all available components')
  .option('-c, --category <category>', 'Filter by category')
  .action(listComponents);

program.parse();
