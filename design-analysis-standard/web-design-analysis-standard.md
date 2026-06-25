# 网站设计理念与UI组件获取规范（v1.0）

> 本规范定义了一套标准化的工作流程、数据采集方法和分析框架，用于对前沿网站进行源码级、组件级的设计理念提取与UI组件分析。适用于：设计灵感采集、竞品分析、设计系统构建、组件库开发。

---

## 一、规范概述

### 1.1 目标
- 从目标网站提取可量化的设计参数（颜色、字体、间距、圆角、阴影等）
- 识别并拆解可复用的UI组件（按钮、卡片、导航、Hero、表单等）
- 分析交互模式（悬停、点击、加载、过渡）
- 形成可直接复用的CSS/设计Token代码片段

### 1.2 分析深度层级

| 层级 | 内容 | 输出 |
|------|------|------|
| **L1：视觉扫描** | 截图、整体印象、风格定位 | 截图 + 风格描述 |
| **L2：系统级** | CSS变量、字体系统、颜色系统、间距系统 | 结构化数据表 |
| **L3：组件级** | 具体UI组件的精确尺寸、样式、交互 | 组件拆解表 + 代码片段 |
| **L4：交互级** | 动画时长、缓动函数、状态变化 | 交互模式分析 |
| **L5：源码级** | 技术栈、外部资源、架构推断 | 技术栈报告 |

> **本规范要求至少达到 L3（组件级）**，推荐同时覆盖 L4 和 L5。

---

## 二、前置条件

### 2.1 必需工具
- **Kimi WebBridge**：浏览器自动化控制工具（通过 http://127.0.0.1:10086/command 访问）
- **curl.exe**：Windows 环境下使用 `curl.exe` 发送请求（注意不是 PowerShell 的 `Invoke-WebRequest`）
- **JSON 文件**：所有请求通过临时 JSON 文件发送，避免中文编码问题

### 2.2 环境启动

```powershell
# 启动 WebBridge（如未运行）
& "$env:USERPROFILE\.kimi-webbridge\bin\kimi-webbridge.exe" start
```

### 2.3 工作目录
```
E:\A_Project\frontend-ui\
├── web-design-reports/          # 分析报告输出目录
│   ├── {domain}-analysis.md       # 单个网站分析报告
│   └── screenshots/             # 截图保存目录
│       └── {domain}.png
└── web-design-standards.md      # 本规范文件
```

---

## 三、标准工作流程

### 阶段一：准备与导航（5分钟）

#### 步骤 1.1：创建会话
```bash
# 导航到目标网站，创建新标签页
# 请求体保存为临时 JSON 文件
```

**JSON 请求模板（`navigate.json`）：**
```json
{
  "action": "navigate",
  "args": {
    "url": "https://目标网站.com",
    "newTab": true,
    "group_title": "UI设计分析"
  },
  "session": "ui-design-analysis"
}
```

**发送命令：**
```powershell
# 写入临时文件
$json = '{"action":"navigate","args":{"url":"https://目标网站.com","newTab":true,"group_title":"UI设计分析"},"session":"ui-design-analysis"}'
$json | Out-File -FilePath "$env:TEMP\webbridge-nav.json" -Encoding utf8

# 发送请求
curl.exe -s -X POST http://127.0.0.1:10086/command -H "Content-Type: application/json" --data-binary "@$env:TEMP\webbridge-nav.json"

# 删除临时文件
Remove-Item "$env:TEMP\webbridge-nav.json"
```

#### 步骤 1.2：等待页面加载
```bash
sleep 5  # 基础等待 5 秒
# 对于 WebGL/动画密集型网站，等待 10-15 秒
```

---

### 阶段二：数据采集（核心，20-30分钟）

按以下顺序执行，每个 evaluate 命令之间留出 **3-5 秒** 间隔。

#### 步骤 2.1：获取页面快照
```json
{
  "action": "snapshot",
  "session": "ui-design-analysis"
}
```
**目的**：了解页面整体结构、元素层级、可交互元素位置。

