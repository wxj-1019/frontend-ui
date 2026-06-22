import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import prompts from 'prompts';

export async function initProject() {
  console.log(chalk.blue('\n🚀 Initialize frontend-ui in your project\n'));

  const { style } = await prompts({
    type: 'select',
    name: 'style',
    message: 'Which style system do you use?',
    choices: [
      { title: 'Tailwind CSS', value: 'tailwind' },
      { title: 'CSS Modules', value: 'css-modules' },
      { title: 'Styled Components', value: 'styled' },
    ],
    initial: 0,
  });

  const { tsx } = await prompts({
    type: 'confirm',
    name: 'tsx',
    message: 'Do you use TypeScript?',
    initial: true,
  });

  const { utilsPath } = await prompts({
    type: 'text',
    name: 'utilsPath',
    message: 'Path to your utils file (for cn() helper):',
    default: '@/lib/utils',
  });

  const config = {
    style,
    tsx: tsx !== false,
    utilsPath: utilsPath || '@/lib/utils',
    componentsPath: './components/ui',
  };

  const configPath = path.resolve(process.cwd(), '.frontend-ui.json');

  try {
    await fs.writeJson(configPath, config, { spaces: 2 });
    console.log(chalk.green(`\n✓ Configuration saved to ${configPath}`));
  } catch (error) {
    console.log(chalk.red(`\n✗ Failed to save configuration: ${error}`));
  }

  console.log(chalk.blue('\n📝 Next steps:\n'));
  console.log(chalk.white('  1. Install dependencies:'));
  console.log(chalk.gray('     npm install gsap @gsap/react motion class-variance-authority clsx tailwind-merge'));
  console.log(chalk.white('\n  2. Add components:'));
  console.log(chalk.gray('     frontend-ui add blur-text'));
  console.log(chalk.gray('     frontend-ui add magnet'));
  console.log(chalk.white('\n  3. List all components:'));
  console.log(chalk.gray('     frontend-ui list\n'));
}
