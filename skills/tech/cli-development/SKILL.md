---
name: cli-development
description: CLI tool development for Frontend UI — Commander.js, interactive prompts, component scaffolding, dependency detection, and npm publishing. Use when building or improving the frontend-ui CLI package.
---

# CLI Development

Patterns and best practices for building the Frontend UI CLI tool, covering command structure, interactive prompts, component installation, and dependency management.

## When to Use

- Adding new CLI commands
- Building component scaffolding logic
- Implementing interactive prompts
- Detecting and installing dependencies
- Publishing CLI to npm

---

## 1. Project Structure

```
packages/cli/
├── bin/
│   └── frontend-ui.js          # Entry point (shebang)
├── src/
│   ├── index.ts                 # Commander setup
│   ├── commands/
│   │   ├── init.ts              # Initialize project
│   │   ├── add.ts               # Add component
│   │   ├── list.ts              # List components
│   │   └── remove.ts            # Remove component
│   ├── utils/
│   │   ├── registry.ts          # Component registry
│   │   ├── dependencies.ts      # Dependency detection
│   │   ├── installer.ts         # File installation
│   │   └── prompts.ts           # Interactive prompts
│   └── types/
│       └── index.ts             # CLI types
├── templates/
│   └── component.tsx.hbs        # Handlebars template (optional)
├── package.json
└── tsconfig.json
```

---

## 2. Entry Point

### 2.1 bin/frontend-ui.js

```javascript
#!/usr/bin/env node
import('../dist/index.js').catch((err) => {
  console.error(err);
  process.exit(1);
});
```

### 2.2 package.json bin field

```json
{
  "name": "@frontend-ui/cli",
  "version": "0.1.0",
  "type": "module",
  "bin": {
    "frontend-ui": "./bin/frontend-ui.js"
  },
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist", "bin"]
}
```

---

## 3. Commander.js Setup

### 3.1 Basic Command Structure

```typescript
// packages/cli/src/index.ts
import { Command } from 'commander';
import { addCommand } from './commands/add.js';
import { initCommand } from './commands/init.js';
import { listCommand } from './commands/list.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pkg = require('../package.json');

const program = new Command();

program
  .name('frontend-ui')
  .description('CLI tool for Frontend UI component library')
  .version(pkg.version);

program.addCommand(initCommand);
program.addCommand(addCommand);
program.addCommand(listCommand);

program.parse();
```

### 3.2 Command Definition

```typescript
// packages/cli/src/commands/add.ts
import { Command } from 'commander';
import chalk from 'chalk';
import prompts from 'prompts';
import { installComponent } from '../utils/installer.js';
import { getRegistry } from '../utils/registry.js';

export const addCommand = new Command('add')
  .description('Add a component to your project')
  .argument('[components...]', 'component names to add')
  .option('-a, --all', 'add all components')
  .option('-o, --overwrite', 'overwrite existing components')
  .option('-p, --path <path>', 'installation path', './components/ui')
  .action(async (componentNames, options) => {
    try {
      const registry = await getRegistry();

      if (options.all) {
        // Install all components
        for (const component of registry) {
          await installComponent(component.name, options);
        }
        return;
      }

      if (componentNames.length === 0) {
        // Interactive selection
        const { selected } = await prompts({
          type: 'multiselect',
          name: 'selected',
          message: 'Select components to install',
          choices: registry.map(c => ({
            title: c.name,
            value: c.name,
            description: c.description,
          })),
          hint: '- Space to select. Return to submit',
        });

        if (!selected || selected.length === 0) {
          console.log(chalk.yellow('No components selected.'));
          return;
        }

        componentNames = selected;
      }

      for (const name of componentNames) {
        await installComponent(name, options);
      }
    } catch (error) {
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });
```

---

## 4. Component Registry

### 4.1 Registry Structure