#### 步骤 2.2：获取页面截图
```json
{
  "action": "screenshot",
  "args": {
    "path": "E:\\A_Project\\frontend-ui\\screenshots\\目标网站.png"
  },
  "session": "ui-design-analysis"
}
```
**目的**：保存视觉参考，用于报告中配图。

#### 步骤 2.3：获取 CSS 变量系统

**evaluate 脚本：**
```javascript
(() => {
  const root = document.documentElement;
  const s = getComputedStyle(root);
  const vars = {};
  for (let i = 0; i < s.length; i++) {
    const prop = s[i];
    if (prop.startsWith('--')) {
      vars[prop] = s.getPropertyValue(prop).trim();
    }
  }
  // 分类整理
  const categories = { color: [], spacing: [], typography: [], radius: [], shadow: [], other: [] };
  Object.entries(vars).forEach(([k, v]) => {
    if (k.includes('color') || k.includes('bg') || k.includes('text') || k.includes('border')) categories.color.push(`${k} = ${v}`);
    else if (k.includes('size') || k.includes('height') || k.includes('width') || k.includes('padding') || k.includes('margin') || k.includes('gap')) categories.spacing.push(`${k} = ${v}`);
    else if (k.includes('font') || k.includes('text')) categories.typography.push(`${k} = ${v}`);
    else if (k.includes('round') || k.includes('radius')) categories.radius.push(`${k} = ${v}`);
    else if (k.includes('shadow')) categories.shadow.push(`${k} = ${v}`);
    else categories.other.push(`${k} = ${v}`);
  });
  return categories;
})()
```

**目的**：提取网站的设计Token，了解其设计系统变量化程度。

#### 步骤 2.4：获取字体系统

**evaluate 脚本：**
```javascript
(() => {
  const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button, nav, header, .title, .heading, .display');
  const fontMap = new Map();
  elements.forEach(el => {
    const s = getComputedStyle(el);
    const fs = parseFloat(s.fontSize);
    if (fs < 10) return; // 忽略过小文字
    const key = `${s.fontFamily}|${s.fontSize}|${s.fontWeight}|${s.lineHeight}|${s.letterSpacing}`;
    if (!fontMap.has(key)) {
      fontMap.set(key, {
        tag: el.tagName,
        class: el.className.slice(0, 40),
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        lineHeight: s.lineHeight,
        letterSpacing: s.letterSpacing,
        color: s.color,
        textTransform: s.textTransform,
        sampleText: el.textContent.slice(0, 30)
      });
    }
  });
  return Array.from(fontMap.values()).slice(0, 20);
})()
```

**目的**：构建网站的字体层级系统。

#### 步骤 2.5：获取颜色系统

**evaluate 脚本：**
```javascript
(() => {
  const elements = document.querySelectorAll('*');
  const bgColors = new Map();
  const textColors = new Map();
  const borderColors = new Map();
  
  elements.forEach(el => {
    const s = getComputedStyle(el);
    const bg = s.backgroundColor;
    const color = s.color;
    const border = s.borderColor;
    
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
      bgColors.set(bg, (bgColors.get(bg) || 0) + 1);
    }
    if (color) {
      textColors.set(color, (textColors.get(color) || 0) + 1);
    }
    if (border && border !== 'rgba(0, 0, 0, 0)') {
      borderColors.set(border, (borderColors.get(border) || 0) + 1);
    }
  });
  
  return {
    backgrounds: Array.from(bgColors.entries()).sort((a, b) => b[1] - a[1]).slice(0, 15),
    texts: Array.from(textColors.entries()).sort((a, b) => b[1] - a[1]).slice(0, 15),
    borders: Array.from(borderColors.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10)
  };
})()
```

**目的**：提取网站的主色、辅助色、背景色、文字色频率分布。

#### 步骤 2.6：获取布局系统（Grid/Flex）

