#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { addComponent } from './commands/add.js';
import { listComponents, interactiveAdd } from './commands/list.js';
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
  .command('add [component]')
  .description('Add a component to your project')
  .option('-o, --output <path>', 'Output directory', './components/ui')
  .option('-y, --yes', 'Skip confirmation prompts')
  .action((component: string | undefined, options: { output: string; yes: boolean }) => {
    if (component) {
      addComponent(component, options);
    } else {
      interactiveAdd();
    }
  });

program
  .command('list')
  .alias('ls')
  .description('List all available components')
  .option('-c, --category <category>', 'Filter by category')
  .action(listComponents);

// 无参数时默认启动交互式安装
if (process.argv.length <= 2) {
  interactiveAdd();
} else {
  program.parse();
}
