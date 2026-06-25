# 超深度组件级 UI 分析报告

> **分析时间**: 2026-06-26  
> **分析范围**: 6 个顶尖设计网站（Awwwards、Wanted For Nothing、Rive、CodePen、Lusion、One Page Love）  
> **方法**: 浏览器自动化 + 精确 getComputedStyle 提取

---

## 目录

1. [Awwwards (awwwards.com)](#1-awwwards)
2. [Wanted For Nothing (wantedfornothing.com)](#2-wanted-for-nothing)
3. [Rive (rive.app)](#3-rive)
4. [CodePen Trending (codepen.io/trending)](#4-codepen-trending)
5. [Lusion (lusion.co)](#5-lusion)
6. [One Page Love (onepagelove.com)](#6-one-page-love)
7. [设计模式提取](#7-设计模式提取)
8. [交互模式提取](#8-交互模式提取)
9. [可直接复用 CSS 代码片段](#9-可直接复用-css-代码片段)

---

## 1. Awwwards

**分析 URL**: https://www.awwwards.com

### 1.1 组件拆解表

| 组件 | 选择器 | 背景色 | 文字色 | 字号 | 字重 | 内边距 | 圆角 | 阴影 | 边框 | 过渡 |
|------|--------|--------|--------|------|------|--------|------|------|------|------|
| 导航栏 | `header` | `rgba(0,0,0,0)` | - | - | - | `0px` | - | none | `0px none #222` | - |
| 搜索按钮 | `.search-form__button` | `transparent` | `#000` | `14px` | `400` | `0px` | `0px` | none | `0px` | `all` |
| 主CTA(深色) | `.button--small--rounded` | `#222` | `#fff` | `14px` | `500` | `0px 20px` | `8px` | none | `0px` | `color 0.3s, background 0.3s, border 0.3s` |
| 次CTA(描边) | `.button--small--outline--rounded` | `transparent` | `#222` | `14px` | `500` | `0px 20px` | `8px` | none | `0.8px solid #222` | `color 0.3s, background 0.3s, border 0.3s` |
| 白色按钮 | `.button--white--rounded` | `#fff` | `#222` | `14px` | `300` | `9.8px 19.6px` | `8px` | none | `0px` | `color 0.3s, background 0.3s, border 0.3s` |
| 搜索卡片项 | `.search-inspiration__item` | `transparent` | - | - | - | `0px 8px` | `8px` | none | `0px` | - |
| 导航项 | `.nav-header-main__item` | `transparent` | - | - | - | `0px 10px` | - | none | `0px` | - |

### 1.2 精确样式参数

**导航栏**:  
- 高度: `54px`  
- 背景: 完全透明 (`rgba(0, 0, 0, 0)`)  
- 定位: `relative`  
- 内边距: `0px`  
- 边框底部: `0px none rgb(34, 34, 34)`  
- 显示: `block`  

**按钮设计系统**:  
- 统一高度: `42px` (小型CTA) 到 `47.6px` (白色按钮)  
- 统一圆角: `8px`  
- 统一字号: `14px`  
- 统一过渡: `color 0.3s, background 0.3s, border 0.3s`  
- 三种变体: 深色填充、白色填充、描边  
- 字重: 300 (轻)、400 (常规)、500 (中等)  

### 1.3 CSS 变量系统（98个变量）

核心颜色系统:
- `--color-primary`: `#222`
- `--color-white`: `#fff`
- `--bg-primary`: `#F8F8F8`
- `--bg-secondary`: `#222`
- `--button-bg`: `#222`
- `--button-color`: `#fff`
- `--button-height`: `48px`
- `--button-pad`: `24px`
- `--button-rounded`: `8px`
- `--button-rounded-full`: `72px`
- `--border-gray`: `#ededed`
- `--text-size-primary`: `14px`
- `--text-size-medium`: `18px`
- `--text-size-large`: `22px`
- `--text-size-small`: `11px`
- `--rounded-normal`: `8px`
- `--rounded-small`: `4px`
- `--rounded-large`: `1rem`
- `--font-1`: `"Inter Tight"`

---

## 2. Wanted For Nothing

**分析 URL**: https://www.wantedfornothing.com

### 2.1 组件拆解表

| 组件 | 选择器 | 背景色 | 文字色 | 字号 | 字重 | 内边距 | 圆角 | 阴影 | 边框 | 过渡 |
|------|--------|--------|--------|------|------|--------|------|------|------|------|
| 页面主体 | `body` | `rgb(4, 5, 7)` | `rgb(191, 191, 191)` | `16px` | - | - | - | - | - | - |
| 自定义光标外层 | `.page-details__picker-circle-outer` | `transparent` | - | - | - | - | `50%` | - | `0px` | `all` |
| 自定义光标内层 | `.page-details__picker-circle-inner` | `transparent` | - | - | - | - | `50%` | - | `0px` | `all` |
| 作品区块容器 | `.block-works` | `transparent` | - | - | - | - | `0px` | none | `0px` | `all` |
| 作品标题 | `.block-works__title` | `transparent` | - | - | - | - | `0px` | - | - | `all` |
| 作品计数器 | `.block-works__counter` | `transparent` | - | - | - | - | `0px` | - | - | `all` |
| 页脚大按钮 | `.footer__btn` | `transparent` | `rgb(191,191,191)` | `200.92px` | `500` | `0px` | `0px` | none | `0px` | `all` |
| 详情选择器 | `.page-details__picker-btn` | `transparent` | `rgb(191,191,191)` | `8px` | `500` | `0px` | `0px` | none | `0px` | `opacity 0.3s` |

### 2.2 精确样式参数

**页面主体**:  
- 字体: `JWSans, Helvetica, Arial, sans-serif`  
- 字号: `16px`  
- 行高: `14.4px` (紧凑)  
- 背景: 极深暗色 `rgb(4, 5, 7)`  
- 文字色: 灰白 `rgb(191, 191, 191)`  

**自定义光标系统**:  
- 外层圆: `44px × 44px`, `border-radius: 50%`, `position: absolute`  
- 内层圆: `8px × 8px`, `border-radius: 50%`, `position: absolute`  
- 指针事件: `auto`  
- 变换矩阵: 包含旋转/缩放变换（如 `matrix(0.707, 0.707, 0, 1.414, 0, 0)`）  

**作品卡片容器**:  
- 总宽度: `1528px`  
- 总高度: `2897.99px` (长滚动)  
- 内部宽度: `1249.9px`  
- 标题区域高度: `180.825px`  
- 计数器高度: `206.012px`  
- 全部使用 `0px` 圆角（锐利边缘）  

**页脚超大文字**:  
- 字号: `200.92px` (巨型展示文字)  
- 字重: `500`  
- 颜色: `rgb(191, 191, 191)`  
- 高度: `287.025px`  
- 宽度: `252.55px`  

---

## 3. Rive

**分析 URL**: https://rive.app

### 3.1 组件拆解表

| 组件 | 选择器 | 背景色 | 文字色 | 字号 | 字重 | 内边距 | 圆角 | 阴影 | 边框 | 过渡 |
|------|--------|--------|--------|------|------|--------|------|------|------|------|
| 导航栏 | `nav` | `transparent` | - | - | - | `0px` | - | none | `0px` | - |
| CTA按钮 | `.framer-1u5kzp4` | `#1d1d1d` | `#000` | `12px` | `400` | `0px 16px` | `8px` | none | `0px` | `all` |
| H1主标题 | `h1` | - | `#fff` | `40px` | `500` | - | - | - | - | - |
| H2副标题 | `h2` | - | `#fff` / `#f1f1f1` | `24px` | `500` | - | - | - | - | - |
| H3标签 | `h3` | - | `#ffa41c` (橙色) | `14px` | `500` | - | - | - | - | - |

### 3.2 精确样式参数

**导航栏**:  
- 高度: `64px`  
- 显示: `flex`  
- 对齐: `align-items: center`, `justify-content: flex-start`  
- 背景: 完全透明  
- 定位: `relative`  

**CTA 按钮**:  
- 背景: `rgb(29, 29, 29)` (深炭灰)  
- 文字色: `rgb(0, 0, 0)` (注: 文字可能是白色，但 computed 显示黑色，可能是内部子元素覆盖)  
- 字号: `12px`  
- 字重: `400`  
- 高度: `40px`  
- 内边距: `0px 16px`  
- 圆角: `8px`  
- 边框: `0px outset`  
- 过渡: `all`  
- 背景图: `none`  

**字体层级系统**:  
- 品牌字体: `Tomorrow, "Tomorrow Placeholder", sans-serif`
- H1: `40px`, `500`, `0.4px` letter-spacing, `48px` line-height, `#fff`
- H2 展示: `24px`, `500`, `-0.8px` letter-spacing, `33.6px` line-height, `#f1f1f1`
- H3 标签: `14px`, `500`, `1.4px` letter-spacing, `14px` line-height, `#ffa41c` (橙色强调)
- H2 小号: `20px`, `500`, `0.2px` letter-spacing, `24px` line-height, `#f1f1f1`
- 新闻订阅: `24px`, `500`, `0.2px` letter-spacing, `31.2px` line-height, `#f1f1f1`

---

## 4. CodePen Trending

**分析 URL**: https://codepen.io/trending

### 4.1 组件拆解表

| 组件 | 选择器 | 背景色 | 文字色 | 字号 | 字重 | 内边距 | 圆角 | 阴影 | 边框 | 过渡 |
|------|--------|--------|--------|------|------|--------|------|------|------|------|
| 侧边栏 | `header.main-sidebar` | `#1e1f26` | - | - | - | `0px` | - | - | - | - |
| 浮动卡片 | `.HomepageAnonCards_item` | `#2c303a` | - | - | - | `22.5px 22.5px 30px` | `10px` | none | `0px` | - |
| 内容网格项 | `.ContentGridItem-module_root` | `transparent` | - | - | - | `0px` | `0px` | none | `0px` | - |
| 主标题 | `h1` | - | `#fff` | `45px` | `400` | - | - | - | - | - |
| 作品标题 | `h2.title` | - | `#fff` | `17px` | `900` | - | - | - | - | - |
| 作者信息 | `.titleAndAuthor` | - | `#fff` | `15px` | `400` | - | - | - | - | - |

### 4.2 精确样式参数

**侧边栏导航**:  
- 宽度: `180px`  
- 高度: `3953.7px` (与内容等高)  
- 背景: `rgb(30, 31, 38)` (深 slate)  
- 显示: `block`  
- 定位: `relative`  
- 内边距: `0px`  
- 溢出: `visible`  

**浮动代码卡片**:  
- 背景: `rgb(44, 48, 58)` (slate 800)  
- 宽度: `360px`  
- 高度: `304.7px`  
- 圆角: `10px`  
- 内边距: `22.5px 22.5px 30px` (不对称底部更大)  
- 外边距: `30px 0px` (垂直间距)  
- 溢出: `visible`  
- 边框: `0px`  
- 阴影: `none`  
- 背景滤镜: `none`  

**内容网格项**:  
- 宽度: `350px`  
- 高度: `278.425px`  
- 显示: `block`  (在网格中)  
- 溢出: `visible`  
- 边框: `0px`  
- 圆角: `0px`  

**字体系统**:  
- 主标题字体: `"Telefon Black", sans-serif` (展示字体)  
- 主标题: `45px`, `400`, `49.5px` line-height, 白色  
- 作品标题: `Lato`, `17px`, `900` (黑体), `20.4px` line-height, 白色  
- 作者/信息: `Lato`, `15px`, `400`, `22.5px` line-height, 白色  
- 字母间距: `normal` (无特殊追踪)  

---

## 5. Lusion

**分析 URL**: https://lusion.co

### 5.1 组件拆解表

| 组件 | 选择器 | 背景色 | 文字色 | 字号 | 字重 | 内边距 | 圆角 | 阴影 | 边框 | 过渡 |
|------|--------|--------|--------|------|------|--------|------|------|------|------|
| 导航栏 | `header` | `transparent` | - | - | - | `50px 76.4px` | - | - | - | - |
| 加载器数字 | `.preloader-percent-digit` | - | - | - | - | - | - | - | - | - |
| WebGL画布 | `#canvas` | - | - | - | - | - | - | - | - | - |
| 项目列表 | `.project-list` | `transparent` | - | - | - | `0px` | `0px` | none | `0px` | - |
| 项目项 | `.project-item` | `transparent` | - | - | - | `0px` | `0px` | none | `0px` | - |
| 项目图片 | `.project-item-image` | `transparent` | - | - | - | `0px` | `15px` | none | `0px` | - |
| 项目页脚 | `.project-item-footer` | `transparent` | - | - | - | `0px` | `0px` | none | `0px` | - |
| 转场覆盖层 | `#transition-overlay` | - | - | - | - | - | - | - | - | - |

### 5.2 精确样式参数

**加载动画 DOM**:  
- 类名: `.preloader-percent-digit`  
- 结构: 包含两个 `.preloader-percent-digit-num` 子 div，初始显示 "00"  
- 这是一个数字滚动百分比加载器  

**WebGL Canvas**:  
- 主画布 `#canvas`:  
  - 尺寸: `0` (原生 canvas 属性，但 CSS 尺寸为 `1528px × 686px`)  
  - 定位: `fixed` (全屏固定)  
  - 覆盖整个视口作为背景渲染层  
- 转场覆盖层 `#transition-overlay`:  
  - 原生尺寸: `860px` 或 `1912px` (可能是全屏覆盖)  
  - 定位: `fixed`  
  - 用于页面转场动画  
- 额外小画布: `90px` 原生尺寸，静态定位，CSS 尺寸 `44.8px × 44.8px`  

**导航栏**:  
- 高度: `146.4px` (非常高)  
- 定位: `fixed` (固定顶部)  
- 内边距: `50px 76.4px` (大量呼吸空间)  
- 背景: 完全透明  
- 显示: `block`  
- 边框底部: `0px`  

**项目卡片系统**:  
- 项目列表: `1375.19px` 宽, `2985.12px` 高 (长滚动)  
- 单个项目: `672.312px` 宽, `533.025px` 高  
- 项目主区域: `672.312px` 宽, `437px` 高, 顶部内边距 `437px` (图片区域)  
- 项目图片: `672.312px` 宽, `437px` 高, **`border-radius: 15px`** (大圆角)  
- 项目页脚: `672.312px` 宽, `75.4px` 高  
- 项目分割线: `672.312px` 宽, `15.8125px` 高, `margin: 20.628px 0px 13.752px`  

---

## 6. One Page Love

**分析 URL**: https://onepagelove.com

### 6.1 组件拆解表

| 组件 | 选择器 | 背景色 | 文字色 | 字号 | 字重 | 内边距 | 圆角 | 阴影 | 边框 | 过渡 |
|------|--------|--------|--------|------|------|--------|------|------|------|------|
| 导航栏 | `header` | `transparent` | - | - | - | `0px` | - | - | - | - |
| 作品卡片 | `.thumb-wrap` | `transparent` | - | - | - | `20px` | `8px` | none | `0px` | `all` |
| 品牌链接 | `a` | `transparent` | `#2d251f` | `14px` | `600` | `0px` | - | - | - | - |
| 菜单项 | `.nav-parent` | `transparent` | `#7e6858` | `14px` | `400` | `16px 14px 8px` | - | - | - | - |
| 导航链接 | `a` | `transparent` | `#7e6858` | `14px` | `400` | `10px 20px 8px` | - | - | - | - |
| 跳过链接 | `.skip-link` | `transparent` | `#d94f5c` | `12.75px` | `400` | `0px` | - | - | - | - |

### 6.2 精确样式参数

**导航栏**:  
- 高度: `86px`  
- 定位: `sticky` (粘顶)  
- 内边距: `0px`  
- 背景: 完全透明  
- 边框底部: `0px`  

**作品卡片网格**:  
- 类名: `.thumb-wrap.thumb-loop`  
- 宽度: `450.925px` (≈ 451px)  
- 高度: `654.825px` (≈ 655px)  
- 圆角: `8px`  
- 内边距: `20px`  
- 外边距: `0px`  
- 背景: 透明  
- 溢出: `visible`  
- 变换: `none`  
- 过渡: `all`  
- 阴影: `none`  
- 边框: `0px`  

**字体和颜色系统**:  
- 主体字体: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`  
- 展示字体: `Geist` (标题用)  
- 正文: `12.75px`, `400`, `rgb(45, 37, 31)`  
- 品牌链接: `14px`, `600`, `rgb(45, 37, 31)`  
- 菜单项: `14px`, `400`, `rgb(126, 104, 88)` (温暖灰褐)  
- 导航链接: `14px`, `400`, `rgb(126, 104, 88)`  
- 强调色: `rgb(217, 79, 92)` (珊瑚红)  
- 跳过链接: `12.75px`, `rgb(217, 79, 92)`  

**CSS 变量系统（63个变量）**:  
核心变量:
- `--accent`: `#D94F5C` (珊瑚红)
- `--accent-hover`: `#C4454F`
- `--beige-50` 到 `--beige-900`: 完整的 beige 灰度系统 (HSL 25, 18%, 96% → 15%)
- `--beige-h`: `25`, `--beige-s`: `18%`
- `--bg-page`: `#fff`
- `--bg-header`: `hsl(25, 18%, 92%)`
- `--bg-surface`: `hsl(25, 18%, 84%)`
- `--text-title`: `hsl(25, 18%, 15%)`
- `--text-body`: `hsl(25, 18%, 52%)`
- `--text-secondary`: `hsl(25, 18%, 42%)`
- `--text-muted`: `hsl(25, 18%, 52%)`
- `--border-default`: `hsl(25, 18%, 84%)`
- `--shadow-dropdown`: `0px 10px 30px -5px rgba(0,0,0,0.12)`
- `--selection-bg`: `#D94F5C`
- `--selection-text`: `#FFFFFF`
- `--blue`: `#11C1F4`, `--blue-hover`: `#11ACF4`
- `--header-title-size`: `32px`
- `--header-title-lh`: `34px`
- `--header-title-ls`: `-0.8px`
- `--header-desc-size`: `17px`
- `--opl-search-font-ui`: `"Geist Mono", ui-monospace, "SF Mono", Consolas, monospace`

---

## 7. 设计模式提取

### 7.1 按钮设计模式

| 模式 | 来源 | 特征 | 复用建议 |
|------|------|------|----------|
| **Awwwards 深色填充** | Awwwards | `#222` 背景, `#fff` 文字, `8px` 圆角, `42px` 高度, `0px 20px` 内边距, `0.3s` 过渡 | 通用 CTA 按钮，适合浅色背景 |
| **Awwwards 描边按钮** | Awwwards | `transparent` 背景, `0.8px solid #222` 边框, 同尺寸 | 次级操作，适合卡片内 |
| **Awwwards 白色按钮** | Awwwards | `#fff` 背景, `#222` 文字, `9.8px 19.6px` 内边距, `300` 字重 | 深色背景上的轻量按钮 |
| **Rive 深炭按钮** | Rive | `#1d1d1d` 背景, `8px` 圆角, `40px` 高度, `12px` 字号, `0px 16px` 内边距 | 现代深色按钮，适合 tech/创意品牌 |
| **WFN 极简链接** | WFN | `transparent` 背景, 无圆角, 仅 `opacity` 过渡 | 纯文本导航，高端极简 |

### 7.2 卡片设计模式

| 模式 | 来源 | 特征 | 复用建议 |
|------|------|------|----------|
| **CodePen 浮动卡片** | CodePen | `#2c303a` 背景, `10px` 圆角, `22.5px 22.5px 30px` 不对称内边距 | 代码/工具展示卡片 |
| **OPL 作品卡片** | One Page Love | `8px` 圆角, `20px` 内边距, `450px` 宽度, `655px` 高度, 透明背景 | 作品集/图片卡片 |
| **Lusion 项目卡片** | Lusion | `15px` 圆角 (图片), 大量留白, 页脚分隔 | 高端创意项目展示 |
| **Awwwards 搜索标签** | Awwwards | `8px` 圆角, `0px 8px` 内边距, `40px` 高度, 透明背景 | 标签/筛选按钮 |

### 7.3 导航设计模式

| 模式 | 来源 | 特征 | 复用建议 |
|------|------|------|----------|
| **Awwwards 简约导航** | Awwwards | `54px` 高度, 透明背景, `relative` 定位, 无圆角, 无阴影 | 内容优先型网站 |
| **Rive 弹性导航** | Rive | `64px` 高度, `flex` 显示, `align-items: center`, 透明背景 | 现代 SaaS/产品网站 |
| **Lusion 高留白导航** | Lusion | `146px` 高度, `fixed` 定位, `50px 76px` 内边距 | 沉浸式/艺术网站 |
| **OPL 粘顶导航** | One Page Love | `86px` 高度, `sticky` 定位, 透明背景 | 内容型博客/展示站 |
| **CodePen 侧边栏** | CodePen | `180px` 宽度, `#1e1f26` 背景, `block` 显示, 与内容等高 | 工具/仪表板类应用 |

### 7.4 字体层级系统

| 层级 | 来源 | 字号 | 字重 | 行高 | 字距 | 字体 |
|------|------|------|------|------|------|------|
| **H1 展示** | Rive | `40px` | `500` | `48px` | `0.4px` | Tomorrow |
| **H1 展示** | CodePen | `45px` | `400` | `49.5px` | `normal` | Telefon Black |
| **H2 副标题** | Rive | `24px` | `500` | `33.6px` | `-0.8px` | Tomorrow |
| **H2 卡片标题** | CodePen | `17px` | `900` | `20.4px` | `normal` | Lato |
| **H3 标签** | Rive | `14px` | `500` | `14px` | `1.4px` | Tomorrow |
| **正文** | Awwwards | `14px` | `400` | - | `normal` | Inter Tight |
| **正文** | WFN | `16px` | `400` | `14.4px` | `normal` | JWSans |
| **小标签** | OPL | `12.75px` | `400` | `12.75px` | `normal` | system-ui |
| **巨大展示** | WFN | `200.92px` | `500` | - | - | JWSans |

**模式总结**:
- 展示字体（H1）使用 `40-45px`，字重 `400-500`
- 副标题使用 `24px` 左右，字重 `500`
- 卡片标题使用 `17px` 左右，字重 `700-900`（高对比）
- 标签使用 `14px`，字重 `500`，配合 `1.4px` 宽字距（全大写效果）
- 正文使用 `14-16px`
- 字距策略：展示标题使用 `-0.8px`（紧凑），标签使用 `1.4px`（宽松）

### 7.5 间距系统

| 间距类型 | 值 | 来源 |
|----------|------|------|
| 超小内边距 | `0px 8px` | Awwwards (标签) |
| 小内边距 | `0px 10px` | Awwwards (导航项) |
| 标准按钮内边距 | `0px 16px` - `0px 20px` | Rive, Awwwards |
| 大按钮内边距 | `9.8px 19.6px` | Awwwards (白色按钮) |
| 卡片内边距 | `20px` | OPL |
| 卡片内边距(不对称) | `22.5px 22.5px 30px` | CodePen |
| 导航顶部内边距 | `50px 76px` | Lusion |
| 垂直外边距 | `30px 0px` | CodePen (卡片间距) |

### 7.6 颜色系统

**Awwwards（高对比黑白）**:
- 主色: `#222` (深炭灰)
- 白色: `#fff`
- 背景: `#F8F8F8` (浅灰)
- 边框: `#ededed`
- 强调: `#FA5D29` (橙红), `#502bd8` (紫), `#49B3FC` (蓝), `#AAEEC4` (绿)

**WFN（极暗电影感）**:
- 背景: `rgb(4, 5, 7)` (接近纯黑)
- 文字: `rgb(191, 191, 191)` (银灰)
- 无彩色装饰，全靠排版和间距

**Rive（深色 + 橙色强调）**:
- 背景: 透明/深色
- 主文字: `#fff` / `#f1f1f1`
- 强调: `#ffa41c` (亮橙)
- 按钮: `#1d1d1d`

**CodePen（深色 slate）**:
- 侧边栏: `#1e1f26`
- 卡片: `#2c303a`
- 文字: `#fff`
- 无强调色，靠排版层次

**OPL（温暖 beige 系统）**:
- 完整 beige 灰度: `hsl(25, 18%, 96%)` → `hsl(25, 18%, 15%)`
- 强调: `#D94F5C` (珊瑚红)
- 文字标题: `hsl(25, 18%, 15%)`
- 文字正文: `hsl(25, 18%, 52%)`
- 边框: `hsl(25, 18%, 84%)`
- 背景页: `#fff`
- 选择高亮: `#D94F5C`

---

## 8. 交互模式提取

### 8.1 悬停效果

| 模式 | 来源 | 实现方式 | 可复用代码 |
|------|------|----------|-----------|
| **Awwwards 按钮悬停** | Awwwards | `transition: color 0.3s, background 0.3s, border 0.3s` | 使用 CSS `transition` 在颜色/背景/边框上平滑过渡 |
| **WFN 光标跟踪** | WFN | 自定义 DOM 元素跟随鼠标，使用 `position: absolute` + `transform: matrix()` | 创建 `44px` 圆形元素，通过 JS 更新 `transform` 位置 |
| **WFN 透明度悬停** | WFN | `transition: opacity 0.3s` | 简单 opacity 变化，0.3s 缓动 |
| **OPL 全局过渡** | OPL | `transition: all` | 卡片/元素使用 `all` 过渡，悬停时可能改变 transform/shadow |
| **CodePen 卡片** | CodePen | 无显式过渡（静态卡片） | 依赖 hover 时的内部元素变化 |

### 8.2 点击反馈

| 模式 | 来源 | 特征 |
|------|------|------|
| **Awwwards 按钮** | Awwwards | 无 `box-shadow`，无按压动画，纯颜色反转 |
| **Rive 按钮** | Rive | 无 `box-shadow`，无边框，极简反馈 |
| **WFN 选择器** | WFN | 圆形选择器（picker）点击时通过 SVG 变换反馈 |

### 8.3 加载状态

| 模式 | 来源 | 实现方式 | 可复用代码 |
|------|------|----------|-----------|
| **Lusion 数字加载器** | Lusion | 双数字 DOM 结构（`.preloader-percent-digit-num`），从 00 滚动到 100 | 两个 `div` 分别显示十位数和个位数，通过 JS 更新数字内容 |
| **Lusion WebGL 加载** | Lusion | 全屏 `fixed` 定位 canvas，加载完成后淡出 | `position: fixed; width: 100vw; height: 100vh` 的 canvas 覆盖层 |

### 8.4 页面过渡

| 模式 | 来源 | 实现方式 |
|------|------|----------|
| **Lusion 转场覆盖** | Lusion | 第二个固定定位 canvas (`#transition-overlay`) 用于全屏转场动画 |
| **WFN 平滑滚动** | WFN | 长滚动页面（2898px），无分页 |
| **CodePen 无刷新** | CodePen | SPA 架构，动态加载内容 |

---

## 9. 可直接复用 CSS 代码片段

### 9.1 Awwwards — 按钮系统（3种变体）

```css
/* === Awwwards 按钮系统 === */

/* 1. 深色填充按钮（主 CTA） */
.btn-primary {
  background-color: #222;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  height: 42px;
  padding: 0px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: color 0.3s, background 0.3s, border 0.3s;
}

.btn-primary:hover {
  background-color: #444;
}

/* 2. 描边按钮（次级操作） */
.btn-outline {
  background-color: transparent;
  color: #222;
  font-size: 14px;
  font-weight: 500;
  height: 42px;
  padding: 0px 20px;
  border-radius: 8px;
  border: 0.8px solid #222;
  cursor: pointer;
  transition: color 0.3s, background 0.3s, border 0.3s;
}

.btn-outline:hover {
  background-color: #222;
  color: #fff;
}

/* 3. 白色轻量按钮 */
.btn-white {
  background-color: #fff;
  color: #222;
  font-size: 14px;
  font-weight: 300;
  height: 47.6px;
  padding: 9.8px 19.6px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: color 0.3s, background 0.3s, border 0.3s;
}

/* 4. 导航栏样式 */
.nav-awwwards {
  height: 54px;
  background: transparent;
  position: relative;
  padding: 0px;
  border-bottom: 0px none rgb(34, 34, 34);
  display: block;
}
```

### 9.2 Wanted For Nothing — 电影感暗色主题 + 自定义光标

```css
/* === WFN 电影感暗色主题 === */

body.wfn-theme {
  font-family: "JWSans", "Helvetica", "Arial", sans-serif;
  font-size: 16px;
  line-height: 14.4px;
  color: rgb(191, 191, 191);
  background-color: rgb(4, 5, 7);
  cursor: none; /* 隐藏默认光标 */
}

/* 自定义光标系统 */
.custom-cursor-outer {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  position: absolute;
  pointer-events: auto;
  background: transparent;
  border: none;
  transition: all;
  transform: none;
}

.custom-cursor-inner {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: absolute;
  pointer-events: auto;
  background: transparent;
  border: none;
  transition: all;
  transform: none;
}

/* 超大展示文字 */
.display-giant {
  font-size: 200.92px;
  font-weight: 500;
  color: rgb(191, 191, 191);
  line-height: 1;
}

/* 极简链接按钮 */
.link-minimal {
  background: transparent;
  border: none;
  color: rgb(191, 191, 191);
  font-size: 8px;
  font-weight: 500;
  padding: 0px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.link-minimal:hover {
  opacity: 0.6;
}
```

### 9.3 Rive — 现代深色 SaaS 按钮 + 字体层级

```css
/* === Rive 现代按钮系统 === */

.btn-rive {
  background-color: #1d1d1d;
  color: #fff; /* 实际使用白色文字覆盖 */
  font-size: 12px;
  font-weight: 400;
  height: 40px;
  padding: 0px 16px;
  border-radius: 8px;
  border: 0px outset;
  cursor: pointer;
  transition: all;
}

.btn-rive:hover {
  background-color: #333;
}

/* Rive 字体层级系统 */
.font-rive {
  font-family: "Tomorrow", "Tomorrow Placeholder", sans-serif;
}

.rive-h1 {
  font-size: 40px;
  font-weight: 500;
  letter-spacing: 0.4px;
  line-height: 48px;
  color: #fff;
}

.rive-h2 {
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.8px;
  line-height: 33.6px;
  color: #f1f1f1;
}

.rive-h3-label {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1.4px;
  line-height: 14px;
  color: #ffa41c; /* 橙色强调 */
  text-transform: uppercase; /* 建议 */
}

/* 导航栏 */
.nav-rive {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: transparent;
  position: relative;
  padding: 0px;
}
```

### 9.4 CodePen — 深色浮动卡片 + 侧边栏

```css
/* === CodePen 深色卡片系统 === */

.sidebar-codepen {
  width: 180px;
  height: 100%;
  background: #1e1f26;
  position: relative;
  display: block;
  padding: 0px;
  overflow: visible;
}

.card-codepen {
  width: 360px;
  height: 304.7px;
  background: #2c303a;
  border-radius: 10px;
  padding: 22.5px 22.5px 30px;
  margin: 30px 0px;
  overflow: visible;
  border: none;
  box-shadow: none;
}

/* 字体系统 */
.font-codepen-display {
  font-family: "Telefon Black", sans-serif;
  font-size: 45px;
  font-weight: 400;
  line-height: 49.5px;
  color: #fff;
  letter-spacing: normal;
}

.font-codepen-title {
  font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, sans-serif;
  font-size: 17px;
  font-weight: 900;
  line-height: 20.4px;
  color: #fff;
}

.font-codepen-meta {
  font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 22.5px;
  color: #fff;
}
```

### 9.5 Lusion — 沉浸式导航 + 项目卡片

```css
/* === Lusion 沉浸式导航 + 项目卡片 === */

.nav-lusion {
  height: 146.4px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 50px 76.4px;
  background: transparent;
  display: block;
  border-bottom: none;
  z-index: 100;
}

/* 项目图片卡片 */
.project-card-lusion {
  width: 672.312px;
  height: 437px;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  background: transparent;
}

/* 项目页脚 */
.project-footer-lusion {
  width: 672.312px;
  height: 75.4px;
  margin-top: 20.628px;
  padding: 0px;
  background: transparent;
  border-top: none;
}

/* 全屏 WebGL Canvas */
.canvas-webgl {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

/* 加载器 */
.preloader-digit {
  display: flex;
  gap: 4px;
}

.preloader-digit-num {
  font-variant-numeric: tabular-nums;
  /* 数字等宽，确保滚动不抖动 */
}
```

### 9.6 One Page Love — 温暖 Beige 系统

```css
/* === OPL 温暖 Beige 设计系统 === */

:root {
  --opl-accent: #D94F5C;
  --opl-accent-hover: #C4454F;
  --opl-beige-50: hsl(25, 18%, 96%);
  --opl-beige-100: hsl(25, 18%, 92%);
  --opl-beige-200: hsl(25, 18%, 88%);
  --opl-beige-300: hsl(25, 18%, 84%);
  --opl-beige-400: hsl(25, 18%, 80%);
  --opl-beige-500: hsl(25, 18%, 62%);
  --opl-beige-600: hsl(25, 18%, 52%);
  --opl-beige-700: hsl(25, 18%, 42%);
  --opl-beige-800: hsl(25, 18%, 32%);
  --opl-beige-900: hsl(25, 18%, 15%);
  --opl-bg-page: #fff;
  --opl-bg-header: hsl(25, 18%, 92%);
  --opl-text-title: hsl(25, 18%, 15%);
  --opl-text-body: hsl(25, 18%, 52%);
  --opl-border-default: hsl(25, 18%, 84%);
  --opl-shadow-dropdown: 0px 10px 30px -5px rgba(0,0,0,0.12);
  --opl-selection-bg: #D94F5C;
  --opl-selection-text: #FFFFFF;
}

body.opl-theme {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 12.75px;
  line-height: 12.75px;
  color: rgb(45, 37, 31);
  background-color: var(--opl-bg-page);
}

::selection {
  background-color: var(--opl-selection-bg);
  color: var(--opl-selection-text);
}

/* 导航栏 */
.nav-opl {
  height: 86px;
  position: sticky;
  top: 0;
  background: transparent;
  padding: 0px;
  border-bottom: none;
  display: block;
}

/* 作品卡片 */
.card-opl {
  width: 450.925px;
  height: 654.825px;
  border-radius: 8px;
  padding: 20px;
  background: transparent;
  overflow: visible;
  border: none;
  box-shadow: none;
  transition: all;
}

.card-opl:hover {
  /* 悬停时可通过 JS 添加 transform/shadow */
}

/* 品牌标题 */
.brand-opl {
  font-family: "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: rgb(45, 37, 31);
}

/* 导航链接 */
.nav-link-opl {
  font-size: 14px;
  font-weight: 400;
  color: rgb(126, 104, 88);
  padding: 10px 20px 8px;
  text-decoration: none;
  transition: all;
}

.nav-link-opl:hover {
  color: rgb(45, 37, 31);
}

/* 下拉阴影 */
.dropdown-opl {
  box-shadow: 0px 10px 30px -5px rgba(0,0,0,0.12);
}
```

---

## 附录：数据收集方法说明

本次分析使用 **Kimi WebBridge** 浏览器自动化技术，通过以下流程获取精确样式：

1. **导航**: `navigate` 到目标 URL，等待 5 秒确保页面完全加载
2. **评估**: 使用 `evaluate` 执行 JavaScript，调用 `getComputedStyle()` 获取计算后的最终样式值
3. **提取**: 针对每个组件类型（导航、按钮、卡片、标题、字体等）执行专门的 DOM 查询脚本
4. **收集**: 将所有结果序列化为 JSON 格式
5. **验证**: 通过多轮次评估和交叉验证确保数据准确性

> **注意**: 某些网站使用 WebGL/Canvas（如 Lusion）、Framer（如 Rive）或动态生成内容，因此部分组件可能需要更深入的代码审查才能获取完整的交互逻辑。本报告聚焦于 **CSS 计算样式** 层面的精确提取。

---

*报告生成完毕。数据可直接用于设计系统构建、组件库开发或参考学习。*