**evaluate 脚本：**
```javascript
(() => {
  const containers = document.querySelectorAll('*');
  const layouts = [];
  containers.forEach(el => {
    const s = getComputedStyle(el);
    if (s.display === 'grid' || s.display === 'flex') {
      const rect = el.getBoundingClientRect();
      if (rect.width < 50 || rect.height < 50) return; // 忽略过小元素
      layouts.push({
        tag: el.tagName,
        class: el.className.slice(0, 50),
        display: s.display,
        width: s.width,
        height: s.height,
        gridTemplate: s.gridTemplateColumns,
        gridRows: s.gridTemplateRows,
        gap: s.gap,
        rowGap: s.rowGap,
        columnGap: s.columnGap,
        justifyContent: s.justifyContent,
        alignItems: s.alignItems,
        flexDirection: s.flexDirection,
        flexWrap: s.flexWrap,
        padding: s.padding,
        margin: s.margin
      });
    }
  });
  return layouts.slice(0, 15);
})()
```

**目的**：了解网站的布局策略（Grid/Flex 使用比例、间距策略）。

#### 步骤 2.7：获取按钮组件

**evaluate 脚本：**
```javascript
(() => {
  const buttons = document.querySelectorAll('button, .button, [role="button"], .btn, .cta, a[class*="btn"], a[class*="button"]');
  const results = [];
  buttons.forEach((btn, i) => {
    if (i > 15) return;
    const s = getComputedStyle(btn);
    if (s.display === 'none' || !btn.textContent.trim()) return;
    const rect = btn.getBoundingClientRect();
    if (rect.width < 30 || rect.height < 20) return;
    results.push({
      text: btn.textContent.trim().slice(0, 30),
      class: btn.className.slice(0, 50),
      width: s.width,
      height: s.height,
      backgroundColor: s.backgroundColor,
      color: s.color,
      border: s.border,
      borderRadius: s.borderRadius,
      padding: s.padding,
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      fontFamily: s.fontFamily.slice(0, 50),
      boxShadow: s.boxShadow,
      transition: s.transition,
      cursor: s.cursor,
      letterSpacing: s.letterSpacing,
      textTransform: s.textTransform
    });
  });
  return results.slice(0, 10);
})()
```

**目的**：提取按钮设计系统的所有变体（主按钮、次按钮、描边、文字链接等）。

#### 步骤 2.8：获取卡片组件

**evaluate 脚本：**
```javascript
(() => {
  const cards = document.querySelectorAll('.card, [class*="card"], .item, [class*="item"], .grid > div, .project, .work, .case, .post');
  const results = [];
  cards.forEach((card, i) => {
    if (i > 15) return;
    const s = getComputedStyle(card);
    const rect = card.getBoundingClientRect();
    if (rect.width < 100 || rect.height < 100) return;
    results.push({
      class: card.className.slice(0, 50),
      width: s.width,
      height: s.height,
      backgroundColor: s.backgroundColor,
      borderRadius: s.borderRadius,
      padding: s.padding,
      margin: s.margin,
      boxShadow: s.boxShadow,
      border: s.border,
      overflow: s.overflow,
      position: s.position,
      transition: s.transition
    });
  });
  return results.slice(0, 8);
})()
```

**目的**：提取卡片/容器组件的设计模式。

#### 步骤 2.9：获取导航组件

**evaluate 脚本：**
```javascript
(() => {
  const navs = document.querySelectorAll('nav, header, [class*="nav"], [class*="header"]');
  const results = [];
  navs.forEach((nav, i) => {
    if (i > 5) return;
    const s = getComputedStyle(nav);
    const rect = nav.getBoundingClientRect();
    if (rect.height < 20) return;
    results.push({
      tag: nav.tagName,
      class: nav.className.slice(0, 50),
      width: s.width,
      height: s.height,
      backgroundColor: s.backgroundColor,
      position: s.position,
      top: s.top,
      left: s.left,
      right: s.right,
      padding: s.padding,
      display: s.display,
      justifyContent: s.justifyContent,
      alignItems: s.alignItems,
      borderBottom: s.borderBottom,
      boxShadow: s.boxShadow,
      backdropFilter: s.backdropFilter,
      zIndex: s.zIndex
    });
  });
  return results;
})()
```

**目的**：提取导航栏的精确参数（高度、定位、背景、模糊效果等）。

#### 步骤 2.10：获取 Hero/标题组件