```typescript
// packages/cli/src/utils/registry.ts
export interface RegistryEntry {
  name: string;
  description: string;
  category: 'text-animations' | 'animations' | 'components' | 'backgrounds' | 'gsap-animations' | 'blocks' | 'hooks';
  dependencies: string[];
  devDependencies: string[];
  peerDependencies: string[];
  files: string[];        // Relative paths to source files
}

export const registry: RegistryEntry[] = [
  {
    name: 'blur-text',
    description: 'Text blur-in animation',
    category: 'text-animations',
    dependencies: ['motion'],
    devDependencies: [],
    peerDependencies: ['react', 'react-dom'],
    files: [
      'text-animations/blur-text/blur-text.tsx',
      'text-animations/blur-text/index.ts',
    ],
  },
  {
    name: 'particles',
    description: 'Canvas particle background',
    category: 'backgrounds',
    dependencies: [],
    devDependencies: [],
    peerDependencies: ['react'],
    files: [
      'backgrounds/particles/particles.tsx',
      'backgrounds/particles/index.ts',
    ],
  },
  // ... more entries
];

export async function getRegistry(): Promise<RegistryEntry[]> {
  // Could fetch from remote URL for dynamic updates
  return registry;
}

export function findComponent(name: string): RegistryEntry | undefined {
  return registry.find(c => c.name === name);
}
```

---

## 5. Component Installation

### 5.1 File Copy Logic

```typescript
// packages/cli/src/utils/installer.ts
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { findComponent } from './registry.js';
import { detectPackageManager } from './dependencies.js';

interface InstallOptions {
  path: string;
  overwrite?: boolean;
}

export async function installComponent(
  name: string,
  options: InstallOptions
): Promise<void> {
  const component = findComponent(name);
  if (!component) {
    throw new Error(`Component "${name}" not found in registry.`);
  }

  const targetDir = path.resolve(options.path);
  const sourceDir = getPackageSourceDir();

  // Ensure target directory exists
  await fs.ensureDir(targetDir);

  // Copy component files
  for (const file of component.files) {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, path.basename(file));

    if (await fs.pathExists(targetPath) && !options.overwrite) {
      console.log(chalk.yellow(`  ⏭ ${name}: Already exists (use --overwrite to replace)`));
      return;
    }

    await fs.copy(sourcePath, targetPath);
    console.log(chalk.green(`  ✓ ${path.basename(file)}`));
  }

  // Install dependencies
  await installDependencies(component);

  console.log(chalk.green(`✓ ${name} installed successfully!`));
}

function getPackageSourceDir(): string {
  // Find the installed @frontend-ui/ui package
  const possiblePaths = [
    path.resolve(process.cwd(), 'node_modules/@frontend-ui/ui/src'),
    path.resolve(process.cwd(), '../node_modules/@frontend-ui/ui/src'),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) return p;
  }

  throw new Error('Cannot find @frontend-ui/ui package. Is it installed?');
}
```

### 5.2 Dependency Detection

```typescript
// packages/cli/src/utils/dependencies.ts
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { RegistryEntry } from './registry.js';

export type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';

export function detectPackageManager(): PackageManager {
  if (fs.existsSync('pnpm-lock.yaml')) return 'pnpm';
  if (fs.existsSync('yarn.lock')) return 'yarn';
  if (fs.existsSync('bun.lockb')) return 'bun';
  return 'npm';
}

export function getInstallCommand(
  pm: PackageManager,
  deps: string[],
  isDev: boolean = false
): string {
  const flag = isDev ? '-D' : '';
  switch (pm) {
    case 'pnpm':
      return `pnpm add ${flag} ${deps.join(' ')}`;
    case 'yarn':
      return `yarn add ${isDev ? '-D' : ''} ${deps.join(' ')}`;
    case 'bun':
      return `bun add ${deps.join(' ')}`;
    default:
      return `npm install ${isDev ? '--save-dev' : ''} ${deps.join(' ')}`;
  }
}

export async function installDependencies(component: RegistryEntry): Promise<void> {
  const pm = detectPackageManager();
  const allDeps = [...component.dependencies, ...component.peerDependencies];

  if (allDeps.length === 0) return;

  const command = getInstallCommand(pm, allDeps);
  console.log(chalk.blue(`Installing dependencies: ${allDeps.join(', ')}`));

  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.warn(chalk.yellow('Failed to install dependencies automatically.'));
    console.log(chalk.blue(`Please run: ${command}`));
  }
}
```

---

## 6. Configuration File

### 6.1 cosmiconfig Setup

