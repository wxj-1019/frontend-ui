# 贡献指南

感谢你对 Frontend UI 的兴趣！以下是参与贡献的指南。

## 开发环境准备

```bash
# 克隆仓库
git clone https://github.com/frontend-ui/frontend-ui.git
cd frontend-ui

# 安装依赖
pnpm install

# 启动开发服务
pnpm dev
```

## 项目结构

```
frontend-ui/
├── packages/
│   ├── ui/          # 核心组件库
│   └── cli/         # CLI 工具
├── apps/
│   └── docs/        # 文档站点
└── docs/            # 设计文档
```

## 添加新组件

### 1. 创建组件目录

```bash
mkdir -p packages/ui/src/{category}/{component-name}
```

### 2. 必需文件

每个组件需要以下文件：

- `{component-name}.tsx` — 组件实现
- `{component-name}.test.tsx` — 单元测试
- `{component-name}.stories.tsx` — Storybook 故事
- `index.ts` — 统一导出

### 3. 组件规范

- **命名**: PascalCase（如 `BlurText`）
- **Props**: 全部可选，提供合理默认值
- **类型**: 导出 Props 类型接口
- **引擎选择**:
  - 简单动画 → CSS / tailwindcss-animate
  - 声明式动画 → Motion (Framer Motion)
  - 滚动触发 → GSAP (ScrollTrigger)
  - 物理弹簧 → react-spring
  - SVG 路径 → Anime.js
- **可访问性**: 必须支持 `prefers-reduced-motion`

### 4. 模板示例

```tsx
"use client";

import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'motion/react';

export interface MyComponentProps {
  children?: React.ReactNode;
  className?: string;
}

export function MyComponent({ children, className }: MyComponentProps) {
  const shouldReduce = useReducedMotion();
  
  return (
    <motion.div
      className={cn('base-class', className)}
      animate={shouldReduce ? {} : { scale: 1.05 }}
    >
      {children}
    </motion.div>
  );
}
```

### 5. 注册组件

更新以下文件：

1. `packages/ui/src/{category}/index.ts` — 添加导出
2. `packages/ui/tsup.config.ts` — 添加构建入口
3. `apps/docs/lib/component-registry.ts` — 添加注册信息
4. `packages/cli/src/registry.ts` — 添加 CLI 注册
5. 创建 `apps/docs/app/(docs)/{category}/{component-name}/page.tsx` — 文档页面

## 代码规范

- 使用 TypeScript 严格模式
- 使用 Prettier 格式化
- 使用 ESLint 检查
- 提交前运行 `pnpm lint` 和 `pnpm test`

## 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/)：

```
feat: 添加 NeonText 组件
fix: 修复 Magnet SSR 问题
docs: 更新 BlurText 文档
chore: 更新依赖版本
```

## 提交流程

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feat/my-feature`)
3. 提交更改 (`git commit -m 'feat: add new feature'`)
4. 推送分支 (`git push origin feat/my-feature`)
5. 创建 Pull Request

## Pull Request 模板

```markdown
## 描述

简要描述这个 PR 做了什么。

## 更改类型

- [ ] Bug 修复
- [ ] 新功能
- [ ] 文档更新
- [ ] 性能优化
- [ ] 代码重构

## 测试

- [ ] 已通过所有测试
- [ ] 添加了新测试
- [ ] 手动测试通过

## 截图

（如果涉及 UI 更改，请提供截图）
```

## 行为准则

- 尊重所有贡献者
- 接受建设性批评
- 专注于对社区最有利的事情
- 对其他社区成员表示同理心

## 获取帮助

- 加入我们的 [Discord](https://discord.gg/frontend-ui)
- 在 GitHub Discussions 中提问
- 发送邮件至 hello@frontend-ui.dev

---

再次感谢你的贡献！