**evaluate 脚本：**
```javascript
(() => {
  const heroes = document.querySelectorAll('h1, .hero-title, .title, .display, [class*="hero"], [class*="title"], [class*="heading"]');
  const results = [];
  heroes.forEach((el, i) => {
    if (i > 10) return;
    const s = getComputedStyle(el);
    const fs = parseFloat(s.fontSize);
    if (fs < 20) return;
    results.push({
      text: el.textContent.trim().slice(0, 40),
      tag: el.tagName,
      class: el.className.slice(0, 50),
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      lineHeight: s.lineHeight,
      letterSpacing: s.letterSpacing,
      color: s.color,
      textTransform: s.textTransform,
      fontFamily: s.fontFamily.slice(0, 50),
      textAlign: s.textAlign,
      maxWidth: s.maxWidth
    });
  });
  return results.slice(0, 8);
})()
```

**目的**：提取展示级文字的设计参数（超大标题、字距、行高等）。

#### 步骤 2.11：获取动画与交互

**evaluate 脚本：**
```javascript
(() => {
  const elements = document.querySelectorAll('*');
  const animations = [];
  const transitions = [];
  
  elements.forEach(el => {
    const s = getComputedStyle(el);
    if (s.animationName !== 'none' && s.animationName) {
      animations.push({
        tag: el.tagName,
        class: el.className.slice(0, 40),
        animationName: s.animationName,
        animationDuration: s.animationDuration,
        animationTimingFunction: s.animationTimingFunction,
        animationDelay: s.animationDelay,
        animationIterationCount: s.animationIterationCount
      });
    }
    if (s.transitionProperty !== 'all' && s.transitionProperty !== 'none' && s.transitionDuration !== '0s') {
      transitions.push({
        tag: el.tagName,
        class: el.className.slice(0, 40),
        transitionProperty: s.transitionProperty,
        transitionDuration: s.transitionDuration,
        transitionTimingFunction: s.transitionTimingFunction,
        transitionDelay: s.transitionDelay
      });
    }
  });
  
  return {
    animations: animations.slice(0, 10),
    transitions: transitions.slice(0, 15)
  };
})()
```

**目的**：提取动画时长、缓动函数、过渡属性。

#### 步骤 2.12：获取 Transform 使用

**evaluate 脚本：**
```javascript
(() => {
  const elements = document.querySelectorAll('*');
  const transforms = [];
  elements.forEach(el => {
    const s = getComputedStyle(el);
    if (s.transform !== 'none') {
      transforms.push({
        tag: el.tagName,
        class: el.className.slice(0, 40),
        transform: s.transform,
        transformOrigin: s.transformOrigin,
        transformStyle: s.transformStyle,
        perspective: s.perspective
      });
    }
  });
  return transforms.slice(0, 15);
})()
```

**目的**：了解 3D/2D 变换的使用模式（缩放、旋转、位移、透视等）。

#### 步骤 2.13：获取外部资源（技术栈推断）

**evaluate 脚本：**
```javascript
(() => {
  const scripts = Array.from(document.querySelectorAll('script'))
    .map(s => s.src)
    .filter(Boolean)
    .filter(src => src.includes('http'));
  const links = Array.from(document.querySelectorAll('link[href]'))
    .map(l => l.href)
    .filter(Boolean);
  const metas = Array.from(document.querySelectorAll('meta'))
    .map(m => ({ name: m.name || m.property, content: m.content }))
    .filter(m => m.name);
  
  // 推断技术栈
  const techStack = [];
  if (scripts.some(s => s.includes('react'))) techStack.push('React');
  if (scripts.some(s => s.includes('vue'))) techStack.push('Vue');
  if (scripts.some(s => s.includes('angular'))) techStack.push('Angular');
  if (scripts.some(s => s.includes('astro'))) techStack.push('Astro');
  if (scripts.some(s => s.includes('next'))) techStack.push('Next.js');
  if (scripts.some(s => s.includes('framer'))) techStack.push('Framer');
  if (scripts.some(s => s.includes('three'))) techStack.push('Three.js');
  if (scripts.some(s => s.includes('gsap'))) techStack.push('GSAP');
  if (scripts.some(s => s.includes('jquery'))) techStack.push('jQuery');
  if (links.some(l => l.includes('wp-content'))) techStack.push('WordPress');
  if (scripts.some(s => s.includes('webflow'))) techStack.push('Webflow');
  if (scripts.some(s => s.includes('shopify'))) techStack.push('Shopify');
  
  return { scripts: scripts.slice(0, 15), links: links.slice(0, 10), metas: metas.slice(0, 10), techStack };
})()
```