```typescript
// packages/cli/src/utils/config.ts
import { cosmiconfigSync } from 'cosmiconfig';

export interface FrontendUIConfig {
  componentsDir?: string;
  baseColor?: string;
  cssVariables?: boolean;
  tsx?: boolean;
  aliases?: {
    components?: string;
    utils?: string;
  };
}

export function loadConfig(): FrontendUIConfig | null {
  const explorer = cosmiconfigSync('frontend-ui');
  const result = explorer.search();
  return result?.config ?? null;
}

export function getConfigPath(): string {
  return 'frontend-ui.config.json';
}
```

### 6.2 Config File Template

```json
{
  "componentsDir": "./components/ui",
  "baseColor": "zinc",
  "cssVariables": true,
  "tsx": true,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

---

## 7. Interactive Prompts

### 7.1 Init Command

```typescript
// packages/cli/src/commands/init.ts
import { Command } from 'commander';
import prompts from 'prompts';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

export const initCommand = new Command('init')
  .description('Initialize Frontend UI in your project')
  .action(async () => {
    console.log(chalk.blue('Welcome to Frontend UI! 🚀\n'));

    const { framework } = await prompts({
      type: 'select',
      name: 'framework',
      message: 'Which framework are you using?',
      choices: [
        { title: 'Next.js', value: 'next' },
        { title: 'React (Vite)', value: 'vite' },
        { title: 'React (CRA)', value: 'cra' },
        { title: 'Other', value: 'other' },
      ],
    });

    const { componentsDir } = await prompts({
      type: 'text',
      name: 'componentsDir',
      message: 'Where should components be installed?',
      initial: './components/ui',
    });

    const { baseColor } = await prompts({
      type: 'select',
      name: 'baseColor',
      message: 'Choose a base color:',
      choices: [
        { title: 'Zinc', value: 'zinc' },
        { title: 'Slate', value: 'slate' },
        { title: 'Stone', value: 'stone' },
        { title: 'Gray', value: 'gray' },
        { title: 'Neutral', value: 'neutral' },
      ],
    });

    // Create config file
    const config = {
      componentsDir,
      baseColor,
      cssVariables: true,
      tsx: true,
    };

    await fs.writeJson(path.resolve('frontend-ui.config.json'), config, { spaces: 2 });
    console.log(chalk.green('\n✓ Configuration created!'));
    console.log(chalk.blue('Run `frontend-ui add <component>` to install components.'));
  });
```

---

## 8. Error Handling

```typescript
// packages/cli/src/utils/errors.ts
export class CLIError extends Error {
  constructor(
    message: string,
    public code: string,
    public suggestions?: string[]
  ) {
    super(message);
    this.name = 'CLIError';
  }
}

export function handleError(error: unknown): void {
  if (error instanceof CLIError) {
    console.error(chalk.red(`Error [${error.code}]: ${error.message}`));
    if (error.suggestions) {
      console.error(chalk.yellow('Suggestions:'));
      error.suggestions.forEach(s => console.error(chalk.yellow(`  • ${s}`)));
    }
  } else if (error instanceof Error) {
    console.error(chalk.red('Error:'), error.message);
  } else {
    console.error(chalk.red('Unknown error:'), error);
  }
  process.exit(1);
}
```

---

## 9. Testing CLI Commands

```typescript
// packages/cli/src/commands/__tests__/add.test.ts
import { describe, it, expect, vi } from 'vitest';
import { addCommand } from '../add.js';

describe('add command', () => {
  it('should require component name or --all flag', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    await addCommand.parseAsync(['node', 'frontend-ui', 'add']);
    // Should trigger interactive prompt
    expect(consoleSpy).toHaveBeenCalled();
  });
});
```

---

## 10. Publishing Checklist

```bash
# 1. Build CLI
pnpm --filter @frontend-ui/cli build

# 2. Test locally
npm link
frontend-ui --version
frontend-ui list

# 3. Version bump
pnpm changeset
pnpm changeset version

# 4. Publish
pnpm --filter @frontend-ui/cli publish

# 5. Test from registry
npm install -g @frontend-ui/cli
frontend-ui init
```

---

*Version: 1.0.0 | For Frontend UI CLI Development*
