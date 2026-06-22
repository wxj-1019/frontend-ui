import chalk from 'chalk';

interface ComponentInfo {
  name: string;
  category: string;
  description: string;
  engine: string;
}

const COMPONENTS: ComponentInfo[] = [
  // Text Animations
  { name: 'BlurText', category: 'text-animations', description: '模糊渐入的文字动画效果', engine: 'Motion' },
  { name: 'GradientText', category: 'text-animations', description: '渐变色彩的文字效果', engine: 'CSS' },
  { name: 'SplitText', category: 'text-animations', description: '文字分割动画效果', engine: 'Motion' },
  { name: 'Typewriter', category: 'text-animations', description: '打字机效果', engine: 'CSS' },
  { name: 'ScrambleText', category: 'text-animations', description: '乱码解密文字效果', engine: 'GSAP' },
  { name: 'WaveText', category: 'text-animations', description: '波浪文字，字符依次浮动', engine: 'CSS' },
  { name: 'GlitchText', category: 'text-animations', description: '故障艺术文字', engine: 'CSS' },
  { name: 'CountUp', category: 'text-animations', description: '数字递增动画', engine: 'Motion' },
  { name: 'DecryptedText', category: 'text-animations', description: '文字解密动画效果', engine: 'CSS' },
  
  // Animations
  { name: 'Magnet', category: 'animations', description: '磁吸效果组件', engine: 'Motion' },
  { name: 'FadeContent', category: 'animations', description: '渐入内容动画', engine: 'Motion' },
  { name: 'ScrollReveal', category: 'animations', description: '滚动触发动画', engine: 'Motion' },
  { name: 'Draggable', category: 'animations', description: '可拖拽元素', engine: 'Motion' },
  { name: 'FlipCard', category: 'animations', description: '翻转卡片', engine: 'CSS' },
  { name: 'Accordion', category: 'animations', description: '手风琴展开折叠面板', engine: 'Motion' },
  { name: 'Tabs', category: 'animations', description: '标签页切换', engine: 'Motion' },
  { name: 'Modal', category: 'animations', description: '模态框动画', engine: 'Motion' },
  { name: 'Toast', category: 'animations', description: '通知提示', engine: 'Motion' },
  { name: 'ClickSpark', category: 'animations', description: '点击粒子爆炸特效', engine: 'Motion' },
  { name: 'BlobCursor', category: 'animations', description: '液态光标跟随效果', engine: 'CSS' },
  { name: 'CrosshairCursor', category: 'animations', description: '十字准星光标效果', engine: 'CSS' },
  { name: 'FloatAnimation', category: 'animations', description: '浮动动画', engine: 'react-spring' },
  { name: 'StaggerAnimation', category: 'animations', description: '交错动画', engine: 'animejs' },
  
  // Components
  { name: 'Dock', category: 'components', description: 'macOS 风格的停靠栏', engine: 'Motion' },
  { name: 'SpotlightCard', category: 'components', description: '聚光灯追踪卡片', engine: 'CSS' },
  { name: 'Masonry', category: 'components', description: '瀑布流布局', engine: 'CSS' },
  { name: 'Carousel', category: 'components', description: '轮播图组件', engine: 'Motion' },
  { name: 'StackCards', category: 'components', description: '堆叠卡片', engine: 'Motion' },
  { name: 'TiltCard', category: 'components', description: '3D 倾斜卡片', engine: 'Motion' },
  { name: 'BounceCards', category: 'components', description: '弹跳卡片堆叠组件', engine: 'Motion' },
  { name: 'GlowCard', category: 'components', description: '发光卡片组件', engine: 'Motion' },
];

const CATEGORIES: Record<string, string> = {
  'text-animations': '文字动画',
  'animations': '交互动画',
  'components': '复合组件',
  'backgrounds': '背景特效',
  'gsap-animations': 'GSAP 动画',
  'blocks': '页面区块',
};

export async function listComponents(options: { category?: string }) {
  console.log(chalk.blue('\n📦 Available Components:\n'));

  const categories = options.category
    ? [options.category]
    : [...new Set(COMPONENTS.map((c) => c.category))];

  for (const category of categories) {
    const categoryComponents = COMPONENTS.filter((c) => c.category === category);
    const categoryName = CATEGORIES[category] || category;

    console.log(chalk.yellow(`\n  ${categoryName} (${categoryComponents.length})`));
    console.log(chalk.gray('  ' + '─'.repeat(50)));

    for (const component of categoryComponents) {
      const engine = component.engine ? chalk.gray(` [${component.engine}]`) : '';
      console.log(`  ${chalk.green('●')} ${chalk.white(component.name)}${engine}`);
      console.log(`    ${chalk.gray(component.description)}`);
    }
  }

  console.log(chalk.blue(`\n  Total: ${COMPONENTS.length} components\n`));
  console.log(chalk.gray('  Use "frontend-ui add <component-name>" to install a component\n'));
}