**目的**：推断网站的技术栈和架构。

---

### 阶段三：特殊组件深度分析（视网站类型而定）

#### 3.1 对于 WebGL/3D 网站（如 Lusion）
额外获取：
- Canvas 元素信息（尺寸、定位、z-index）
- 加载动画 DOM 结构
- 是否有转场覆盖层

**evaluate 脚本：**
```javascript
(() => {
  const canvases = document.querySelectorAll('canvas');
  const results = [];
  canvases.forEach(canvas => {
    const s = getComputedStyle(canvas);
    results.push({
      id: canvas.id,
      class: canvas.className,
      width: s.width,
      height: s.height,
      position: s.position,
      zIndex: s.zIndex,
      nativeWidth: canvas.width,
      nativeHeight: canvas.height
    });
  });
  return results;
})()
```

#### 3.2 对于自定义光标网站（如 Wanted For Nothing）
额外获取：
- 自定义光标元素
- body 的 cursor 属性

**evaluate 脚本：**
```javascript
(() => {
  const bodyCursor = getComputedStyle(document.body).cursor;
  const customCursors = document.querySelectorAll('[class*="cursor"], [class*="pointer"]');
  const cursors = [];
  customCursors.forEach((c, i) => {
    if (i > 5) return;
    const s = getComputedStyle(c);
    cursors.push({
      class: c.className.slice(0, 50),
      width: s.width,
      height: s.height,
      borderRadius: s.borderRadius,
      backgroundColor: s.backgroundColor,
      border: s.border,
      position: s.position,
      pointerEvents: s.pointerEvents,
      transition: s.transition,
      transform: s.transform
    });
  });
  return { bodyCursor, customCursors: cursors };
})()
```

#### 3.3 对于 SaaS/产品网站（如 Rive）
额外获取：
- CTA 按钮的精确样式（渐变、边框、阴影）
- 产品卡片参数
- 定价/功能卡片

#### 3.4 对于深色主题网站（如 CodePen）
额外获取：
- 代码/语法高亮颜色
- 浮动卡片的 backdrop-filter
- 渐变装饰元素

---

### 阶段四：数据清洗与整理（10分钟）

#### 步骤 4.1：整理 CSS 变量
按类别分组：颜色、间距、字体、圆角、阴影、其他。

#### 步骤 4.2：提取设计 Token
从颜色和样式中提取可复用的 Token：
- 主色、辅助色、背景色、文字色
- 字号层级（display → h1 → h2 → body → caption）
- 间距层级（xs → sm → md → lg → xl）
- 圆角层级（sm → md → lg → full）
- 阴影层级（sm → md → lg → xl）

#### 步骤 4.3：识别组件变体
从按钮、卡片中提取变体模式：
- 按钮：主按钮 / 次按钮 / 描边 / 文字链接 / 幽灵按钮
- 卡片：标准卡片 / 图片卡片 / 信息卡片 / 悬浮卡片

---

### 阶段五：分析报告输出（15分钟）

#### 报告模板

