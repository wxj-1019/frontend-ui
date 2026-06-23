import chalk from 'chalk';
import prompts from 'prompts';
import {
  SHARED_COMPONENTS,
  SHARED_CATEGORIES,
  type SharedComponentEntry,
} from '../registry.js';

export async function listComponents(options: { category?: string }) {
  const categories = options.category
    ? [options.category]
    : [...new Set(SHARED_COMPONENTS.map((c) => c.category))];

  // 按分类组织组件
  const grouped: Record<string, SharedComponentEntry[]> = {};
  for (const cat of categories) {
    grouped[cat] = SHARED_COMPONENTS.filter((c) => c.category === cat);
  }

  // 打印分类列表
  console.log(chalk.blue('\n📦 Available Components\n'));

  for (const [cat, components] of Object.entries(grouped)) {
    const catName = SHARED_CATEGORIES[cat] || cat;
    console.log(chalk.yellow(`  ${catName} (${components.length})`));
    console.log(chalk.gray('  ' + '─'.repeat(50)));

    for (const c of components) {
      const engine = c.engine ? chalk.gray(` [${c.engine}]`) : '';
      console.log(`  ${chalk.green('●')} ${chalk.white(c.name)}${engine}`);
      console.log(`    ${chalk.gray(c.description)}`);
    }
    console.log();
  }

  console.log(
    chalk.blue(`  Total: ${SHARED_COMPONENTS.length} components\n`)
  );
  console.log(
    chalk.gray('  Use "frontend-ui add <component-name>" to install\n')
  );
}

/** 交互式多选安装 */
export async function interactiveAdd() {
  const categories = [...new Set(SHARED_COMPONENTS.map((c) => c.category))];

  // 选择分类
  const { selectedCategories } = await prompts({
    type: 'multiselect',
    name: 'selectedCategories',
    message: 'Select categories to browse:',
    choices: categories.map((cat) => ({
      title: `${SHARED_CATEGORIES[cat] || cat} (${SHARED_COMPONENTS.filter((c) => c.category === cat).length})`,
      value: cat,
    })),
    instructions: false,
  });

  if (!selectedCategories || selectedCategories.length === 0) {
    console.log(chalk.yellow('No categories selected. Exiting.'));
    return;
  }

  // 从选中分类中收集所有组件
  const availableComponents = SHARED_COMPONENTS.filter((c) =>
    selectedCategories.includes(c.category)
  );

  // 多选组件
  const { selectedComponents } = await prompts({
    type: 'multiselect',
    name: 'selectedComponents',
    message: 'Select components to install:',
    choices: availableComponents.map((c) => ({
      title: `${c.name} ${chalk.gray(`[${c.engine}]`)}`,
      description: c.description,
      value: c.installName,
    })),
    instructions: false,
  });

  if (!selectedComponents || selectedComponents.length === 0) {
    console.log(chalk.yellow('No components selected. Exiting.'));
    return;
  }

  // 确认安装
  const { confirm } = await prompts({
    type: 'confirm',
    name: 'confirm',
    message: `Install ${selectedComponents.length} component(s)?`,
    initial: true,
  });

  if (!confirm) {
    console.log(chalk.yellow('Cancelled.'));
    return;
  }

  // 批量安装
  const { output } = await prompts({
    type: 'text',
    name: 'output',
    message: 'Output directory:',
    initial: './components/ui',
  });

  const { add } = await import('./add.js');
  for (const name of selectedComponents) {
    await add.addComponent(name, { output: output || './components/ui', yes: true });
  }

  console.log(chalk.green('\n✓ All components installed!\n'));
}
