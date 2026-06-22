"use client";

import Link from "next/link";
import { ScrollReveal } from "@frontend-ui/ui";
import { CodeBlock } from "@/components/ui/CodeBlock";

const sections = [
  {
    title: "前置条件",
    content: [
      "Node.js >= 18（推荐使用 LTS 版本）",
      "pnpm >= 9（本项目使用 pnpm 作为包管理器，不支持 npm 或 yarn）",
      "Git 最新版本",
      "VS Code（推荐安装 ESLint、Prettier 等扩展）",
    ],
  },
  {
    title: "项目结构",
    content: [
      "本项目采用 pnpm workspace 管理的 Monorepo 架构：",
    ],
    code: `frontend-ui/
├── apps/
│   └── docs/              # 文档站点（Next.js）
│       ├── app/           # 页面路由
│       ├── components/    # 文档专用组件
│       └── lib/           # 工具库（含组件注册表）
├── packages/
│   └── ui/                # UI 组件库（核心包）
│       └── src/
│           └── components/ # 所有动画组件
├── package.json
├── pnpm-workspace.yaml
└── tsconfig.json`,
  },
  {
    title: "开发环境搭建",
    content: [
      "1. Fork 并克隆仓库到本地",
      "2. 运行 pnpm install 安装所有依赖（会自动链接 workspace 包）",
      "3. 运行 pnpm dev 启动本地开发服务器",
      "4. 打开 http://localhost:3000 查看文档站",
      "5. 修改 packages/ui/src/components/ 下的组件代码，文档站会自动热更新",
    ],
  },
  {
    title: "代码规范",
    content: [
      "使用 TypeScript 编写所有代码",
      "遵循 ESLint 和 Prettier 配置（运行 pnpm lint 和 pnpm format）",
      "组件使用 PascalCase 命名，文件名使用 kebab-case",
      "导出的组件必须包含完整的 Props 类型定义",
      "每个组件需要包含 JSDoc 注释",
    ],
  },
  {
    title: "如何添加新组件",
    content: [
      "按照以下步骤在 packages/ui/src/components/ 下创建新组件：",
    ],
    code: `# 1. 创建组件目录和文件
packages/ui/src/components/my-component/
├── my-component.tsx       # 组件主文件
├── my-component.test.tsx  # 单元测试
├── index.ts               # 导出文件
└── types.ts               # Props 类型定义

# 2. 在 index.ts 中导出
export { MyComponent } from "./my-component";
export type { MyComponentProps } from "./types";

# 3. 在 apps/docs/lib/component-registry.ts 中注册
{
  id: "my-component",
  name: "My Component",
  category: "components",  // 选择分类
  engine: "css",           // 动画引擎
  description: "组件描述",
}

# 4. 创建文档页面
apps/docs/app/(docs)/docs/components/my-component/page.tsx`,
    extra: [
      "命名规范：组件文件名与文件夹名一致，使用 kebab-case",
      "Props 类型定义在独立的 types.ts 文件中",
      "每个组件必须支持 tree-shaking（使用 named export）",
    ],
  },
  {
    title: "提交规范",
    content: [
      "本项目遵循 Conventional Commits 规范，提交格式如下：",
    ],
    code: `<type>(<scope>): <description>

# 示例
feat(text-animations): add Typewriter component
fix(gsap-animations): resolve gsap timeline memory leak
docs(components): update Button usage examples
chore(deps): upgrade framer-motion to v11

# type 类型：
# feat     - 新功能
# fix      - Bug 修复
# docs     - 文档更新
# style    - 代码格式（不影响功能）
# refactor - 重构
# test     - 测试
# chore    - 构建/工具变动`,
  },
  {
    title: "代码审查",
    content: [
      "所有 PR 需要至少一位维护者审核通过后才能合并",
      "审核关注点：代码质量、性能影响、API 设计一致性、文档完整性",
      "确保 CI 流水线（lint、test、build）全部通过",
      "PR 描述需说明修改内容、动机和影响范围",
      "如有破坏性变更，需在 PR 中明确标注",
    ],
  },
  {
    title: "测试要求",
    content: [
      "所有新组件必须编写单元测试",
      "使用 React Testing Library 进行组件测试",
      "测试覆盖组件的主要交互和边界情况",
      "确保 CI/CD 流水线全部通过（运行 pnpm test）",
      "对于动画组件，需要验证动画状态的正确性",
    ],
  },
];

export default function ContributingPage() {
  return (
    <div className="space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-subtle)]">
        <Link href="/docs" className="hover:text-[var(--color-text-primary)]">
          文档
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text-primary)]">贡献指南</span>
      </nav>

      {/* Header */}
      <ScrollReveal>
        <div>
          <h1 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">
            贡献指南
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">
            感谢你对 Frontend UI 的关注！以下是参与项目开发的完整指南
          </p>
        </div>
      </ScrollReveal>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((section, index) => (
          <ScrollReveal key={section.title} delay={index * 0.1}>
            <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6">
              <h2 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
                {section.title}
              </h2>
              <ul className="mt-4 space-y-2">
                {section.content.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[var(--color-text-muted)]"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {section.code && (
                <div className="mt-4">
                  <CodeBlock code={section.code} language="bash" />
                </div>
              )}
              {section.extra && (
                <ul className="mt-4 space-y-2">
                  {section.extra.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[var(--color-text-muted)]"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Contact */}
      <ScrollReveal>
        <div className="rounded-xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 p-6">
          <h2 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
            需要帮助？
          </h2>
          <p className="mt-2 text-[var(--color-text-muted)]">
            如果你有任何问题，欢迎通过 GitHub Issues 或 Discussions 与我们联系。
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
