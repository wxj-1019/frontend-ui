import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import prompts from 'prompts';

interface ComponentInfo {
  name: string;
  category: string;
  files: string[];
}

const COMPONENTS: Record<string, ComponentInfo> = {
  'blur-text': {
    name: 'BlurText',
    category: 'text-animations',
    files: ['blur-text.tsx', 'index.ts'],
  },
  'gradient-text': {
    name: 'GradientText',
    category: 'text-animations',
    files: ['gradient-text.tsx', 'index.ts'],
  },
  'split-text': {
    name: 'SplitText',
    category: 'text-animations',
    files: ['split-text.tsx', 'index.ts'],
  },
  'typewriter': {
    name: 'Typewriter',
    category: 'text-animations',
    files: ['typewriter.tsx', 'index.ts'],
  },
  'scramble-text': {
    name: 'ScrambleText',
    category: 'text-animations',
    files: ['scramble-text.tsx', 'index.ts'],
  },
  'wave-text': {
    name: 'WaveText',
    category: 'text-animations',
    files: ['wave-text.tsx', 'index.ts'],
  },
  'glitch-text': {
    name: 'GlitchText',
    category: 'text-animations',
    files: ['glitch-text.tsx', 'index.ts'],
  },
  'count-up': {
    name: 'CountUp',
    category: 'text-animations',
    files: ['count-up.tsx', 'index.ts'],
  },
  'decrypted-text': {
    name: 'DecryptedText',
    category: 'text-animations',
    files: ['decrypted-text.tsx', 'index.ts'],
  },
  'magnet': {
    name: 'Magnet',
    category: 'animations',
    files: ['magnet.tsx', 'index.ts'],
  },
  'fade-content': {
    name: 'FadeContent',
    category: 'animations',
    files: ['fade-content.tsx', 'index.ts'],
  },
  'scroll-reveal': {
    name: 'ScrollReveal',
    category: 'animations',
    files: ['scroll-reveal.tsx', 'index.ts'],
  },
  'draggable': {
    name: 'Draggable',
    category: 'animations',
    files: ['draggable.tsx', 'index.ts'],
  },
  'flip-card': {
    name: 'FlipCard',
    category: 'animations',
    files: ['flip-card.tsx', 'index.ts'],
  },
  'accordion': {
    name: 'Accordion',
    category: 'animations',
    files: ['accordion.tsx', 'index.ts'],
  },
  'tabs': {
    name: 'Tabs',
    category: 'animations',
    files: ['tabs.tsx', 'index.ts'],
  },
  'modal': {
    name: 'Modal',
    category: 'animations',
    files: ['modal.tsx', 'index.ts'],
  },
  'toast': {
    name: 'Toast',
    category: 'animations',
    files: ['toast.tsx', 'index.ts'],
  },
  'click-spark': {
    name: 'ClickSpark',
    category: 'animations',
    files: ['click-spark.tsx', 'index.ts'],
  },
  'blob-cursor': {
    name: 'BlobCursor',
    category: 'animations',
    files: ['blob-cursor.tsx', 'index.ts'],
  },
  'crosshair-cursor': {
    name: 'CrosshairCursor',
    category: 'animations',
    files: ['crosshair-cursor.tsx', 'index.ts'],
  },
  'float-animation': {
    name: 'FloatAnimation',
    category: 'animations',
    files: ['float-animation.tsx', 'index.ts'],
  },
  'stagger-animation': {
    name: 'StaggerAnimation',
    category: 'animations',
    files: ['stagger-animation.tsx', 'index.ts'],
  },
  'dock': {
    name: 'Dock',
    category: 'components',
    files: ['dock.tsx', 'index.ts'],
  },
  'spotlight-card': {
    name: 'SpotlightCard',
    category: 'components',
    files: ['spotlight-card.tsx', 'index.ts'],
  },
  'masonry': {
    name: 'Masonry',
    category: 'components',
    files: ['masonry.tsx', 'index.ts'],
  },
  'carousel': {
    name: 'Carousel',
    category: 'components',
    files: ['carousel.tsx', 'index.ts'],
  },
  'stack-cards': {
    name: 'StackCards',
    category: 'components',
    files: ['stack-cards.tsx', 'index.ts'],
  },
  'tilt-card': {
    name: 'TiltCard',
    category: 'components',
    files: ['tilt-card.tsx', 'index.ts'],
  },
  'bounce-cards': {
    name: 'BounceCards',
    category: 'components',
    files: ['bounce-cards.tsx', 'index.ts'],
  },
  'glow-card': {
    name: 'GlowCard',
    category: 'components',
    files: ['glow-card.tsx', 'index.ts'],
  },
};

export async function addComponent(
  componentName: string,
  options: { output: string; yes: boolean }
) {
  const component = COMPONENTS[componentName];

  if (!component) {
    console.log(chalk.red(`Component "${componentName}" not found.`));
    console.log(chalk.gray('Run "frontend-ui list" to see available components.'));
    return;
  }

  const outputDir = path.resolve(process.cwd(), options.output, component.category);

  console.log(chalk.blue(`\nAdding ${component.name} to ${outputDir}\n`));

  if (!options.yes) {
    const { confirm } = await prompts({
      type: 'confirm',
      name: 'confirm',
      message: `Install ${component.name} to ${outputDir}?`,
      initial: true,
    });

    if (!confirm) {
      console.log(chalk.yellow('Cancelled.'));
      return;
    }
  }

  // Create directory
  await fs.ensureDir(outputDir);

  // Copy files
  for (const file of component.files) {
    const sourcePath = path.join(
      process.cwd(),
      'packages/ui/src',
      component.category,
      componentName,
      file
    );

    const destPath = path.join(outputDir, componentName, file);

    try {
      if (await fs.pathExists(sourcePath)) {
        await fs.ensureDir(path.dirname(destPath));
        await fs.copy(sourcePath, destPath);
        console.log(chalk.green(`  ✓ ${file}`));
      } else {
        console.log(chalk.yellow(`  ⚠ ${file} not found in source`));
      }
    } catch (error) {
      console.log(chalk.red(`  ✗ ${file}: ${error}`));
    }
  }

  console.log(chalk.green(`\n✓ ${component.name} installed successfully!`));
  console.log(chalk.gray(`\nImport with: import { ${component.name} } from "./${options.output}/${component.category}/${componentName}";\n`));
}
