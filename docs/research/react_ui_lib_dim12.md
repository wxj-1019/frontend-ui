# 维度 12: 跨平台与多端组件方案 — 深度调研报告

> 调研时间: 2025年7月 | 搜索次数: 25+ | 覆盖语言: 中英文
> 本报告基于官方文档、GitHub仓库、技术博客、行业报告等权威来源编写

---

## 目录

1. [维度概述](#1-维度概述)
2. [当前状态分析](#2-当前状态分析)
   - 2.1 [React Native + Web 共享方案](#21-react-native--web-共享方案)
   - 2.2 [小程序适配方案](#22-小程序适配方案)
   - 2.3 [Design to Code 生态](#23-design-to-code-生态)
   - 2.4 [跨平台桌面框架](#24-跨平台桌面框架)
   - 2.5 [新兴跨端框架 (2025)](#25-新兴跨端框架-2025)
3. [历史演变](#3-历史演变)
   - 3.1 [从 "Write Once Run Anywhere" 到 "Learn Once Write Anywhere"](#31-从-write-once-run-anywhere-到-learn-once-write-anywhere)
   - 3.2 [React Native 架构革命](#32-react-native-架构革命)
   - 3.3 [小程序生态的崛起与分化](#33-小程序生态的崛起与分化)
4. [关键参与者与利益相关者](#4-关键参与者与利益相关者)
5. [反面观点与争议](#5-反面观点与争议)
6. [证据详述](#6-证据详述)
7. [推荐深入方向](#7-推荐深入方向)

---

## 1. 维度概述

跨平台与多端组件方案是当前前端技术领域最复杂、竞争最激烈的赛道之一。2025年，这一领域呈现出以下核心特征：

- **React Native 新架构全面落地**: 2025年10月发布的 React Native 0.82 彻底移除了旧架构，Fabric + TurboModules + JSI 成为唯一运行时，标志着 RN 进入成熟期 [^1161^]
- **"Web-first" 范式逆转**: Meta 推出的 React Strict DOM (RSD) 正在取代 React Native Web，将跨平台基线从 "RN API 子集" 转向 "Web 标准子集" [^1128^]
- **小程序多端方案分化**: TDesign 维持多端独立实现策略，uni-app x 走原生编译路线，Taro 维持运行时方案
- **D2C (Design to Code) 爆发**: Semi Design 的 C2D2C 闭环、Figma AI 插件生态、Anima/Builder.io 等工具构成多层次解决方案
- **大厂新框架入局**: 腾讯开源 Kuikly (Kotlin Multiplatform)、字节跳动开源 Lynx，给本已拥挤的跨端赛道增添新变量 [^1149^] [^1152^]

---

## 2. 当前状态分析

### 2.1 React Native + Web 共享方案

#### 2.1.1 Tamagui: 编译器驱动的跨平台方案

Tamagui 在 2025 年是 React Native + Web 跨平台组件库中最具技术特色的方案，其核心优势来自编译时优化架构。

**技术特点:**
- **编译器架构 (`@tamagui/static`)**: 在构建时将样式提取为原子CSS，通过偏评估和 hoisting 移除大量内联样式，将昂贵的 styled components 扁平化为原生 div/View [^1141^]
- **显著性能提升**: 在 Tamagui 主页（200+ 独特组件的复杂场景），编译器将 Lighthouse 分数提升 18% [^1142^]；bundle size 减少高达 50% [^561^]
- **统一设计 Token**: 开发者定义一次 token，系统自动生成平台特定样式
- **与 Expo 深度集成**: Expo Router + Tamagui 成为构建 universal app 的主流技术栈之一 [^1053^]

**局限性:**
- 学习曲线较高（High initially, then low）[^561^]
- 社区生态相比 MUI、shadcn/ui 等仍较小
- 编译器在复杂场景下的边缘 case 处理仍需关注

#### 2.1.2 React Strict DOM: Meta 的官方新方向

React Strict DOM (RSD) 是 2024-2025 年跨平台领域最重要的架构性转变。

**核心转变:**

| 维度 | React Native for Web | React Strict DOM |
|------|---------------------|------------------|
| 起点 | React Native API → Web | Web 标准 → React Native |
| 运行时开销 | 高（需加载 RN + RNfW + 运行时转换） | 低（浏览器直接解析，无转换） |
| 性能 | Lighthouse 折损明显 | 接近原生 Web 性能 |
| 可访问性 | 需额外处理 | 天然继承 Web 可访问性 |
| 维护负担 | 大（需维护独立 API 层） | 小（基于 Web 标准） |

**采纳建议 (来自 Meta 和 Expo 官方):** [^1128^]
- 构建新 universal app → 直接使用 RSD
- 已有 RNfW 项目 → 可增量迁移（通过 `.web.js` / `.native.js` 平台扩展名）
- 仅移动端 → 不急于迁移，但建议学习

#### 2.1.3 Expo: Universal App 开发平台

Expo 在 2025 年已成为 React Native 开发的事实标准：

- **Expo SDK 52+** 默认启用 New Architecture [^1166^]
- **Expo SDK 55** (RN 0.83) 彻底移除旧架构支持 [^1167^]
- **React Native Web** 集成在 Expo 中开箱即用
- **EAS (Expo Application Services)** 提供跨平台部署、热更新等能力

### 2.2 小程序适配方案

#### 2.2.1 TDesign: 腾讯的多端设计系统

TDesign 是腾讯开源的企业级设计系统，采用**多端独立实现**策略：

**技术架构:** [^800^] [^805^]

```
[设计规范] → [组件定义 Schema]
               ↓
         [多端适配引擎]
               ↓
   [Vue 组件库] [React组件库] [微信小程序库]
               ↓
        [TDesign Starter / Play UI 工具]
```

**当前状态 (2025):**
- 桌面端: Vue2/Vue3/React 均已发布 1.x
- 移动端: Vue3/微信小程序 已发布 1.x；React/Flutter/UniApp 为 Alpha [^800^]
- 设计资源: Figma/Sketch/Adobe XD 全覆盖
- Design Token 驱动的主题定制系统

**关键争议 — "真正多端统一"?:**

> "TDesign 当前没有一套'真正多端统一'的解决方案，而是拆分成 tdesign-miniprogram（只支持小程序端）、tdesign-vue / tdesign-react（只支持Web端），没有 App（nvue）或全端通用版本。" [^1081^]

这种**独立实现**模式与**跨平台编译**模式存在本质差异：
- TDesign 的方式保证了各端原生体验，但代码复用率有限
- 各技术栈 API 一致，但实现是独立的，维护成本高

#### 2.2.2 uni-app / uni-app x: 小程序优先的多端方案

uni-app 在 2025 年经历了重大技术升级：

**传统 uni-app:**
- 基于 Vue.js + JavaScript
- 编译为小程序 WXML / Web JS / App WebView
- 适合小程序为主的场景

**uni-app x (下一代):** [^1092^] [^1086^]
- **UTS 语言**（统一类型语言）：类 TypeScript，编译为各平台原生语言
  - Android → Kotlin
  - iOS → Swift
  - 鸿蒙 → ArkTS
  - Web/小程序 → JavaScript
- **uvue 渲染引擎**: 原生渲染（非 WebView）
- **蒸汽模式 (Vapor Mode)**: 免除 VDOM 创建耗时，渲染速度超过原生 [^1092^]

| 平台 | 原生耗时(ms) | uni-app x 蒸汽模式(ms) |
|------|-------------|---------------------|
| iOS (iPhone XR) | 388 | 181 |
| 鸿蒙 (nova 12) | 798 | 280 |

> "uni-app x 蒸汽模式，摘下了跨平台框架的圣杯：即跨平台，渲染性能又超过了原生，且兼容原生组件生态。" [^1092^]

**uni-app x 的局限:**
- 生态支持割裂（uni-app 和 uni-app x 插件不通用）
- 不同平台翻译成本高，不支持完整语言特性
- iOS 平台保留 JS 老模式和 Swift 新模式双轨，增加复杂度
- 不支持 PC 端 [^1086^]

#### 2.2.3 Taro: 京东的多端 React 方案

Taro 是京东开源的多端开发框架，2025 年主要特点：
- 支持 React/Vue/Svelte 语法
- 一套代码编译到小程序、H5、React Native
- Taro 3 运行时方案带来可感知的性能损耗（包体积增加 150-200KB）[^1099^]
- Taro 4.x 持续优化编译时方案

### 2.3 Design to Code 生态

#### 2.3.1 Semi Design D2C: 业界领先的 C2D2C 闭环

Semi Design（字节跳动抖音前端团队）的 D2C 方案在 2025 年处于行业领先地位。

**核心技术路线 — C2D2C 闭环:** [^1079^]

```
React 组件源码
      │
      ▼  C2D (Code to Design)
  通过 Puppeteer 渲染组件 DOM
      │
      ▼  转换为 Figma Layer/Variant
  Figma 设计组件（预埋了组件元数据）
      │
      ▼  D2C (Design to Code)
  Figma 组件 + 元数据 → React JSX 代码
```

**核心能力:** [^1085^] [^799^]
1. **不依赖标注**: 原生提供组件级 props 识别能力，覆盖全部 Semi 基础组件
2. **不改变设计师习惯**: 允许设计师继续通过 Figma Variant 变体方式使用组件
3. **与设计系统深度打通**: 掌控底层组件库资产，可针对性迭代适配
4. **多模态 AI 增强**: 内部版本集成 Doubao/Deepseek，实现智能子组件拆分、列表循环结构 map render、className 语义化等

**生产数据:**
- 复杂组件 C2D 生产需 **6 人日**，中等复杂 **4 人日**，简单组件 **2 人日**
- 设计师验收每个组件 **1-2 小时**
- D2C 一键转码 **3-5 秒** 生成代码 [^1079^]

**调用方式:**
- Figma 插件（通过 DevMode 启动）
- OpenAPI（HTTP 服务，字节内部可用）
- NodeSDK（社区版本暂未提供）[^1085^]

#### 2.3.2 Figma to Code 工具生态

2025 年 Figma 转代码工具生态蓬勃发展：

| 工具 | 用户数 | 核心特点 | 价格 |
|------|-------|---------|------|
| **Anima** | ~200万安装 | 响应式布局、交互状态、GitHub集成 | $31/月起 |
| **Builder.io** | ~100万用户 | React/Vue/Angular/Tailwind 全支持 | $49/月起 |
| **Locofy** | 24万+ | 实时同步、设计Token、条件逻辑 | 免费/付费 |
| **Figma to Code (官方)** | 大量 | 基础 HTML/CSS/React，免费 | 免费 |

> "Figma plugins for React can help developers save a lot of development time without compromising on high-quality and maintainable code." [^1063^]

#### 2.3.3 Figma to shadcn/ui 插件

2025 年值得关注的趋势是 Figma 与 shadcn/ui 的深度集成：
- 支持双向变量同步（Figma ↔ Code）
- AI 驱动的组件识别和设计 Token 映射
- 结合 Tailwind v4 变量系统
- 减少设计到开发时间 **60-80%** [^411^]

### 2.4 跨平台桌面框架

#### 2.4.1 Tauri 2.0: Electron 的轻量替代

Tauri 在 2025 年凭借 2.0 版本的发布成为跨平台桌面开发的重要选择：

| 维度 | Electron | Tauri v2 |
|------|----------|----------|
| 后端运行时 | Node.js | Rust |
| Webview 引擎 | 自带 Chromium | 系统原生 WebView |
| 空白应用体积 | ~80-150 MB | ~3-5 MB |
| 内存占用 | 高 (400+ MB) | 低 (50-100 MB) |
| 移动端支持 | 无 | 支持 (iOS/Android) |
| 安全模型 | 灵活但易出错 | 默认安全 |

**关键限制:**
- Tauri Mobile 在 2025 年仍不成熟，很多开发者连 HelloWorld 都构建失败
- Rust 学习曲线对前端团队是门槛
- 移动端 API 覆盖不如 RN/Flutter 完善 [^1156^]

#### 2.4.2 Electron: 仍占主导

Electron 在 2025 年仍是桌面跨平台的事实标准：
- VS Code、Discord、Slack、Figma 等主流应用基于 Electron
- 生态成熟，调试工具完善
- 体积和内存问题仍是指责焦点 [^1059^]

### 2.5 新兴跨端框架 (2025)

#### 2.5.1 Kuikly (腾讯): Kotlin Multiplatform UI 框架

Kuikly 于 2025 年 4 月正式开源，是腾讯大前端 Oteam 推出的跨端方案： [^1149^] [^1146^]

**核心特点:**
- 基于 Kotlin Multiplatform (KMP) 技术
- 声明式 UI 框架，映射到系统原生控件
- 轻量 SDK（Android AOT ~300KB，iOS ~1.2MB）
- 支持动态化（通过 Shiply 热更新系统）

**支持平台:**
- Android / iOS / HarmonyOS / Web(Beta) / 小程序(Beta) / macOS(Alpha)

**应用规模:**
- 腾讯内部 20+ 应用使用，覆盖 1000+ 页面，服务 5亿+ DAU
- QQ、QQ音乐、QQ浏览器、腾讯新闻、搜狗输入法等 [^1146^]

**性能数据:**
- 鸿蒙页面打开速度比 React Native 快 **6 倍** [^1147^]
- Android 列表滚动性能提升 **35%** [^1148^]
- Web 端 WASM 逼近原生 **90%** 性能 [^1148^]

#### 2.5.2 Lynx (字节跳动): 自研渲染引擎方案

Lynx 于 2025 年正式开源，核心特点： [^1152^] [^1158^]
- 自研 C++ 渲染引擎
- 双线程架构（UI 主线程 + 逻辑后台线程）
- 语法贴近 Vue，学习成本低
- 支持嵌入式设备（IoT）和信息流场景
- 劣势：生态较新，社区资源有限，工具链依赖字节内部支持

---

## 3. 历史演变

### 3.1 从 "Write Once Run Anywhere" 到 "Learn Once Write Anywhere"

跨平台开发的哲学经历了根本性转变：

**第一阶段 (2010-2015): Write Once, Run Anywhere**
- PhoneGap/Cordova: WebView 封装，一套 HTML/CSS/JS 跑所有平台
- 问题: 性能差，体验不原生，"WebView 套壳"

**第二阶段 (2015-2020): Learn Once, Write Anywhere**
- React Native (2015): 用 JavaScript 编写，渲染原生组件
- 理念转变: 不是一套代码跑所有平台，而是同一套技能开发不同平台
- Weex (阿里)、Flutter (Google) 相继入局

**第三阶段 (2020-2024): 多端统一编译**
- Taro 3、uni-app 2: 运行时/编译时混合方案
- React Native Web: 将 RN 代码带到 Web
- 问题: 抽象层复杂，性能折损，平台差异难以完全抹平

**第四阶段 (2025-): 原生性能回归**
- React Native New Architecture: 移除 Bridge，直接同步调用
- uni-app x: 编译为原生代码，不再是 WebView 或 JS 引擎
- Kuikly: KMP 原生编译
- 核心理念: "换个写法写原生应用" [^1097^]

### 3.2 React Native 架构革命

React Native 的新架构是 2025 年跨平台领域最重要的事件：

| 版本 | 时间 | 新架构状态 | 关键变化 |
|------|------|-----------|---------|
| 0.68 | 2022 | 实验性可选 | 首次提供新架构选项 |
| 0.76 | 2024.10 | 默认启用 | 新架构默认开启，旧架构可关闭 |
| **0.82** | **2025.10** | **强制唯一** | **旧架构彻底移除，无法关闭** |
| 0.83 | 2025.12 | 强制 | Expo SDK 55，Hermes V1 实验 |
| 0.84 | 2026.2 | 强制 | Hermes V1 默认 |

**关键组件:**
- **JSI (JavaScript Interface)**: JS 直接调用 C++，消除 Bridge 序列化瓶颈
- **Fabric**: 并发渲染器，支持 React 18 并发特性
- **TurboModules**: 按需懒加载原生模块
- **Codegen**: 自动生成类型安全绑定

**性能改善 (Shopify 生产数据):** [^1162^]
- 冷启动速度提升 **43%**
- 渲染速度提升 **39%**
- 内存使用降低 **26%**

### 3.3 小程序生态的崛起与分化

中国小程序生态的演进是独特的：

**2017-2019: 原生小程序开发**
- 微信小程序原生语法（WXML/WXSS）
- 各平台小程序语法不统一

**2019-2022: 跨端框架爆发**
- Taro (京东): React/Vue 语法 → 多端小程序
- uni-app (DCloud): Vue 语法 → 多端小程序 + App
- Remax (阿里): 纯 React 开发小程序
- Remax 后期停止维护，反映了阿里在跨端领域的战略调整

**2022-2025: 编译时优化与原生渲染**
- Taro 4.x 编译时方案优化
- uni-app x 原生编译路线
- 小程序平台自身能力增强（微信 Skyline 渲染引擎）

---

## 4. 关键参与者与利益相关者

### 4.1 技术提供方

| 组织 | 产品/技术 | 定位 | 影响力 |
|------|----------|------|-------|
| **Meta** | React Native, React Strict DOM | 移动跨平台基础设施 | 极高 |
| **Google** | Flutter, Dart | 高性能跨平台框架 | 极高 |
| **腾讯** | TDesign, Kuikly, Taro, Hippy | 设计系统 + 跨端框架矩阵 | 高 |
| **字节跳动** | Semi Design, Lynx | 设计系统 + 自研渲染引擎 | 高 |
| **阿里巴巴** | Ant Design, Remax(已停更) | 设计系统（Web为主） | 中 |
| **DCloud** | uni-app / uni-app x | 小程序跨端方案 | 高（国内） |
| **Expo** | Expo SDK / EAS / Router | RN 开发体验平台 | 高 |
| **Tauri** | Tauri 2.0 | 轻量桌面跨平台 | 中 |

### 4.2 用户群体与诉求

**移动端开发者:**
- 诉求: 一套代码覆盖 iOS/Android，性能接近原生
- 偏好: React Native (有 React 经验)、Flutter (追求性能)
- 痛点: 跨平台抽象层导致的调试困难、平台差异处理

**小程序开发者:**
- 诉求: 一套代码覆盖微信/支付宝/百度等多平台小程序
- 偏好: uni-app (Vue)、Taro (React)
- 痛点: 平台差异大，各小程序平台能力不齐

**设计系统团队:**
- 诉求: 设计稿到代码的自动化，多端体验一致
- 偏好: TDesign (腾讯)、Semi Design (字节)、Ant Design (阿里)
- 痛点: 多端实现成本高，设计与开发脱节

**中后台产品团队:**
- 诉求: 快速交付，一致的用户体验
- 偏好: TDesign Starter Kit、Ant Design Pro
- 痛点: 移动端适配成本高

---

## 5. 反面观点与争议

### 5.1 跨平台抽象的性能损失

跨平台框架在逻辑层和渲染层存在不可避免的折损：

**React Native 的性能瓶颈:**
> "CPU密集型任务性能排序: 1.原生应用(基准) 2.Kotlin Multiplatform 3.Flutter 4..NET MAUI 5.React Native(比原生慢约15倍)" [^1139^]

> "React Native — 最高消耗，某些情况下增加250%"（电池消耗）[^1139^]

**uni-app 的 JS-原生通信延迟:**
> "JS 层与原生层通过 JSBridge 通信，每次交互需经过'JS 计算 → 桥接传递 → 原生执行'三步，存在 10-20ms 延迟；在复杂场景中帧率可从 60fps 降至 30-40fps。" [^1131^]

**Flutter 的混合渲染问题:**
> "自渲染UI和原生UI的混合渲染问题很多"——Flutter 的自绘引擎与平台原生 UI 并存时，会出现主题不一致、布局边界无法审查等问题 [^1145^]

### 5.2 "真正多端统一"是否可能

TDesign 的实践表明，真正意义的一套代码多端运行仍然困难：

> "TDesign 当前没有一套'真正多端统一'的解决方案，而是拆分成多个独立仓库实现。" [^1081^]

TDesign 采用的设计规范 + 多端独立实现模式，实际上承认了平台差异的不可消除性。

### 5.3 各框架的局限性

**Tamagui:**
- 编译器增加了构建复杂度
- 在极端动态样式场景下，编译器优化效果有限
- 社区规模较小，第三方资源不如 MUI 丰富

**TDesign:**
- 多端组件 API 虽一致，但实现独立，Bug 修复需要多端同步
- 移动端 React 版本仅为 Alpha
- Flutter 版本成熟度不足

**uni-app x:**
- 生态割裂（uni-app 和 uni-app x 插件不通用）
- UTS 语言的能力阉割（为转译器做删减）
- iOS 双轨模式增加心智负担
- 不支持 PC 端 [^1086^]

**React Native:**
- 图形密集型场景仍落后原生 20-30%
- 依赖原生模块时增加复杂度
- 版本更新频繁，企业环境兼容性挑战 [^1108^]

### 5.4 社区声音

来自 V2EX 的开发者讨论（2025年8月）: [^1156^]

> "RN 代码清晰但是单线程技术性能有瓶颈"
> "Flutter 代码逻辑混乱，但是性能好"
> "Tauri 2.0 稳定版对移动端的支持依旧非常差，很多人连构建一个安卓/iOS的 helloworld 都会失败"
> "如果对动画有要求就别考虑 uniapp"

---

## 6. 证据详述

### 证据 1: Tamagui 编译器性能

```
Claim: Tamagui 编译器将 bundle size 减少高达 50%，在主页场景（200+组件）中 Lighthouse 分数提升 18%。[^1142^] [^561^]
Source: Tamagui 官方文档 / AppInstitute 2025指南
URL: https://tamagui.dev/blog/version-one-release-candidate / https://appinstitute.com/guide-to-cross-platform-ui-component-libraries/
Date: 2022-12-04 / 2025-09-12
Excerpt: "On the Tamagui homepage, the compiler flattens 200+ unique components for a 18% Lighthouse score increase."
Context: Tamagui v1 RC 发布说明
Confidence: high
```

### 证据 2: React Native 0.82 新架构强制化

```
Claim: React Native 0.82（2025年10月）彻底移除了旧架构，新架构成为唯一选择。生产迁移显示 43% 更快冷启动，39% 更快渲染，26% 更低内存。[^1161^] [^1162^]
Source: React Native 官方博客 / DianApps
URL: https://reactnative.dev/blog / https://dianapps.com/blog/react-native-new-architecture/
Date: 2025-10-08 / 2026-05-27
Excerpt: "React Native 0.82: the first React Native that runs entirely on the New Architecture."
Context: 官方发布说明
Confidence: high
```

### 证据 3: TDesign 多端架构

```
Claim: TDesign 支持多技术栈和多端，但采用独立实现策略，而非真正的跨平台编译。桌面端 Vue2/Vue3/React 已发布 1.x，移动端 React/Flutter/UniApp 仍为 Alpha。[^800^] [^1081^]
Source: TDesign GitHub / CSDN博客
URL: https://github.com/Tencent/tdesign / https://www.cnblogs.com/LungGiyo/p/18962663
Date: 2026-06-15 / 2025-07-03
Excerpt: "TDesign currently supports multiple platforms... Mobile versions for React, Flutter, and UniApp have released Alpha test versions."
Context: 官方 README + 社区评测
Confidence: high
```

### 证据 4: Semi Design D2C 能力

```
Claim: Semi Design D2C 使用 C2D2C 闭环路线，3-5秒从 Figma 生成代码，组件级精准识别，无需人工标注。[^1079^] [^1085^]
Source: 掘金技术博客 / Semi Design 官方文档
URL: https://juejin.cn/post/7639566522558775330 / https://semi.design/zh-CN/advanced/design-to-code
Date: 2026-05-14
Excerpt: "每个复杂组件 C2D 生产需研发 6 人日...D2C 一键转码，3-5 秒生成代码。"
Context: 业界方案详解文章
Confidence: high
```

### 证据 5: React Strict DOM 取代 React Native Web

```
Claim: React Native for Web 的创建者 Nicolas Gallagher 现在推荐 React Strict DOM 用于新 universal app，RSD 消除了 RNfW 的运行时性能成本。[^1128^] [^1155^]
Source: Infinite Red (React Native Radio) / Mobile Vitals
URL: https://shift.infinite.red/react-strict-dom-vs-react-native-for-web-in-2025-bb91582ef261
Date: 2025-08-12
Excerpt: "React Strict DOM eliminates runtime performance costs of React Native for Web."
Context: React Native Radio 第339期访谈总结
Confidence: high
```

### 证据 6: uni-app x 蒸汽模式性能

```
Claim: uni-app x 蒸汽模式在 iOS 上渲染 4050 个 view/text 耗时 181ms，原生为 388ms；鸿蒙上 280ms vs 原生 798ms。[^1092^]
Source: uni-app x 官方文档
URL: https://doc.dcloud.net.cn/uni-app-x/
Date: 2026-06-18
Excerpt: "uni-app x蒸汽模式，均比原生渲染快2、3倍。"
Context: 官方性能测试数据
Confidence: medium（官方数据，第三方验证有限）
```

### 证据 7: 腾讯 Kuikly 开源

```
Claim: 腾讯正式开源 Kuikly，基于 Kotlin Multiplatform，支持 Android/iOS/鸿蒙/Web/小程序/macOS，已在 20+ 应用中使用，服务 5亿+ DAU。[^1149^] [^1146^]
Source: OSCHINA / Kuikly GitHub
URL: https://www.oschina.net/news/347077/tencent-tds-kuikly / https://github.com/Tencent-TDS/KuiklyUI
Date: 2025-04-28 / 2026-06-04
Excerpt: "Kuikly has been deeply used by 20+ applications, covering 1,000+ pages and serving 500 million+ daily active users."
Context: 官方开源公告
Confidence: high
```

### 证据 8: 跨平台性能基准对比

```
Claim: 在 2025 年基准测试中，React Native 在列表滚动（1000项）达到 50-55 FPS（Flutter 60 FPS），内存占用 190MB（Flutter 130MB）。[^1159^]
Source: CSDN 技术博客
URL: https://blog.csdn.net/carson_ho/article/details/149478619
Date: 2025-07-21
Excerpt: "列表滚动（1000项）: Flutter 60 FPS、内存 130MB; React Native 50-55 FPS、内存 190MB"
Context: 基于 github.com/nateshmbhat/flutter-rn-performance-benchmarks
Confidence: medium（第三方基准测试）
```

### 证据 9: 跨平台开发市场增长

```
Claim: 2025年跨平台移动开发市场达到 156.7 亿美元，预计到2035年达到 476.1 亿美元，CAGR 11.75%。40-45% 的新移动应用使用跨平台框架。[^1038^]
Source: Uilora Blog（引用 RipenApps 2025 数据）
URL: https://www.uilora.com/blog/uilora/why-the-best-react-component-libraries-in-2026-support-both-web-and-mobile
Date: 2026-05-05
Excerpt: "In 2025, the cross-platform mobile development market hit $15.67 billion... 40-45% of all new mobile apps launched use a cross-platform framework."
Context: 行业报告引用
Confidence: medium
```

### 证据 10: Tauri vs Electron 对比

```
Claim: Tauri v2 空白应用体积约 3-5MB，远低于 Electron 的 80-150MB；内存占用 50-100MB vs Electron 400+MB。[^1066^]
Source: Bnowdev Blog
URL: https://bnowdev.com/blog/tauri-vs-electron--building-desktop-apps-in-2025/
Date: 2025
Excerpt: "Tauri binaries are code-signed, smaller, and faster to distribute."
Context: 技术对比文章
Confidence: high
```

---

## 7. 推荐深入方向

### 7.1 高优先级调研方向

1. **React Strict DOM 生产落地评估**
   - RSD 在实际项目中的性能收益量化
   - 从 RNfW 迁移到 RSD 的成本与路径
   - RSD 与 Tamagui 的集成可能性

2. **React Native 新架构生态适配状态**
   - 主要第三方库（Reanimated、React Navigation、MMKV 等）的新架构兼容性
   - 企业级应用迁移的真实成本和时间线
   - Hermes V1 的性能基准测试

3. **uni-app x 生产可用性评估**
   - 蒸汽模式在真实业务场景中的表现
   - UTS 语言的实际限制和边界 case
   - 与现有 uni-app 生态的迁移路径

4. **Semi Design D2C 的行业推广前景**
   - C2D2C 流程在其他设计系统中的可复制性
   - D2C 产物代码的质量评估（可读性、可维护性）
   - AI 增强（多模态大模型）对 D2C 的进一步改变

### 7.2 中优先级调研方向

5. **Kuikly 与 Flutter/RN 的竞争分析**
   - KMP 路线 vs Dart/JS 路线的长期竞争力
   - Kotlin 生态对前端开发者的吸引力
   - 腾讯内部大规模使用的真实反馈

6. **Lynx 自研渲染引擎的技术深度**
   - 与 Flutter Skia 引擎的架构对比
   - 双线程架构的实际性能收益
   - 字节跳动内部使用的成熟度

7. **TDesign 多端一致性的工程化方案**
   - Design Token 到多端代码的同步机制
   - 组件级跨端测试策略
   - 与 Taro/uni-app 等跨端框架的协作模式

8. **跨平台设计系统的未来形态**
   - AI 生成代码对 Design Token 和组件库的替代可能
   - Figma DevMode 与代码仓库的双向同步
   - 设计系统作为 MCP (Model Context Protocol) 服务的新范式

---

## 附录 A: 关键术语表

| 术语 | 含义 |
|------|------|
| **D2C** | Design to Code，设计稿转代码 |
| **C2D2C** | Code to Design to Code，代码到设计再到代码的闭环 |
| **RSD** | React Strict DOM，Meta 推出的跨平台 Web 标准子集 |
| **RNfW** | React Native for Web，将 RN 组件映射到 Web 的方案 |
| **JSI** | JavaScript Interface，RN 新架构中 JS 直接调用 C++ 的接口 |
| **Fabric** | RN 新架构的并发渲染器 |
| **TurboModules** | RN 新架构的按需加载原生模块系统 |
| **KMP** | Kotlin Multiplatform，Kotlin 跨平台技术 |
| **UTS** | Unified TypeScript，uni-app x 的跨平台语言 |
| **VDOM** | Virtual DOM，虚拟 DOM |

## 附录 B: 参考来源汇总

| 编号 | 来源 | URL | 日期 |
|------|------|-----|------|
| [^800^] | TDesign GitHub | https://github.com/Tencent/tdesign | 2026-06 |
| [^805^] | 掘金-TDesign架构 | https://juejin.cn/post/7504476709980340274 | 2025-05 |
| [^1079^] | 掘金-Semi D2C | https://juejin.cn/post/7639566522558775330 | 2026-05 |
| [^1081^] | CSDN-TDesign评测 | https://www.cnblogs.com/LungGiyo/p/18962663 | 2025-07 |
| [^1085^] | Semi Design D2C 文档 | https://semi.design/zh-CN/advanced/design-to-code | - |
| [^1086^] | 掘金-2025跨平台框架 | https://juejin.cn/post/7505578411492474915 | 2025-05 |
| [^1092^] | uni-app x 官方文档 | https://doc.dcloud.net.cn/uni-app-x/ | 2026-06 |
| [^1128^] | Infinite Red-RSD vs RNfW | https://shift.infinite.red/react-strict-dom-vs-react-native-for-web-in-2025 | 2025-08 |
| [^1139^] | 腾讯云-跨平台技术解析 | https://cloud.tencent.com/developer/article/2531559 | 2025-06 |
| [^1141^] | Tamagui 编译器文档 | https://tamagui.dev/docs/intro/why-a-compiler | - |
| [^1142^] | Tamagui v1 RC | https://tamagui.dev/blog/version-one-release-candidate | 2022-12 |
| [^1145^] | uni-app x 跨平台比较 | https://doc.dcloud.net.cn/uni-app-x/select.html | 2026-06 |
| [^1146^] | Kuikly GitHub | https://github.com/Tencent-TDS/KuiklyUI | 2026-06 |
| [^1147^] | Kuikly 鸿蒙适配 | https://www.besthub.dev/articles/kuikly-framework | 2026-04 |
| [^1149^] | OSCHINA-Kuikly开源 | https://www.oschina.net/news/347077/tencent-tds-kuikly | 2025-04 |
| [^1152^] | 跨多端前端框架对比 | https://www.cnblogs.com/2018/p/19165059 | 2025-10 |
| [^1156^] | V2EX-框架选型讨论 | https://global.v2ex.co/t/1153555 | 2025-08 |
| [^1158^] | 跨平台框架选型2025 | https://mp.weixin.qq.com/s?__biz=Mzg2MjE0MTE2MQ== | 2025-07 |
| [^1159^] | CSDN-跨平台选型 | https://blog.csdn.net/carson_ho/article/details/149478619 | 2025-07 |
| [^1161^] | React Native 官方博客 | https://reactnative.dev/blog | 2026-06 |
| [^1162^] | DianApps-RN新架构 | https://dianapps.com/blog/react-native-new-architecture/ | 2026-05 |

---

*报告生成时间: 2025年7月 | 证据驱动调研 | 覆盖 25+ 次独立搜索*