```markdown
# {网站名称} — 设计深度分析报告

> **分析 URL**: {url}
> **分析日期**: {date}
> **分析深度**: L3（组件级）

---

## 1. 整体风格定位

- **风格关键词**: {如：极简现代、暗黑奢华、温暖自然、科技前卫}
- **视觉特征**: {如：大字体排版、WebGL 3D、深色主题、高对比}
- **目标受众**: {如：设计师、开发者、企业客户、消费者}

## 2. 设计系统

### 2.1 CSS 变量（{数量} 个）

| 变量名 | 值 | 用途 |
|--------|------|------|
| --var-name | #value | 描述 |

### 2.2 字体系统

| 层级 | 字体 | 字号 | 字重 | 行高 | 字距 | 用途 |
|------|------|------|------|------|------|------|
| H1 | Inter | 40px | 500 | 48px | -0.8px | 主标题 |
| Body | Inter | 14px | 400 | 1.5 | normal | 正文 |

### 2.3 颜色系统

| 用途 | 色值 | 出现频率 |
|------|------|----------|
| 主色 | #222 | 高频 |
| 背景 | #F8F8F8 | 高频 |
| 强调 | #FF5500 | 中频 |

### 2.4 间距系统

| 名称 | 值 | 用途 |
|------|------|------|
| xs | 8px | 标签内边距 |
| sm | 16px | 按钮内边距水平 |
| md | 24px | 卡片内边距 |
| lg | 52px | 页面内边距 |

### 2.5 圆角系统

| 名称 | 值 | 用途 |
|------|------|------|
| sm | 4px | 小按钮 |
| md | 8px | 标准按钮/卡片 |
| lg | 15px | 图片卡片 |
| full | 72px | 全圆按钮 |

## 3. 组件拆解表

| 组件 | 选择器 | 背景色 | 文字色 | 字号 | 字重 | 内边距 | 圆角 | 阴影 | 边框 | 过渡 |
|------|--------|--------|--------|------|------|--------|------|------|------|------|

## 4. 交互模式

### 4.1 悬停效果
| 组件 | 触发前 | 触发后 | 过渡时长 | 缓动 |
|------|--------|--------|----------|------|

### 4.2 加载状态
| 类型 | 实现方式 | 技术 |
|------|----------|------|

### 4.3 页面过渡
| 类型 | 实现方式 | 技术 |
|------|----------|------|

## 5. 技术栈推断

| 技术 | 证据 | 置信度 |
|------|------|--------|
| React | 脚本包含 react | 高 |
| GSAP | 脚本包含 gsap | 中 |

## 6. 可直接复用代码

### 6.1 按钮系统
```css
/* 代码片段 */
```

### 6.2 卡片系统
```css
/* 代码片段 */
```

### 6.3 导航栏
```css
/* 代码片段 */
```

## 7. 截图参考

![截图](screenshots/目标网站.png)

---

*分析完成*
```

---

## 四、数据质量检查清单

在提交报告前，检查以下项目：

- [ ] CSS 变量已按类别分组（颜色、间距、字体、圆角、阴影）
- [ ] 字体系统已识别至少 3 个层级（标题/正文/标签）
- [ ] 颜色系统已提取主色、辅助色、背景色、文字色
- [ ] 按钮组件已识别至少 2 种变体
- [ ] 卡片组件已获取尺寸、圆角、阴影、内边距
- [ ] 导航栏已获取高度、定位、背景、模糊效果
- [ ] 动画系统已提取过渡时长和缓动函数
- [ ] 技术栈已推断并有证据支撑
- [ ] 截图已保存并引用
- [ ] 包含至少 3 个可直接复用的代码片段

---

## 五、常见问题与解决方案

### Q1：网站加载后截图是空白或黑屏
**原因**：WebGL/Canvas 网站需要时间初始化，或页面使用延迟加载。
**解决**：增加等待时间（`sleep 10`），或滚动到页面底部触发懒加载。

### Q2：evaluate 返回的数据被截断
**原因**：输出数据量过大，超过传输限制。
**解决**：使用 `.slice(0, N)` 限制返回数量，或分多次 evaluate 获取不同部分。

### Q3：某些元素获取不到样式
**原因**：元素通过 JS 动态渲染，初始 DOM 中不存在。
**解决**：增加等待时间，或通过交互（click、scroll）触发渲染后再获取。

### Q4：自定义光标找不到
**原因**：自定义光标可能是 SVG 或 Canvas 绘制，不是 DOM 元素。
**解决**：检查 body 的 `cursor` 属性，或检查是否有隐藏的全局光标元素。

### Q5：颜色值重复太多（如 rgba(0,0,0,0) 大量出现）
**原因**：很多元素默认透明背景被计算进去了。
**解决**：在脚本中过滤掉 `transparent` 和 `rgba(0,0,0,0)` 的值。

---

## 六、附录：可复用脚本模板

### 模板 A：完整数据采集流程（Bash 脚本）

