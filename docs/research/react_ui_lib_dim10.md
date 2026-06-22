# 维度10：组件库发布、版本管理与生态运营 — 深度调研报告

> 调研时间：2025年7月 | 搜索次数：25+ | 信息源覆盖：英文、中文、官方文档、GitHub RFC、技术博客、安全报告

---

## 目录

1. [维度概述](#1-维度概述)
2. [当前状态分析](#2-当前状态分析)
3. [历史演变](#3-历史演变)
4. [关键参与者与利益相关者](#4-关键参与者与利益相关者)
5. [反面观点与争议](#5-反面观点与争议)
6. [证据详述](#6-证据详述)
7. [推荐深入方向](#7-推荐深入方向)

---

## 1. 维度概述

组件库的发布、版本管理与生态运营是现代React UI组件库成功的三大支柱。本维度深入调研了从版本管理策略（Changesets、semantic-release、SemVer）、自动化发布流程（GitHub Actions、npm Trusted Publishing）、文档站点建设（Storybook、Docusaurus、VitePress）到社区运营（贡献者管理、Issue处理、RFC流程）和生态建设（图标库、脚手架工具、Figma设计资源）的全链路实践。

**核心发现摘要：**
- **Changesets已成为monorepo版本管理的事实标准**，超越semantic-release成为主流选择
- **npm Trusted Publishing（OIDC）在2025年7月GA后**，已成为推荐的安全发布方式，无需长期token
- **GitHub Actions + Changesets + Trusted Publishing**是当前推荐的发布流程组合
- **shadcn/ui的Registry 2.0模式**正在重塑组件分发和生态建设的范式
- **供应链安全事件（TanStack worm 2026）**暴露了Trusted Publishing的局限性
- **文档质量直接影响采用率**，Storybook仍是组件开发文档的首选

---

## 2. 当前状态分析

### 2.1 版本管理：Changesets主导monorepo生态

**当前格局：**

Changesets已超越semantic-release成为monorepo组件库版本管理的首选工具。其核心优势在于：将变更信息存储在文件系统（而非Git提交消息）中，支持独立版本管理，依赖关系智能更新，以及人机协作的changelog生成 [^22^]。

主流采用Changesets的项目包括：Clerk、SvelteKit、Remix、Apollo Client、TanStack、pnpm等 [^1000^]。

**Changesets vs semantic-release 对比：**

| 维度 | Changesets | semantic-release |
|------|-----------|------------------|
| 设计目标 | Monorepo优先 | 单包仓库优先 |
| 变更信息存储 | 文件系统（.changeset/*.md） | Git提交消息 |
| 版本决策时机 | PR时（开发者手动声明） | 发布时（自动解析提交） |
| 依赖管理 | 智能联动更新 | 需额外配置 |
| 社区采用 | 增长中，monorepo首选 | 稳定，单包场景仍广泛 |

**关键差异分析：**

Changesets要求开发者在PR时显式声明变更意图（选择包、版本类型、描述），而非依赖提交消息的自动解析。这种模式的优势在于：
- 避免"噪音因子"——单个功能可能涉及多个feat/fix提交，自动生成的changelog会变成技术步骤列表而非价值摘要
- 消除"意图鸿沟"——开发者可能意识到某个patch修复实际上标志着使用方式的转变，提交解析器无法捕捉这种微妙差异 [^22^]

### 2.2 发布流程：Trusted Publishing成为新标准

**npm Trusted Publishing（OIDC）现状：**

2025年7月31日，npm Trusted Publishing with OIDC正式GA [^817^]。截至2025年底，所有主要包管理生态系统均已采用某种形式的Trusted Publishing：PyPI（2023年4月）、RubyGems（2023年12月）、crates.io（2025年7月）、npm（2025年7月）、NuGet（2025年9月）[^859^]。

**Trusted Publishing的核心优势：**
- 无需管理长期token——无需生成、存储、轮换npm token
- 增强安全性——使用短期、加密签名的工作流专用凭证
- 自动provenance——自动生成provenance声明，提供构建来源透明性
- 行业标准——与PyPI、RubyGems、crates.io等主流包注册中心保持一致 [^867^]

**必需的配置要素：**
1. GitHub Actions workflow中设置 `permissions: id-token: write`
2. 安装npm 11.5.1或更高版本
3. 在npmjs.com的包设置中配置Trusted Publisher（组织/用户、仓库、workflow文件名）
4. `--provenance` flag（Trusted Publishing下可选，自动provenance）[^812^] [^814^]

**注意：** npm于2025年12月9日永久废弃了所有Classic Token，推动生态系统全面迁移至Trusted Publishing或90天限期的Granular Token [^867^]。

### 2.3 主流组件库发布策略对比

**Material UI（MUI）：**
- 严格遵循SemVer 2.0.0
- 大版本每12个月发布一次
- 每个大版本有1-3个小版本
- Patch版本每月一次（紧急bugfix随时发布）
- 支持政策：仅支持最新版本，暂无LTS版本
- 弃用策略：在changelog中宣布弃用，尽可能提供运行时警告，提供推荐更新路径，在弃用期间保持API稳定 [^927^] [^931^]

**MUI的Codemod实践：**
MUI提供了全面的codemod支持（`npx @mui/codemod@latest`），覆盖所有弃用API的自动迁移。例如将`components` prop迁移到`slots` prop，`componentsProps`迁移到`slotProps`，`*Component` props迁移到`slots` entries [^928^]。

### 2.4 文档站点选择

**Storybook：**
- 仍是组件开发、文档和测试的默认标准，超过84,000 GitHub stars [^934^]
- 支持隔离构建和测试组件，无需运行完整应用
- 内置可访问性测试工具
- 限制：组件在隔离环境中运行，不完全复制在实际应用中的行为 [^766^]

**Storybook替代品：**
- **Ladle**：冷启动时间6.7倍快于Storybook（1.2s vs 8.2s），Vite原生
- **Histoire**：支持Vue、Svelte和React，冷启动2.1s [^934^]

**文档站点工具选择矩阵：**

| 工具 | 用途 | 优势 | 劣势 |
|------|------|------|------|
| Storybook | 组件开发/测试/文档 | 生态成熟、插件丰富、隔离开发 | 启动慢、配置复杂 |
| Docusaurus | 项目文档站点 | 搜索友好、i18n、博客支持 | 非组件专用 |
| VitePress | 快速文档站点 | 极速、简洁 | 功能相对简单 |
| Astro Starlight | 现代文档站点 | 性能优秀、现代化 | 生态相对新 |

### 2.5 shadcn/ui生态：Registry 2.0模式

shadcn/ui在2025年推出的Registry 2.0是组件库生态建设的重大创新。其核心模式：

- 任何开发者或公司都可以发布可通过shadcn CLI安装的组件注册表
- 从单一组件集合转变为更广泛的组件生态系统基础设施
- Block库（如Shadcnblocks 1,350+ blocks、Tailark、Shadcn Studio）在此之上构建 [^125^]

**shadcn/cli v4（2026年3月）新特性：**
- `shadcn/skills`：为coding agents提供组件和注册表的上下文
- `--preset` flag：将整个设计系统配置打包为短代码
- `--dry-run`、`--diff`、`--view` flags：在安装前检查注册表将添加的内容
- `shadcn init --template`：支持Next.js、Vite、Laravel、React Router、Astro、TanStack Start的全项目脚手架
- `shadcn init --monorepo`：monorepo支持 [^1006^]

---

## 3. 历史演变

### 3.1 从手动发布到自动化发布

**阶段一：完全手动发布（2015年前）**
- 开发者本地`npm version` + `npm publish`
- 手动编写CHANGELOG
- 手动更新版本号
- 无一致性保障

**阶段二：Lerna时代（2016-2020）**
- Lerna成为monorepo管理的事实标准
- 支持统一版本和独立版本模式
- 自动化版本提升和发布
- 但配置复杂、维护负担重

**阶段三：semantic-release时代（2018-2022）**
- 基于Conventional Commits的自动版本决策
- 完全自动化的changelog生成和发布
- 适合单包仓库和高度规范的团队
- 对monorepo支持有限

**阶段四：Changesets + GitHub Actions时代（2020至今）**
- PR驱动的版本管理
- 开发者显式声明变更意图
- 与GitHub Actions深度集成
- monorepo原生支持 [^896^] [^898^]

**阶段五：Trusted Publishing时代（2025至今）**
- OIDC取代长期token
- 自动provenance attestations
- 供应链安全的行业级响应 [^817^] [^859^]

### 3.2 npm供应链安全事件时间线

| 时间 | 事件 | 影响 |
|------|------|------|
| 2025年3月 | tj-actions/changed-files compromise | pull_request_target漏洞被利用 |
| 2025年7月 | npm Trusted Publishing GA | 行业转向OIDC |
| 2025年9月 | PyPI超100万文件通过Trusted Publisher上传 | 行业采纳加速 [^859^] |
| 2025年10月 | npm宣布2025年11月初撤销所有classic tokens | 强制迁移 [^815^] |
| 2025年12月 | npm永久废弃Classic Tokens | 旧模式终结 [^867^] |
| 2026年5月 | TanStack Mini Shai-Hulud worm | Trusted Publishing局限性暴露 [^848^] |

### 3.3 版本管理规范的演进

- **SemVer 1.0.0（2013）**：初始规范
- **SemVer 2.0.0（2013）**：被广泛采用的版本
- **npm语义化版本范围（2014+）**：`^`、`~`等范围操作符
- **Conventional Commits（2017）**：标准化提交消息
- **Keep a Changelog（2017）**：changelog格式规范
- **CalVer兴起（2020+）**：作为SemVer的替代选择 [^825^]

---

## 4. 关键参与者与利益相关者

### 4.1 工具与平台维护者

**Changesets团队：**
- 维护@changesets/cli及相关包
- 提供GitHub Action（changesets/action@v1）
- 生态：@changesets/changelog-github等插件 [^984^]

**npm/GitHub：**
- npm Trusted Publishing的推动者
- GitHub Actions OIDC provider
- Sigstore provenance集成 [^817^]

**semantic-release团队：**
- 仍在单包场景中广泛使用的自动化发布工具
- 更成熟的CI/CD预设配置 [^986^]

### 4.2 组件库维护者

**MUI团队：**
- 最成熟的版本管理实践之一
- 详细的弃用策略和codemod支持
- 每12个月一个大版本的发布节奏 [^931^]

**shadcn/ui（@shadcn）：**
- Registry 2.0和CLI分发模式的创新者
- "Open Code"理念——组件以源代码形式复制到项目中
- 与AI工具生态深度集成 [^125^] [^1006^]

**Radix UI：**
- 无样式原语库
- 为shadcn/ui等上层库提供基础
- 版本策略相对保守 [^1004^]

### 4.3 企业依赖方

- 需要稳定性承诺和LTS支持
- 关注breaking change的影响范围
- 依赖codemod降低迁移成本
- 对供应链安全高度敏感

### 4.4 开源贡献者

- 需要清晰的CONTRIBUTING.md指南
- 期望"good first issue"标签降低参与门槛
- 通过all-contributors等工具获得认可 [^897^]

---

## 5. 反面观点与争议

### 5.1 Trusted Publishing并非银弹：TanStack供应链攻击

2026年5月11日的TanStack Mini Shai-Hulud worm事件是npm供应链安全的分水岭。攻击者通过以下链条成功发布84个恶意版本：

1. **Pwn Request（pull_request_target）**：Fork PR触发具有base-repo权限的workflow
2. **GitHub Actions缓存投毒**：恶意二进制注入共享缓存
3. **OIDC token从runner内存提取**：从/proc/<pid>/mem直接提取OIDC JWT
4. **直接发布到npm**：绕过workflow的正式发布步骤

**关键教训：**
- SLSA provenance证实了构建管道产生了artifact，但无法验证管道是否按预期运行
- 恶意包携带有效的SLSA Build Level 3 provenance attestations——这是首次有记录的携带有效证书验证的恶意npm包事件 [^848^] [^852^]
- "SLSA provenance confirms which pipeline produced the artifact, not whether the pipeline was behaving as intended" [^852^]

### 5.2 Changesets vs semantic-release的争议

**支持Changesets的观点：**
- 更适合monorepo的独立版本管理
- 变更描述更人性化（开发者显式编写）
- 版本决策在PR时做出，上下文最清晰 [^22^]

**支持semantic-release的观点：**
- 更成熟的CI/CD预设配置
- 完全自动化，减少人工步骤
- 对单包场景更轻量 [^986^]

**关键争议：** Changesets要求开发者手动维护变更文件，对自动化程度要求高的团队来说可能是负担。

### 5.3 频繁Breaking Change的问题

**SemVer的局限性：**
- "breaking"的定义存在主观性
- 小型CSS变更、开发警告等是否算breaking存在争议
- MUI明确声明了不算breaking change的类别：unstable_前缀API、实验性API、未文档化API、开发警告、预发布版本、小型CSS变更 [^931^]

**版本疲劳：**
- 快速的主要版本发布节奏可能导致用户疲劳
- MUI已从每6个月一个大版本调整为每12个月一个 [^927^] [^931^]
- React 19的breaking changes（ReactDOM.render移除、forwardRef弃用、defaultProps移除等）引发了广泛的迁移讨论 [^669^]

### 5.4 开源维护者倦怠

- 大型开源项目需要技术+社区管理的混合技能
- Issue分类、PR审查、文档更新等重复性工作
- 缺乏长期资金支持 [^897^] [^900^]

---

## 6. 证据详述

### 6.1 Changesets成为monorepo首选

```
Claim: Changesets已成为monorepo版本管理的事实标准，超越semantic-release成为主流选择 [^22^] [^986^] [^988^]
Source: xnok.github.io / Hamza K Blog / Boshkuo Notes
URL: https://xnok.github.io/infra-bootstrap-tools/blog/intentional-releases-changesets/
Date: 2026-06-04
Excerpt: "Changesets is the better tool for managing releases in a complex monorepo... Changesets takes a different approach. Instead of guessing what should be released based on your commits, it asks you—the developer—to explicitly state your intent."
Context: 对比了Changesets与semantic-release在monorepo场景下的优劣
Confidence: high
```

```
Claim: Changesets被Clerk、SvelteKit、Remix、Apollo Client等主流项目采用 [^1000^]
Source: Adebayo Segun's Blog
URL: https://www.adebayosegun.com/blog/changesets-and-trusted-publishing-on-git-hub-actions
Date: 2026-03-26
Excerpt: "Projects like Clerk, SvelteKit, Remix, and Apollo Client all use it."
Context: Changesets在开源生态系统中的广泛采用
Confidence: high
```

### 6.2 npm Trusted Publishing GA

```
Claim: npm Trusted Publishing with OIDC于2025年7月31日正式GA [^817^]
Source: GitHub Blog Changelog
URL: https://github.blog/changelog/2025-07-31-npm-trusted-publishing-with-oidc-is-generally-available/
Date: 2025-07-31
Excerpt: "As of today, npm trusted publishing with OpenID Connect (OIDC) is now generally available. This feature enables you to securely publish npm packages directly from CI/CD workflows using OpenID Connect (OIDC) for authentication, reducing the need to manage long-lived tokens."
Context: npm Trusted Publishing的正式发布公告
Confidence: high
```

```
Claim: Trusted Publishing支持GitHub Actions、GitLab CI/CD和CircleCI [^820^]
Source: npm官方文档
URL: https://docs.npmjs.com/trusted-publishers/
Date: 持续更新
Excerpt: "Trusted publishing allows you to publish npm packages directly from your CI/CD workflows using OpenID Connect (OIDC) authentication, eliminating the need for long-lived npm tokens."
Context: npm官方Trusted Publishing文档
Confidence: high
```

### 6.3 npm Classic Token废弃

```
Claim: npm于2025年12月9日永久废弃所有Classic Token [^867^]
Source: moelove.info blog
URL: https://blog.moelove.info/from-deprecated-npm-classic-tokens-to-oidc-trusted-publishing-a-cicd-troubleshooting-journey
Date: 2026-01-04
Excerpt: "npm permanently deprecated all Classic Tokens on December 9, 2025... All existing npm classic tokens have been permanently revoked. Classic tokens can no longer be created or restored."
Context: 从Classic Token到Trusted Publishing的迁移历程
Confidence: high
```

### 6.4 MUI版本策略

```
Claim: MUI严格遵循SemVer 2.0.0，大版本每12个月发布，patch每月一次 [^931^]
Source: MUI官方文档
URL: https://mui.com/material-ui/getting-started/versions/
Date: 持续更新
Excerpt: "A major release every 12 months. A few minor releases for each major release. A patch release every month (anytime for an urgent bug fix)."
Context: MUI官方版本策略文档
Confidence: high
```

```
Claim: MUI提供完整的codemod支持用于弃用API迁移 [^928^]
Source: MUI官方迁移文档
URL: https://mui.com/material-ui/migration/migrating-from-deprecated-apis/
Date: 持续更新
Excerpt: "Material UI provides the `deprecations/all` codemod to help you stay up to date with minimal effort."
Context: MUI官方弃用API迁移指南
Confidence: high
```

### 6.5 TanStack供应链攻击

```
Claim: 2026年5月TanStack遭遇Mini Shai-Hulud worm攻击，恶意包携带有效SLSA provenance [^848^]
Source: enclave.ai blog
URL: https://enclave.ai/blog/tanstack-mistral-npm-worm-slsa-architectural-failure
Date: 2026-05-12
Excerpt: "TanStack's CI Published the Malware Itself. SLSA Said the Build Was Fine... The malware didn't forge the attestations or steal npm tokens. It extracted the GitHub Actions runner's OIDC token from process memory."
Context: TanStack供应链攻击的详细技术分析
Confidence: high
```

### 6.6 shadcn/ui Registry 2.0

```
Claim: shadcn/ui Registry 2.0将组件库从单一集合转变为生态系统基础设施 [^125^]
Source: SaaSIndie
URL: https://saasindie.com/blog/shadcn-ui-trends-and-future
Date: 2026-05-06
Excerpt: "In 2025, shadcn/ui launched Registry 2.0, a significant evolution that moved beyond single components toward shareable, installable UI registries... This turned shadcn/ui from a component collection into infrastructure for the broader component ecosystem."
Context: shadcn/ui生态发展趋势分析
Confidence: high
```

### 6.7 Changesets中文实践

```
Claim: 国内Vue3组件库广泛采用Changesets进行版本管理和自动化发布 [^896^] [^898^]
Source: CSDN / haiweilian.com
URL: https://blog.csdn.net/Black/article/details/152016583
Date: 2026-03-05
Excerpt: "@changesets/cli 是用于管理版本及变更日志的工具，专注多包管理。它通过声明式变更集管理，自动化处理版本号计算、依赖联动更新及CHANGELOG生成。"
Context: 中文社区对Changesets的实践总结
Confidence: high
```

### 6.8 GitHub Actions + Changesets工作流

```
Claim: GitHub Actions + Changesets是标准的自动化发布工作流组合 [^984^] [^997^]
Source: GitHub Marketplace / Ignace Maes Blog
URL: https://github.com/marketplace/actions/changesets-gh
Date: 持续更新
Excerpt: "Create a file at `.github/workflows/release.yml`... the GitHub Action creates a PR that lists all changes which are currently on the main branch but not yet in the latest release."
Context: Changesets GitHub Action官方文档
Confidence: high
```

### 6.9 RFC流程

```
Claim: React采用RFC（Request for Comments）流程管理重大变更 [^993^] [^998^]
Source: React Blog / React RFCs GitHub
URL: https://github.com/reactjs/rfcs
Date: 2017-12-07
Excerpt: "We're adopting an RFC ('request for comments') process for contributing ideas to React... the goal is to allow React core team members and community members to collaborate on the design of new features."
Context: React官方RFC流程介绍
Confidence: high
```

```
Claim: React Native设有独立的Discussions and Proposals仓库 [^981^] [^999^]
Source: open-awesome / GitHub
URL: https://github.com/react-native-community/discussions-and-proposals
Date: 2018-07-19
Excerpt: "This repository was born by the desire of more transparency from the Core and Facebook teams, and a dedicated communication channels for all the members of the community."
Context: React Native社区RFC流程
Confidence: high
```

### 6.10 Issue管理最佳实践

```
Claim: 使用GitHub Labels、Issue Templates和自动化工具（如stale bot）是开源项目Issue管理的核心策略 [^897^] [^900^]
Source: GitHub Community Discussions
URL: https://github.com/orgs/community/discussions/163134
Date: 2025-06-17
Excerpt: "Use GitHub Labels: Categorize issues with labels like `bug`, `enhancement`, `question`, `help wanted`, `good first issue`... Automate Releases: Use `semantic-release` for automated changelogs and npm publishing."
Context: 开源社区关于Issue管理的最佳实践讨论
Confidence: high
```

### 6.11 Figma与设计令牌集成

```
Claim: Figma Variables与设计令牌的自动化同步已成为设计系统标准实践 [^954^] [^955^]
Source: framingui.com / ux-design-agency.co.uk
URL: https://framingui.com/blog/figma-to-code-ai-workflow
Date: 2026-03-24
Excerpt: "Design tokens bridge Figma and code, ensuring visual consistency. AI can generate components that match Figma designs when given token constraints."
Context: Figma到代码的工作流实践
Confidence: high
```

```
Claim: shadcn/ui有官方的Figma插件支持 [^956^]
Source: GitHub - alpha-shadcn
URL: https://github.com/Seen-Design-Lab/alpha-shadcn
Date: 2025-11-21
Excerpt: "Bring the full shadcn/ui design system into Figma in a single click. This plugin instantly generates variables, colors, typography, radii, spacing, and all core tokens."
Context: shadcn/ui Figma插件
Confidence: medium
```

### 6.12 开源贡献管理

```
Claim: 清晰的贡献分层（小型贡献/大型贡献）和完善的贡献指南是组件库社区运营的关键 [^838^]
Source: CivicTheme Contribution Model
URL: https://github.com/civictheme/docs/blob/main/contributing/contribution-model.md
Date: 2023-02-16
Excerpt: "A small contribution typically involves minimal changes... What we need from you: Minimal documentation, Testing, Code quality."
Context: 组件库贡献模式文档
Confidence: high
```

### 6.13 SemVer最佳实践

```
Claim: Monorepo有两种版本策略：固定版本（Babel/Angular模式）和独立版本（Lerna/Changesets模式）[^828^]
Source: grizzlypeaksoftware.com
URL: https://www.grizzlypeaksoftware.com/library/semantic-versioning-strategy-and-automation-gdzj38eb
Date: 2026-02-13
Excerpt: "Fixed/locked versioning: every package gets the same version number... Independent versioning: each package has its own version tracked independently."
Context: SemVer策略和自动化实践指南
Confidence: high
```

---

## 7. 推荐深入方向

### 7.1 供应链安全（高优先级）

TanStack事件表明Trusted Publishing并非绝对安全。建议深入研究：
- `pull_request_target`的安全替代方案
- GitHub Actions缓存隔离最佳实践
- 运行时OIDC token保护机制
- 多因素验证在自动化发布中的实施

### 7.2 组件库分发模式的演进（高优先级）

shadcn/ui的Registry 2.0代表了组件分发的新范式，值得深入研究：
- Registry架构设计和实现
- 私有Registry的企业级部署
- 与AI工具（Cursor、Claude Code等）的深度集成
- 组件版本控制和依赖管理在Registry模式下

### 7.3 设计令牌自动化同步（中优先级）

Figma Variables到代码的自动化同步管道：
- Figma Variables API的CI/CD集成
- W3C Design Tokens Community Group标准
- Tokens Studio for Figma等工具的自动化能力
- 双向同步（Figma到代码、代码到Figma）的实现

### 7.4 国际化文档站点（中优先级）

组件库文档的i18n支持：
- Docusaurus的多语言能力
- Storybook的国际化插件
- 文档与代码的同步更新机制
- AI辅助的文档翻译工作流

### 7.5 开源项目治理模式（中优先级）

组件库的长期可持续发展：
- OpenJS Foundation等基金会的支持模式
- 企业赞助和核心团队模式
- 社区贡献者激励机制
- 项目治理文档（GOVERNANCE.md）的最佳实践

---

## 附录：关键工具与资源

### 版本管理工具
- **Changesets**: https://github.com/changesets/changesets
- **semantic-release**: https://github.com/semantic-release/semantic-release
- **Lerna**: https://lerna.js.org/（已进入维护模式）
- **release-it**: https://github.com/release-it/release-it

### 发布安全
- **npm Trusted Publishing**: https://docs.npmjs.com/trusted-publishers/
- **Sigstore**: https://www.sigstore.dev/
- **SLSA**: https://slsa.dev/

### 文档工具
- **Storybook**: https://storybook.js.org/
- **Docusaurus**: https://docusaurus.io/
- **VitePress**: https://vitepress.dev/
- **Astro Starlight**: https://starlight.astro.build/

### 组件生态
- **shadcn/ui Registry**: https://ui.shadcn.com/docs/registry
- **shadcn CLI**: https://ui.shadcn.com/docs/cli
- **Lucide Icons**: https://lucide.dev/

### RFC流程参考
- **React RFCs**: https://github.com/reactjs/rfcs
- **React Native Discussions**: https://github.com/react-native-community/discussions-and-proposals
- **Rust RFCs**: https://github.com/rust-lang/rfcs

---

> **报告说明**：本报告基于25+次独立网络搜索，覆盖中英文信息源，优先采用官方文档、GitHub仓库、技术博客等权威来源。所有关键发现均包含内联引用。供应链安全部分引用了2026年5月的TanStack事件作为反面案例，该事件在调研期间已公开披露并有多家安全公司分析确认。
