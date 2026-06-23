import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import prompts from 'prompts';
import { SHARED_COMPONENTS, type SharedComponentEntry } from '../registry.js';

/** 配置类型 */
interface FrontendUIConfig {
  style?: string;
  tsx?: boolean;
  utilsPath?: string;
  componentsPath?: string;
}

/** 配置文件候选 */
const CONFIG_FILES = ['frontend-ui.config.json', '.frontend-ui.json'];

/** 读取配置文件 */
async function loadConfig(cwd: string): Promise<FrontendUIConfig> {
  for (const file of CONFIG_FILES) {
    const configPath = path.join(cwd, file);
    if (await fs.pathExists(configPath)) {
      try {
        return await fs.readJson(configPath);
      } catch {
        return {};
      }
    }
  }
  return {};
}

/** 引擎 → 所需依赖映射 */
const ENGINE_DEPS: Record<string, string[]> = {
  Motion: ['motion'],
  GSAP: ['gsap', '@gsap/react'],
  'react-spring': ['@react-spring/web'],
  'Anime.js': ['animejs'],
  Lenis: ['lenis'],
  CSS: [],
};

/** 查找组件元数据（支持模糊匹配） */
function findComponent(name: string): SharedComponentEntry | undefined {
  const normalized = name.toLowerCase().replace(/\s+/g, '-');
  return SHARED_COMPONENTS.find(
    (c) =>
      c.installName === normalized ||
      c.name.toLowerCase() === normalized.replace(/-/g, '') ||
      c.name.toLowerCase() === normalized
  );
}

/** 检测用户项目中的依赖 */
async function detectMissingDeps(
  engine: string,
  cwd: string
): Promise<string[]> {
  const required = ENGINE_DEPS[engine] || [];
  if (required.length === 0) return [];

  const pkgPath = path.join(cwd, 'package.json');
  if (!(await fs.pathExists(pkgPath))) return required;

  const pkg = await fs.readJson(pkgPath);
  const allDeps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
    ...pkg.peerDependencies,
  };

  return required.filter((dep) => !(dep in allDeps));
}

/** 获取组件源文件路径 */
function getComponentSource(
  component: SharedComponentEntry
): { categoryDir: string; installDir: string } {
  const monorepoRoot = path.resolve(
    process.cwd(),
    'packages/ui/src',
    component.category
  );
  return {
    categoryDir: monorepoRoot,
    installDir: path.join(monorepoRoot, component.installName),
  };
}

export async function addComponent(
  componentName: string,
  options: { output: string; yes: boolean }
) {
  // 加载配置文件
  const config = await loadConfig(process.cwd());
  const outputDir = path.resolve(
    process.cwd(),
    options.output || config.componentsPath || './components/ui',
    componentName
  );

  const component = findComponent(componentName);

  if (!component) {
    console.log(chalk.red(`\n✗ Component "${componentName}" not found.`));
    console.log(chalk.gray('  Run "frontend-ui list" to see available components.\n'));
    return;
  }

  const targetDir = path.join(outputDir, component.installName);

  console.log(chalk.blue(`\n📦 Adding ${chalk.bold(component.name)}\n`));
  console.log(`  ${chalk.gray('Category:')} ${component.category}`);
  console.log(`  ${chalk.gray('Engine:')} ${component.engine}`);
  console.log(`  ${chalk.gray('Target:')} ${targetDir}\n`);

  // 确认安装
  if (!options.yes) {
    const { confirm } = await prompts({
      type: 'confirm',
      name: 'confirm',
      message: `Install ${component.name} to ${targetDir}?`,
      initial: true,
    });

    if (!confirm) {
      console.log(chalk.yellow('  Cancelled.'));
      return;
    }
  }

  // 创建目录
  await fs.ensureDir(targetDir);

  // 复制文件
  const { installDir } = getComponentSource(component);
  let copiedCount = 0;
  let missingCount = 0;

  for (const file of component.files) {
    const sourcePath = path.join(installDir, file);
    const destPath = path.join(targetDir, file);

    try {
      if (await fs.pathExists(sourcePath)) {
        await fs.ensureDir(path.dirname(destPath));
        await fs.copy(sourcePath, destPath);
        console.log(chalk.green(`  ✓ ${file}`));
        copiedCount++;
      } else {
        console.log(chalk.yellow(`  ⚠ ${file} not found in source`));
        missingCount++;
      }
    } catch (error) {
      console.log(chalk.red(`  ✗ ${file}: ${error}`));
    }
  }

  // 依赖检测
  const missingDeps = await detectMissingDeps(
    component.engine,
    process.cwd()
  );

  console.log(chalk.green(`\n✓ ${component.name} installed successfully!`));
  console.log(
    chalk.gray(`\n  Import: import { ${component.name} } from "./${path.relative(
      process.cwd(),
      targetDir
    )}";`)
  );

  if (missingDeps.length > 0) {
    console.log(chalk.yellow(`\n⚠ Missing dependencies for ${component.engine}:`));
    for (const dep of missingDeps) {
      console.log(`  ${chalk.red('•')} ${dep}`);
    }
    console.log(
      chalk.cyan(`\n  Install with: npm install ${missingDeps.join(' ')}`)
    );
  }

  console.log();
}
