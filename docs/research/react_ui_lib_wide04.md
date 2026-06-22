# React UI组件库样式方案与设计令牌 — 深度调研报告（2025年）

> 调研时间：2025年7月  
> 调研维度：样式方案对比、零运行时CSS-in-JS、Design Tokens架构、Tailwind CSS v4、主题系统、CSS Custom Properties  
> 搜索次数：12批独立搜索（中英文覆盖）

---

## 目录

1. [执行摘要](#1-执行摘要)
2. [CSS方案全景对比](#2-css方案全景对比)
3. [零运行时CSS-in-JS深度分析](#3-零运行时css-in-js深度分析)
4. [Design Tokens架构与标准](#4-design-tokens架构与标准)
5. [Tailwind CSS v4革命性升级](#5-tailwind-css-v4革命性升级)
6. [主题系统与深色模式](#6-主题系统与深色模式)
7. [CSS Custom Properties变量系统](#7-css-custom-properties变量系统)
8. [2025年趋势判断与推荐](#8-2025年趋势判断与推荐)
9. [主要参与者与来源](#9-主要参与者与来源)
10. [争议与冲突观点](#10-争议与冲突观点)
11. [推荐深入调研方向](#11-推荐深入调研方向)

---

## 1. 执行摘要

2025年，React UI组件库的样式方案格局发生了根本性转变。**Tailwind CSS以约68%的采用率成为主导方案** [^23^]，而传统的运行时CSS-in-JS（styled-components、Emotion）正快速衰退——styled-components已于2025年3月正式进入维护模式 [^13^]。与此同时，**零运行时CSS-in-JS解决方案**（Panda CSS、Vanilla Extract、Linaria、StyleX）迅速崛起，成为大型应用的首选 [^23^]。

W3C Design Tokens Community Group (DTCG) 于2025年10月发布了首个稳定版本（v1），为设计令牌的标准化交换奠定了基础 [^92^][^94^]。Tailwind CSS v4于2025年1月发布，采用Rust编写的Oxide引擎，实现了5-100倍的构建速度提升 [^27^][^60^]。

**核心结论**：
- **快速原型/营销站点**：Tailwind CSS是最佳选择
- **组件库/设计系统**：Panda CSS或StyleX
- **大型TypeScript应用**：Vanilla Extract
- **从styled-components迁移**：Linaria
- **Design Tokens**：遵循W3C DTCG标准，采用三层架构

---

## 2. CSS方案全景对比

### 2.1 主流方案概览

| 方案类型 | 代表工具 | 运行时开销 | RSC兼容 | 2025采用率 |
|---------|---------|-----------|---------|-----------|
| Utility-first CSS | Tailwind CSS | 无 | 完全兼容 | ~68% [^23^] |
| 零运行时CSS-in-JS | Panda CSS | 无 | 完全兼容 | 快速增长 |
| 零运行时CSS-in-JS | Vanilla Extract | 无 | 完全兼容 | 增长中 |
| 零运行时CSS-in-JS | Linaria | 无 | 完全兼容 | 稳定 |
| 零运行时CSS-in-JS | StyleX (Meta) | 无 | 完全兼容 | 小众 |
| 运行时CSS-in-JS | styled-components | 高 (~12KB) | 不兼容 | 衰退中 [^13^] |
| 运行时CSS-in-JS | Emotion | 高 (~11KB) | 部分兼容 | 略降 |
| CSS Modules | 内置支持 | 无 | 完全兼容 | 稳定 |

### 2.2 运行时CSS-in-JS的衰落

运行时CSS-in-JS在2020年达到顶峰（约40%采用率），但此后急剧下降 [^23^]。其面临的核心问题包括：

1. **React Server Components不兼容**：RSC无法在服务端使用React Context，而Emotion/styled-components依赖Context进行主题管理 [^142^]
2. **运行时性能成本**：增加7-16KB JS包大小，20-50ms额外可交互时间 [^123^]
3. **Hydration速度慢**：服务端渲染时需要额外的样式注入步骤 [^23^]
4. **维护模式**：styled-components于2025年3月宣布进入维护模式，维护者明确建议不要在新项目中采用 [^13^][^100^]

### 2.3 性能对比数据

根据2025年多项性能测试 [^23^][^28^][^135^]：

| 解决方案 | 运行时开销 | Bundle影响 | Hydration速度 | 构建速度 |
|---------|-----------|-----------|-------------|---------|
| Tailwind CSS | 无 | 最小（已清除） | 最快 | 5-100x（v4） |
| Panda CSS | 零 | 小 | 优秀 | 快速 |
| Vanilla Extract | 零 | 小 | 优秀 | 3.2s (dev) / 12.5s (prod) |
| Linaria | 零 | 小 | 优秀 | 2.8s (dev) / 11.7s (prod) |
| StyleX | 零 | 小 | 优秀 | 快速 |
| styled-components | 高 | 大 | 慢 | N/A |

> **关键发现**：Tailwind CSS确实使CSS更小、HTML/JS更大。在Developer Way的测试中，CSS减少13%，JS增加3%，HTML在SSR模式下增加4%-162% [^28^]。但由于压缩效果出色，实际性能影响几乎为零——LCP（最大内容绘制）时间完全相同 [^28^]。

### 2.4 各方案适用场景

根据2025年决策矩阵 [^23^][^105^]：

| 项目类型 | 推荐方案 | 理由 |
|---------|---------|------|
| 快速原型/营销站点 | Tailwind CSS | 最快原型速度，一致的设计系统 |
| 组件库/设计系统 | Panda CSS 或 StyleX | Token内置，TypeScript安全 |
| 大型应用（严格类型） | Vanilla Extract | 完整类型安全，零运行时 |
| 从styled-components迁移 | Linaria | 类似语法，零运行时 |
| 动态运行时主题 | Emotion（最后选择） | 真正的运行时主题化 |

---

## 3. 零运行时CSS-in-JS深度分析

### 3.1 共同特征

零运行时CSS-in-JS解决方案的核心优势是在构建时生成静态CSS文件，消除运行时的JS开销 [^23^][^84^]。它们的共同特征包括：

- 样式在构建时提取为静态CSS文件
- 零运行时开销
- 完全兼容React Server Components
- 支持TypeScript类型安全

### 3.2 各方案详细分析

#### 3.2.1 Panda CSS（Chakra UI团队）

Panda CSS是Chakra UI作者推出的零运行时CSS-in-JS方案，定位为"传统CSS-in-JS的精神继承者" [^84^][^102^]。

**核心特性** [^104^][^110^]：
- 零运行时开销，构建时生成原子CSS
- 完整的TypeScript类型安全
- 内置Design Tokens系统（tokens + recipes）
- 类似CSS-in-JS的编写体验
- 完全兼容React 19和RSC

**代码示例** [^104^]：
```typescript
import { css } from '../styled-system/css'

function Button() {
  return (
    <button className={css({
      bg: 'blue.500',
      color: 'white',
      padding: '8px 16px',
      borderRadius: 'md',
      _hover: { bg: 'blue.600' }
    })}>
      Click
    </button>
  )
}
```

**适用场景**：组件库开发、设计系统、需要CSS-in-JS开发体验但要求RSC支持的项目。

#### 3.2.2 Vanilla Extract

Vanilla Extract提供了样式生态中最强大的TypeScript集成 [^84^][^68^]。

**核心特性** [^63^][^68^]：
- 在`.css.ts`文件中编写样式
- 完整的类型安全，编译期设计令牌校验
- 零运行时开销
- 局部作用域类名和CSS变量
- 框架无关

**主题系统** [^63^]：
```typescript
import { createTheme } from '@vanilla-extract/css'

export const [themeClass, vars] = createTheme({
  color: {
    brand: 'blue'
  },
  space: {
    small: '4px',
    medium: '8px'
  }
})
```

**优势**：对于TypeScript重度项目，Vanilla Extract的类型安全 invaluable [^84^]。

#### 3.2.3 Linaria

Linaria是一个零运行时CSS-in-JS库，允许开发者使用熟悉的CSS语法编写样式 [^24^][^137^]。

**核心特性** [^136^][^137^]：
- 使用CSS语法（模板字符串），减少上下文切换
- 构建时提取CSS到独立文件
- 通过CSS变量支持动态样式
- 与stylelint、CSS自动补全、语法高亮集成
- Airbnb已大规模采用 [^137^]

**Airbnb迁移经验** [^137^]：
- Linaria的模板字符串API相比JS对象HOC API是"有吸引力的改进"
- 样式与组件同文件是选择Linaria的关键因素
- 构建时提取带来缓存优势（CSS文件变更频率与JS不同）
- 支持SSR关键CSS注入

**动态样式实现** [^24^]：
```javascript
import { styled } from '@linaria/react'

const Container = styled.div`
  font-size: ${sizes.medium}px;
  color: ${props => props.color};  // 通过CSS变量实现
  border: 1px solid red;
`
```

#### 3.2.4 StyleX（Meta/Facebook）

StyleX是Meta内部使用并开源的原子CSS-in-JS方案 [^85^][^100^]。

**核心特性** [^85^]：
- Babel插件在编译时将样式转换为原子类名
- 极小的运行时（仅需合并类名字符串）
- 类型安全（TypeScript/Flow）
- 样式自动管理特异性，保证"最后应用的样式总是获胜"
- 在组件文件内编写样式（co-location）

**架构** [^85^]：
- Babel插件：查找并提取源代码中的样式定义
- 小型运行时库：高效合并类名字符串
- ESLint插件
- 与打包工具和框架的集成集合

**Meta内部验证**：StyleX被设计用于Meta级别的大规模代码库，处理数千个组件的样式编译 [^85^]。

#### 3.2.5 Pigment CSS（MUI）

Pigment CSS是MUI团队为替代Emotion而开发的零运行时CSS-in-JS方案 [^142^][^141^]。

**背景** [^142^]：
- 从Linaria fork开始，后转向WyW-in-JS（同样驱动Linaria的开源库）
- 优先保持Emotion/styled-components类似的API体验
- 提供codemods以减少迁移摩擦

**核心目标** [^142^]：
- RSC兼容（解决Emotion的Context依赖问题）
- 保持嵌套选择器支持（不同于Tailwind/StyleX的原子CSS方案）
- 平滑迁移路径（从MUI v5的Emotion迁移）

**当前状态**（截至2025年）：Pigment CSS仍在开发中，尚未正式发布v1，MUI v7仍使用Emotion [^141^]。

---

## 4. Design Tokens架构与标准

### 4.1 W3C Design Tokens标准（DTCG）

2025年10月，W3C Design Tokens Community Group发布了首个稳定版本（v2025.10）[^92^][^94^][^99^]。

**核心规范** [^8^][^88^][^91^]：

```json
{
  "color": {
    "brand": {
      "primary": {
        "$value": "#0066ff",
        "$type": "color",
        "$description": "Main brand color"
      }
    }
  }
}
```

**关键字段**：
- `$value`：令牌值（支持别名引用：`"{color.brand.primary}"`）
- `$type`：令牌类型（可继承自父组）
- `$description`：描述

**核心类型** [^8^][^88^]：
- 基础类型：color, dimension, fontFamily, fontWeight, duration, cubicBezier, number, string
- 复合类型：border, gradient, shadow, strokeStyle, transition, typography

**Resolver模块**（2025.10新增）：支持多上下文令牌解析（主题、平台、尺寸），对跨平台设计系统至关重要 [^90^][^97^]。

**采用者** [^92^][^94^]：Adobe, Amazon, Google, Baidu, Sony, Microsoft, Meta, Sketch, Salesforce, Shopify, Figma, Framer, Cisco, Disney, Pinterest, Tokens Studio, Penpot, Supernova, zeroheight等。

### 4.2 Token三层架构

根据行业最佳实践，Design Tokens应采用三层架构 [^47^][^86^]：

#### Layer 1: Primitive Tokens（原始令牌）

原始值，无语义含义——完整调色板、间距尺度、字号尺度：

```css
:root {
  /* 颜色原始值 */
  --purple-100: #ede9ff;
  --purple-400: #7c6fff;
  --purple-700: #4d3fc0;

  /* 间距尺度 */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
}
```

#### Layer 2: Semantic Tokens（语义令牌）

引用原始值并携带语义意图——组件实际使用的令牌：

```css
:root {
  --color-bg: var(--gray-50);
  --color-surface: var(--gray-0);
  --color-text: var(--gray-900);
  --color-text-muted: var(--gray-500);
  --color-accent: var(--purple-400);
  --color-border: var(--gray-200);
}
```

#### Layer 3: Component Tokens（组件令牌）

特定组件级别的令牌：

```css
:root {
  --card-background: var(--color-surface);
  --card-foreground: var(--color-text);
  --button-primary-bg: var(--color-accent);
  --button-primary-text: var(--color-surface);
}
```

### 4.3 Figma集成与工具生态

#### Tokens Studio for Figma

Tokens Studio是最成熟的Figma到代码桥接工具 [^48^][^49^]：
- 300K+ Figma插件用户 [^48^]
- 23+令牌类型支持
- GitHub/GitLab集成，CI/CD自动化
- 导出到CSS、JSON、CSS-in-JS、iOS、Android等10+格式
- W3C DTCG规范兼容 [^49^]
- 2025年4月发布Framer集成 [^49^]

#### Figma Variables

Figma原生Variables功能于2023年底GA，支持DTCG格式 [^8^]：
- 多模式支持（Light/Dark、Mobile/Desktop）
- 2025年11月Extended Collections功能
- 2025年10月Code Connect UI集成 [^49^]

#### Style Dictionary（Amazon）

开源标准工具，v4.0（2024）增加了DTCG支持 [^8^]：
- 将令牌JSON转换为CSS / iOS / Android / Web格式
- CI集成，自动化转换

#### 完整工作流 [^8^]

```
Figma Variables / Tokens Studio
         ↓ push
    GitHub (tokens/*.json)
         ↓ CI
    Style Dictionary
         ↓ build
[web.css, ios.swift, android.xml]
         ↓ publish
    NPM · CocoaPods · Maven
```

### 4.4 团队规模 Adoption Strategy [^8^]

| 团队规模 | 推荐方案 |
|---------|---------|
| 1-3人（初创）| shadcn/ui + Radix + Tailwind，令牌直接放Tailwind配置 |
| 10-30人（A-B轮）| 独立组件库，DTCG token JSON，Storybook |
| 50-200人（C轮+）| 自动化令牌同步管道，2-5人设计系统团队 |
| 200-1500人（企业）| 5-20人平台团队，多平台（Web+iOS+Android） |

---

## 5. Tailwind CSS v4革命性升级

### 5.1 Oxide引擎：性能飞跃

Tailwind CSS v4于2025年1月发布，是框架历史上最大的重写 [^59^][^62^]：

**性能数据** [^27^][^59^][^62^]：

| 指标 | v3 | v4 | 提升 |
|-----|-----|-----|------|
| 完整构建 | 378-900ms | 100-120ms | **5-10x** |
| 增量构建 | 40-44ms | <5ms | **100x** |
| 开发HMR | 良好 | 近乎即时 | 显著提升 |

Oxide引擎使用Rust + esbuild/Lightning CSS替代了原有的PostCSS管道 [^59^][^60^]。

### 5.2 CSS-First配置

v4最大的变化是移除了`tailwind.config.js`，配置直接在CSS文件中通过`@theme`指令完成 [^60^][^61^][^66^]：

**v3方式（旧）**：
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: { brand: '#6366f1' }
    }
  }
}
```

**v4方式（新）** [^60^]：
```css
@import "tailwindcss";

@theme {
  --color-brand: #6366f1;
  --font-display: "Inter Variable", sans-serif;
  --radius-card: 12px;
  --spacing-18: 4.5rem;
}
```

每个`@theme`变量同时变成CSS自定义属性和Tailwind utility类 [^60^]。

### 5.3 其他关键新特性

#### Container Queries（原生支持）[^59^][^60^]

v4将container queries从插件移入核心：
```html
<div class="@container">
  <div class="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3">
    <!-- 根据父容器宽度响应，非viewport -->
  </div>
</div>
```

#### OKLCH色彩空间 [^59^][^103^]

v4默认使用OKLCH色彩空间：
- 感知均匀性：相同lightness值在不同hue下视觉亮度一致
- 支持Display P3广色域
- 更好的可访问性对比度预测

```css
@theme {
  --color-brand-500: oklch(63% 0.2 40);
}
```

#### @starting-style & @property [^59^]

原生支持CSS入场动画：
```html
<div class="starting:opacity-0 starting:translate-y-4 transition-all duration-500">
  入场动画
</div>
```

#### 零配置内容检测 [^33^]

v4自动检测项目中的模板文件，无需手动配置`content`数组。

### 5.4 shadcn/ui与Tailwind v4的集成

shadcn/ui在v4中完全拥抱了Tailwind的新模式 [^82^][^83^][^86^]：

**Token架构** [^86^][^87^]：
```
Component: --card, --card-foreground, --button-*
    ↑
Semantic: --primary, --secondary, --accent, --muted
    ↑
Primitive: oklch(55% 0.20 260), oklch(98% 0.01 260)
```

**主题定义** [^82^]：
```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
}
```

---

## 6. 主题系统与深色模式

### 6.1 CSS Custom Properties主题切换

CSS Custom Properties（CSS变量）是现代主题系统的基础技术 [^47^][^58^]。

**基本模式** [^58^]：
```css
/* Step 1: 定义变量 */
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
}

/* Step 2: 深色主题 */
html[data-theme="dark"] {
  --bg-color: #1e1e1e;
  --text-color: #e0e0e0;
}

/* Step 3: 使用变量 */
body {
  background-color: var(--bg-color);
  color: var(--text-color);
}
```

**JavaScript切换** [^58^]：
```javascript
const themeToggle = document.querySelector('#theme-toggle');
themeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});
```

### 6.2 系统偏好感知

使用`prefers-color-scheme`媒体查询 [^58^][^70^]：
```css
@media (prefers-color-scheme: dark) {
  html:not([data-theme]) {
    --bg-color: #1e1e1e;
    --text-color: #e0e0e0;
  }
}
```

最佳实践：
1. 默认使用系统偏好
2. 提供手动切换选项
3. 将用户选择保存到localStorage [^58^]

### 6.3 多主题/品牌支持

shadcn/ui支持多品牌设置 [^83^]：
- 每个品牌定义自己的令牌值
- 组件保持不变
- 切换品牌不需要重建UI逻辑
- 适合白标产品、客户特定品牌

**关键实践**：保持令牌名称相同，只改变值 [^83^]。

### 6.4 可访问性要求

2025年可访问性是不可妥协的要求 [^70^][^81^]：
- 键盘可访问：切换按钮应可通过Enter/Space激活
- ARIA属性：使用`aria-pressed`指示当前主题状态
- 对比度：所有主题需满足WCAG 2.1 AA最低对比度要求
- `color-scheme`属性：提示浏览器支持的主题，确保滚动条、表单控件正确渲染 [^70^]

### 6.5 各组件库主题方案对比

| 组件库 | 主题方案 | 深色模式 | 多主题 |
|-------|---------|---------|-------|
| shadcn/ui | CSS变量 + Tailwind | `.dark`类切换 | 通过Token覆盖 |
| MUI | ThemeProvider (Emotion) | 内置 | 通过ThemeProvider |
| Chakra UI v3 | Panda CSS tokens | 内置 | Token模式切换 |
| Mantine | CSS变量 | 内置 | 通过MantineProvider |
| daisyUI | CSS类 | `data-theme`属性 | 30+内置主题 |

---

## 7. CSS Custom Properties变量系统

### 7.1 作为设计令牌的运行时表现

CSS自定义属性是现代设计令牌的理想运行时表现形式 [^47^]。推荐的两层结构：

**Primitive层**：
```css
:root {
  --purple-100: #ede9ff;
  --purple-400: #7c6fff;
  --purple-700: #4d3fc0;
  --space-1: 4px;
  --space-2: 8px;
}
```

**Semantic层**：
```css
:root {
  --color-bg: var(--gray-50);
  --color-surface: var(--gray-0);
  --color-text: var(--gray-900);
  --color-accent: var(--purple-400);
}

/* 主题覆盖只改变语义令牌 */
:root.dark {
  --color-bg: var(--gray-950);
  --color-surface: var(--gray-900);
  --color-text: var(--gray-50);
}
```

### 7.2 回退值

`var()`函数支持第二参数作为回退值 [^47^]：
```css
.component {
  color: var(--brand-color, #7c6fff);
  color: var(--primary, var(--secondary, red)); /* 嵌套回退 */
}
```

### 7.3 Open Props：基于CSS变量的设计令牌库

Open Props是Adam Argyle创建的开源CSS变量库，完全基于CSS自定义属性 [^127^][^131^][^140^]。

**核心特点** [^127^][^128^]：
- 仅提供设计令牌（颜色、排版、阴影、间距、动画），不提供组件
- 框架无关：可与任何前端框架或Tailwind配合使用
- 支持子集导入（如只导入按钮令牌）
- 零JavaScript，纯CSS属性
- 内置暗/亮模式支持
- CDN就绪

**使用方式** [^140^]：
```css
@import 'open-props/style';
@import 'open-props/normalize';
@import 'open-props/buttons';
```

### 7.4 浏览器支持

所有主流浏览器已全面支持CSS Custom Properties [^47^][^103^]：
- Chrome 111+
- Firefox 113+
- Safari 15.4+
- Edge 111+

---

## 8. 2025年趋势判断与推荐

### 8.1 样式方案趋势

1. **Tailwind继续统治Utility-first领域** [^23^][^101^]
   - 600万+周下载量（v4）
   - Oxide引擎解决最后性能瓶颈
   - CSS-first配置消除JS/CSS心智模型分裂

2. **零运行时CSS-in-JS成为大型应用标准** [^23^][^105^]
   - Panda CSS、Vanilla Extract、Linaria、StyleX
   - RSC兼容性驱动采用
   - 类型安全是核心差异化优势

3. **运行时CSS-in-JS退出主流** [^13^][^100^]
   - styled-components进入维护模式
   - Emotion仅因MUI依赖而存活
   - 新项目不再推荐

4. **原生CSS特性减少对重型库的需求** [^23^]
   - CSS嵌套（nesting）
   - `:has()`选择器
   - Container Queries
   - 2025年初全面支持

### 8.2 Design Tokens趋势

1. **W3C DTCG标准成为事实标准** [^92^][^94^]
   - 10+设计工具已支持
   - 消除供应商锁定
   - 真正的跨工具互操作性

2. **Figma Variables + Tokens Studio主导设计工作流** [^48^][^49^]
   - 双向设计-代码同步
   - CI/CD自动化管道

3. **OKLCH色彩空间成为新默认** [^59^][^103^]
   - 感知均匀性
   - Display P3广色域支持
   - Tailwind v4默认采用

### 8.3 推荐方案总结

#### 新项目选择指南

| 场景 | 首选 | 备选 |
|-----|------|------|
| 快速原型/MVP | Tailwind CSS + shadcn/ui | UnoCSS |
| 组件库/设计系统 | Panda CSS | StyleX |
| 大型TypeScript应用 | Vanilla Extract | Linaria |
| 从styled-components迁移 | Linaria | Vanilla Extract |
| 需要原子CSS | Tailwind CSS | StyleX |
| 需要嵌套选择器 + RSC | Pigment CSS（未来） | Linaria |

#### 主题系统推荐架构

```
┌─────────────────────────────────────────────┐
│           Design Layer (Figma)              │
│     Figma Variables / Tokens Studio         │
└──────────────────┬──────────────────────────┘
                   │ push
┌──────────────────▼──────────────────────────┐
│           Token Repository                  │
│         tokens/*.json (DTCG format)         │
└──────────────────┬──────────────────────────┘
                   │ CI pipeline
┌──────────────────▼──────────────────────────┐
│          Style Dictionary                   │
│    Convert to CSS / JS / iOS / Android      │
└──────────────────┬──────────────────────────┘
                   │ publish
┌──────────────────▼──────────────────────────┐
│         Runtime (CSS Variables)             │
│    :root { --color-primary: ... }           │
│    .dark { --color-primary: ... }           │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│           Component Layer                   │
│    bg-primary, text-primary, etc.           │
└─────────────────────────────────────────────┘
```

---

## 9. 主要参与者与来源

### 9.1 核心项目与维护者

| 项目/组织 | 角色 | 关键人物 |
|----------|------|---------|
| Tailwind CSS | Utility-first CSS框架领导者 | Adam Wathan |
| W3C DTCG | Design Tokens标准制定 | Kaelig Deloumeau-Prigent等20+编辑 |
| Panda CSS | 零运行时CSS-in-JS | Chakra UI团队（Segun Adebayo） |
| Vanilla Extract | TypeScript-first零运行时CSS | SEEK团队 |
| Linaria | 零运行时CSS-in-JS | Callstack |
| StyleX | Meta原子CSS-in-JS | Meta/Facebook |
| Pigment CSS | MUI下一代样式引擎 | MUI团队 |
| Tokens Studio | Figma令牌管理工具 | Jan Six, Mike Kamminga |
| Style Dictionary | 令牌转换工具（Amazon） | Danny Banks |
| shadcn/ui | 开源组件架构 | shadcn |

### 9.2 关键企业采用者

- **Airbnb**：大规模迁移到Linaria [^137^]
- **Meta/Facebook**：内部使用StyleX驱动Facebook和Instagram [^85^]
- **MUI**：月下载量330万+，正在迁移到Pigment CSS [^46^]
- **Tesla**：采用Open Props验证设计令牌方案 [^140^]
- **TomTom、Babbel**：Tokens Studio企业用户 [^48^]

---

## 10. 争议与冲突观点

### 10.1 Tailwind的"HTML混乱"争议

Tailwind的utility-first方法引发了关于可读性的持续争论 [^101^]：
- **支持者**：开发速度快，无需在CSS文件间切换，设计系统一致性
- **反对者**：HTML class字符串过长，可读性差，违背关注点分离原则

### 10.2 Pigment CSS的开发延迟

MUI的Pigment CSS自2024年5月宣布以来，v1发布持续延迟 [^141^]：
- 社区对独立开发新样式方案而非采用StyleX/Linaria存在质疑
- MUI v7仍使用Emotion，Pigment CSS未成为默认
- 与Base UI的关系不明确 [^141^]

### 10.3 CSS-in-JS是否真的已死

尽管零运行时方案崛起，运行时CSS-in-JS仍有合理场景 [^84^]：
- 纯客户端渲染应用（无SSR/RSC）
- 需要真正的运行时主题化（样式依赖用户数据）
- React Native开发
- 大规模迁移现有代码库的成本 rarely justify性能收益

### 10.4 Design Tokens的标准化 vs 工具锁定

W3C DTCG标准虽然消除了格式锁定，但工具选择仍存在实际约束 [^49^][^52^]：
- Tokens Studio深度绑定Figma生态
- 企业级工具（Knapsack、Supernova）价格昂贵
- 小团队可能觉得标准化带来的复杂度不值得

---

## 11. 推荐深入调研方向

1. **Pigment CSS正式发布后的评估**：关注MUI v8的迁移路径和性能数据
2. **StyleX社区增长**：Meta是否会持续投入开源生态
3. **CSS Houdini与自定义属性**：未来浏览器级别的变量支持
4. **Tailwind CSS v5展望**：原子CSS与utility-first的进一步融合
5. **跨平台Design Tokens**：iOS/Android/Web统一令牌管理的实践
6. **AI辅助主题生成**：基于AI的主题配色和对比度优化
7. **Panda CSS生态系统成熟**：第三方插件和社区资源增长
8. **CSS Container Queries对组件设计的影响**：响应式组件的新范式
9. **OKLCH色彩空间在实际项目中的采用数据**：设计师和开发者的接受度
10. **React Compiler对CSS方案的影响**：编译时优化是否改变样式方案选择

---

## 参考来源索引

- [^8^] youngju.dev - Design Systems and Tokens 2025 Complete Guide
- [^13^] robinwieruch.de - React Libraries for 2026
- [^23^] ome9a.com - The State of CSS-in-JS in 2025
- [^24^] GitHub - callstack/linaria
- [^27^] matthewswong.com - Tailwind CSS vs CSS Modules 2025
- [^28^] developerway.com - Tailwind vs Linaria Performance Investigation
- [^33^] tailkits.com - Tailwind CSS v4 Key Updates
- [^46^] cssauthor.com - 25 Best React UI Component Libraries 2025
- [^47^] csstools.io - CSS Variables Guide
- [^48^] tokens.studio - Tokens Studio官网
- [^49^] cssauthor.com - Design Token Management Tools 2025
- [^58^] specificit.com - CSS Variables for Theme Switching 2026
- [^59^] keydal.tr - Tailwind CSS v4 Oxide Engine
- [^60^] pristren.com - Tailwind CSS v4 CSS-First Configuration
- [^62^] noqta.tn - Tailwind CSS v4 Complete Guide 2026
- [^63^] CSDN - vanilla-extract主题系统API完整教程
- [^67^] cnblogs.com - 2025年底TailwindCSS组件库横评
- [^68^] CSDN - vanilla-extract改变CSS开发模式
- [^82^] fullstacksveltekit.com - shadcn-svelte theming
- [^83^] shadcnspace.com - Ultimate shadcn/ui Handbook
- [^84^] openreplay.com - State of CSS-in-JS 2026
- [^85^] stylexjs.com - Introducing StyleX
- [^86^] GitHub - shadcn-theming SKILL.md
- [^87^] GitHub - shadcn-theming theming-guide.md
- [^88^] raunaqgupta.com - DTCG design tokens examples
- [^90^] GitHub - Adobe DTCG Format RFC
- [^91^] misha.wtf - DTCG Design Tokens in Figma
- [^92^] designtokens.org - Design Tokens Community Group
- [^94^] w3.org - Design Tokens specification first stable version
- [^97^] styleframe.dev - W3C DTCG parser/validator
- [^99^] designtokens.org - Design Tokens Format Module 2025.10
- [^100^] bhojpress.com - Styled components in maintenance mode
- [^101^] dyrnq.com - Panoramic View of Front-End Frameworks 2025-2026
- [^102^] openreplay.com/zh - 2026年CSS-in-JS现状
- [^103^] orankit.com - CSS color gamut OKLCH compared
- [^104^] youngju.dev - Modern CSS Mastery 2025
- [^105^] ome9a.com - CSS-in-JS战争结束
- [^110^] techrecursos.com - Frameworks CSS Modernos 2025
- [^122^] tms-outsource.com - React UI Component Libraries
- [^123^] research.modelcitizendeveloper.com - CSS Frameworks misconceptions
- [^124^] libhunt.com - vanilla-extract vs linaria
- [^127^] swhabitation.com - Open Props vs Chota CSS
- [^131^] handoff.design - Introduction to Open Props
- [^135^] markaicode.com - Vanilla Extract vs Linaria Performance
- [^136^] builder.io - Linaria Overview 2025
- [^137^] airbnb.tech - Airbnb's Trip to Linaria
- [^139^] tsepakme.com - Styled-components maintenance mode analysis
- [^140^] mannybecerra.com - Supercharged CSS Variables (Open Props)
- [^141^] GitHub - MUI Pigment CSS discussion
- [^142^] mui.com - Introducing Pigment CSS

---

*本报告基于2025年7月的公开信息整理，技术生态快速变化，建议持续关注各项目的官方更新。*