```bash
# 定义变量
SITE_URL="https://目标网站.com"
SITE_NAME="目标网站"
SESSION="ui-design-analysis"
REPORT_DIR="E:/A_Project/frontend-ui/web-design-reports"

echo "=== 开始分析 ${SITE_NAME} ==="

# 1. 导航
curl -s -X POST http://127.0.0.1:10086/command \
  -H "Content-Type: application/json" \
  -d "{\"action\":\"navigate\",\"args\":{\"url\":\"${SITE_URL}\",\"newTab\":true,\"group_title\":\"UI设计分析\"},\"session\":\"${SESSION}\"}"

sleep 5

# 2. 截图
curl -s -X POST http://127.0.0.1:10086/command \
  -H "Content-Type: application/json" \
  -d "{\"action\":\"screenshot\",\"args\":{\"path\":\"${REPORT_DIR}/screenshots/${SITE_NAME}.png\"},\"session\":\"${SESSION}\"}"

# 3-15. 依次执行 evaluate 脚本...
# （使用 JSON 文件方式发送，避免编码问题）

echo "=== ${SITE_NAME} 分析完成 ==="
```

### 模板 B：Windows PowerShell 发送 evaluate 请求

```powershell
$script = '(() => { /* 你的 JavaScript 代码 */ })()'
$json = @{
  action = "evaluate"
  args = @{ code = $script }
  session = "ui-design-analysis"
} | ConvertTo-Json -Depth 10

$json | Out-File -FilePath "$env:TEMP\eval.json" -Encoding utf8
$result = curl.exe -s -X POST http://127.0.0.1:10086/command -H "Content-Type: application/json" --data-binary "@$env:TEMP\eval.json"
Remove-Item "$env:TEMP\eval.json"
$result | ConvertFrom-Json
```

### 模板 C：快速评估单网站（推荐）

使用此模板时，依次替换 `{URL}` 和 `{NAME}`，然后执行。

```powershell
# ===== 配置 =====
$URL = "https://目标网站.com"
$NAME = "目标网站"
$SESSION = "ui-design-analysis-$NAME"
$REPORT_DIR = "E:\A_Project\frontend-ui\web-design-reports"

# 确保目录存在
New-Item -ItemType Directory -Force -Path "$REPORT_DIR\screenshots" | Out-Null

# 导航
curl.exe -s -X POST http://127.0.0.1:10086/command -H "Content-Type: application/json" -d "{`"action`":`"navigate`",`"args`":{`"url`":`"$URL`",`"newTab`":true,`"group_title`":`"UI设计分析`"},`"session`":`"$SESSION`"}" | Out-Null
sleep 5

# 截图
curl.exe -s -X POST http://127.0.0.1:10086/command -H "Content-Type: application/json" -d "{`"action`":`"screenshot`",`"args`":{`"path`":`"$REPORT_DIR\screenshots\$NAME.png`"},`"session`":`"$SESSION`"}" | Out-Null

# 获取 CSS 变量（保存为 JSON 供后续分析）
$script = '(() => { const s = getComputedStyle(document.documentElement); const v = {}; for (let i = 0; i < s.length; i++) { const p = s[i]; if (p.startsWith("--")) v[p] = s.getPropertyValue(p); } return v; })()'
$json = "{`"action`":`"evaluate`",`"args`":{`"code`":`"$script`"},`"session`":`"$SESSION`"}"
$json | Out-File -FilePath "$env:TEMP\eval.json" -Encoding utf8
$cssVars = curl.exe -s -X POST http://127.0.0.1:10086/command -H "Content-Type: application/json" --data-binary "@$env:TEMP\eval.json"
Remove-Item "$env:TEMP\eval.json"

# 输出结果
Write-Host "CSS 变量已获取: $($cssVars.Length) 字符"
Write-Host "截图已保存: $REPORT_DIR\screenshots\$NAME.png"
Write-Host "请继续执行其余 evaluate 脚本..."
```

---

## 七、版本记录

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| v1.0 | 2026-06-26 | 初始版本，基于 Awwwards、Lusion、WFN、Rive、CodePen、OPL 的分析经验总结 |

---

*本规范为活文档，每次分析新网站后应迭代更新最佳实践和脚本模板。*
