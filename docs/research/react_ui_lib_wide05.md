# 调研维度五：无障碍与可访问性（Accessibility & A11y）

> 调研时间：2025年7月 | 搜索次数：12次独立搜索 | 覆盖中英文信息源

---

## 1. 关键发现摘要

### 核心数据

- **WCAG合规现状严峻**：WebAIM Million 2025报告显示，94.8%的顶部100万个网站首页存在可检测的WCAG 2失败 [^214^]，平均每个页面51个错误。2026年这一数字恶化至95.9% [^261^]。
- **六大错误占96%**：低对比度文本（83.9%）、缺失图片替代文本（53.1%）、表单缺少标签（51%）、空链接（46.3%）、空按钮（30.6%）、缺少文档语言声明（13.5%）[^261^]
- **法律合规压力空前**：欧洲无障碍法（EAA）已于2025年6月28日生效 [^151^]；美国ADA相关诉讼2025年达3,117起，增长27% [^252^]
- **React组件库可访问性分层明显**：Radix UI提供最强的WAI-ARIA合规性 [^169^]，Base UI v1.0已发布35个无障碍组件 [^194^]，shadcn/ui 48个组件中34个通过WCAG 2.2 AA [^180^]
- **自动化工具只能捕获约57%的问题**：Deque研究显示自动化测试仅覆盖约57%的体积问题，剩余需人工判断 [^250^]

---

## 2. 可访问性标准与法律要求

### 2.1 WCAG 2.1/2.2 合规要求

#### WCAG版本演进

| 版本 | 发布时间 | 状态 |
|------|---------|------|
| WCAG 2.0 | 2008年12月 | 已过时 |
| WCAG 2.1 | 2018年6月 | 当前主流标准 |
| WCAG 2.2 | 2023年10月 | W3C推荐，2025年10月成为ISO/IEC 40500:2025 [^141^] |

WCAG 2.2向后兼容2.1，满足2.2自动满足2.1。WCAG 2.2新增9个成功标准，移除1个（4.1.1 Parsing）[^142^][^250^]。

#### 三个合规级别

- **Level A**（最低）：25个标准，基础无障碍要求 [^141^]
- **Level AA**（标准合规目标）：Level A + 13个额外标准。DOJ、EAA等法律通常要求此级别 [^141^][^144^]
- **Level AAA**（增强）：Level AA + 9个额外标准。适用于政府合同、医疗平台、教育机构 [^142^]

#### WCAG 2.2 新增关键标准（对组件库影响）

| 标准编号 | 名称 | 级别 | 对组件库的影响 |
|---------|------|------|--------------|
| 2.4.11 | Focus Not Obscured (Minimum) | AA | 模态框打开时焦点元素不可被遮挡 |
| 2.4.12 | Focus Not Obscured (Enhanced) | AAA | 焦点元素完全可见 |
| 2.4.13 | Focus Appearance | AAA | 焦点指示器需有3:1对比度，2px厚度 [^142^] |
| 2.5.7 | Dragging Movements | AA | 拖拽操作需有键盘替代方案 |
| 2.5.8 | Target Size (Minimum) | AA | 交互元素最小24x24 CSS像素 [^142^] |
| 3.2.6 | Consistent Help | A | 帮助机制位置一致 |
| 3.3.7 | Redundant Entry | A | 避免重复输入 |
| 3.3.8 | Accessible Authentication (Minimum) | AA | 认知功能测试不是唯一认证方式 |
| 3.3.9 | Accessible Authentication (Enhanced) | AAA | 增强版无障碍认证 |

**实施优先级建议**：Phase 1（目标尺寸、冗余输入、一致帮助）→ Phase 2（无障碍认证、拖拽替代）→ Phase 3（焦点可见性）→ Phase 4（AAA可选）[^142^]

### 2.2 全球法律合规框架

#### 美国：ADA与Section 508

- **ADA Title II**：2024年4月DOJ最终规则要求州和地方政府网站满足WCAG 2.1 Level AA [^141^][^145^]
- **Section 508**：联邦法律要求联邦机构及其承包商的信息通信技术（ICT）必须无障碍。2025年引用WCAG 2.1/2.2标准 [^156^]
- **VPAT/ACR**：Voluntary Product Accessibility Template是报告Section 508合规性的标准化文档 [^148^]
- **诉讼趋势**：2025年联邦网站无障碍诉讼达3,117起，增长27% [^252^][^253^]

#### 欧洲：EAA（European Accessibility Act）

- **生效日期**：2025年6月28日全面生效 [^151^][^155^]
- **技术标准**：基于EN 301 549，该标准 closely based on WCAG 2.1 Level AA [^155^][^157^]
- **适用范围**：电子商务、银行服务、电信、交通预订、电子书、操作系统等 [^151^]
- **处罚**：德国最高可达100,000欧元，其他成员国最高200,000欧元 [^151^][^144^]
- **B2B适用**：同时适用于B2C和B2B数字服务 [^157^]
- **过渡期**：2025年6月前已存在的产品和服务可使用至2030年，但所有新产品/服务必须立即合规 [^153^]

#### 日本

- **障害者差別解消法**：2024年改正施行，民间企业也需提供合理 consideration [^147^]
- **技术标准**：JIS X 8341-3:2016（基于WCAG 2.0）[^147^]

#### 英国

- **Equality Act 2010**：服务提供者有合理调整义务 [^147^]
- **技术标准**：WCAG 2.1 Level AA（实务标准）[^147^]

#### 中国

- **《无障碍环境建设法》**：2023年9月1日起施行，要求公共服务网站和应用程序符合无障碍标准
- **技术标准**：参考WCAG 2.0/2.1，结合国内实际情况制定

**全球合规策略建议**：以WCAG 2.2 Level AA为目标可横向满足多国法律要求 [^147^][^151^]

### 2.3 WCAG四大POUR原则

| 原则 | 含义 | 组件库实践要点 |
|------|------|--------------|
| **Perceivable**（可感知） | 信息必须以所有用户可感知的方式呈现 | 替代文本、颜色对比度、字幕 |
| **Operable**（可操作） | 界面组件必须可通过多种输入方式操作 | 键盘导航、焦点管理、触摸目标尺寸 |
| **Understandable**（可理解） | 内容和操作必须清晰可理解 | 清晰语言、一致导航、帮助性错误信息 |
| **Robust**（健壮） | 内容必须足够健壮以与各种技术可靠工作 | 语义HTML、正确的ARIA实现 [^151^][^144^] |

---

## 3. WAI-ARIA 最佳实践

### 3.1 ARIA使用原则

**第一条规则：优先使用语义化HTML，而非ARIA**。Radix UI官方文档强调："WAI-ARIA为未使用浏览器内置元素构建的控件提供语义。例如，如果用`div`而非`button`创建按钮，需要添加属性让屏幕阅读器知道这是按钮" [^169^]。

#### 核心原则

1. **正确使用语义HTML**：优先使用`<button>`、`<nav>`、`<header>`等原生元素 [^131^]
2. **避免ARIA过度使用**：错误的ARIA实现比不使用更糟 [^267^]。WebAIM发现使用ARIA的页面平均有57个错误，是无ARIA页面的两倍多 [^267^]
3. **ARIA只补HTML之缺**：当语义HTML无法传达所需上下文时才使用ARIA [^131^]

### 3.2 关键ARIA属性与模式

#### 状态通信

```jsx
// 可折叠面板示例
function FAQItem({ question, children }) {
  const [open, setOpen] = React.useState(false);
  const panelId = `faq-panel-${question.replace(/\s+/g, '-').toLowerCase()}`;
  
  return (
    <div>
      <button
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
      >
        {question}
      </button>
      {open && (
        <div id={panelId} role="region">
          {children}
        </div>
      )}
    </div>
  );
}
```

- `aria-expanded`：指示展开/折叠状态 [^131^]
- `aria-pressed`：用于切换按钮 [^131^]
- `aria-selected`：用于选项卡、列表框中的选中项 [^131^]
- `aria-checked`：用于复选框、单选按钮、切换开关 [^143^]
- `aria-disabled`：自定义控件的禁用状态（需自行阻止交互）[^131^]

#### 动态更新通知

- `aria-live="polite"`：非紧急更新，如表单错误 [^131^]
- `aria-live="assertive"`：紧急消息，谨慎使用 [^131^]
- `aria-atomic`、`aria-relevant`：控制更新粒度

#### 模态对话框必需属性

```jsx
// 推荐的模态框结构
<Modal
  isOpen={isOpen}
  contentLabel="用户设置"
  shouldCloseOnOverlayClick={true}
  onRequestClose={handleClose}
>
  <h2 id="modal-title">账户设置</h2>
  <div aria-live="polite" id="live-region"></div>
  <form onSubmit={handleSubmit}>
    {/* 表单内容 */}
  </form>
</Modal>
```

- `role="dialog"`：告知屏幕阅读器这是对话框窗口 [^161^]
- `aria-modal="true"`：指示背景内容不活跃 [^161^][^164^]
- `aria-labelledby`：连接模态框到标题 [^161^][^164^]
- `aria-describedby`：提供模态框目的的额外上下文 [^161^]
- `contentLabel` / `aria-label`：为每个模态框提供可访问名称 [^139^]

### 3.3 WAI-ARIA Authoring Practices Guide (APG)

APG提供了60多个可访问UI组件的设计模式，包括 [^210^]：

- **手风琴**（Accordion）：按钮控制+heading内的按钮+aria标签
- **警告对话框**（Alert Dialog）：`role="alertdialog"` + `aria-modal="true"`
- **面包屑**（Breadcrumb）：nav标签+ARIA标签
- **组合框**（Combobox）：`role="combobox"` + 弹出菜单+完整键盘控制
- **对话框**（Dialog）：`role="dialog"` + `aria-modal="true"` + Escape关闭
- **标签页**（Tabs）：tablist容器+tab+tabpanel三部分结构
- **工具栏**（Toolbar）：`role="toolbar"` + 左右箭头导航
- **树形视图**（Tree View）：`role="tree"` + `role="treeitem"` + 展开/选中状态

#### 键盘交互标准模式

| 按键 | 行为 |
|------|------|
| Tab / Shift+Tab | 在组件/焦点区域间移动 |
| 方向键 | 在组件内部导航（菜单、列表、标签页）|
| Enter / Space | 激活按钮或选择项 |
| Escape | 关闭弹出框/对话框 |
| Home / End | 跳到列表首/尾 |
| Page Up / Page Down | 大范围移动（滑块、列表）[^210^] |

### 3.4 各组件库ARIA实现对比

| 组件库 | ARIA实现方式 | 特点 |
|--------|-------------|------|
| **Radix UI** | 内置完整WAI-ARIA支持 | 遵循WAI-ARIA Authoring Practices，测试覆盖VoiceOver/NVDA/JAWS [^169^] |
| **React Aria (Adobe)** | Hooks级别ARIA控制 | 30+语言i18n支持，13种日历系统，最国际化 [^191^][^269^] |
| **Ariakit** | 组件级内置 | 轻量级，键盘导航和屏幕阅读器兼容 [^16^] |
| **Chakra UI** | 内置角色和焦点样式 | 每个组件都有内置ARIA角色和焦点管理 [^14^][^179^] |
| **Mantine** | Hooks支持 | `useFocusTrap`等无障碍专用hooks [^14^] |
| **Base UI (MUI)** | v1.0 35个无障碍组件 | 由MUI团队长期维护，Radix UI的继任方向 [^194^] |

---

## 4. 键盘导航与焦点管理

### 4.1 键盘导航核心要求

**为什么重要**：27%的美国成年人有某种残疾，97.6%的屏幕阅读器用户依赖键盘 [^129^]。

#### 核心导航模式

- **Tab / Shift+Tab**：在可交互元素间移动焦点 [^129^][^131^]
- **方向键**：在复杂组件内部导航（菜单项、标签页、列表）[^129^]
- **Enter / Space**：激活按钮或选择项 [^129^]
- **Escape**：关闭模态框/弹出框 [^129^]
- **Home / End**：跳转到列表/菜单的首尾项

#### 焦点管理三原则

1. **焦点顺序与视觉顺序一致**：除非有意的逻辑流差异 [^136^]
2. **避免键盘陷阱**：始终提供退出方式（Tab/Shift+Tab/Escape）[^129^]
3. **焦点恢复**：模态框关闭后，焦点必须返回到触发元素 [^161^][^164^]

### 4.2 焦点陷阱（Focus Trap）

焦点陷阱是模态组件的关键无障碍需求，将键盘焦点限制在特定区域内。

#### 实现方式

**原生`<dialog>`元素（推荐）**：

```html
<dialog id="native-modal">
  <h2>确认操作</h2>
  <p>您确定要继续吗？</p>
  <button autofocus>是，继续</button>
  <button onclick="this.closest('dialog').close()">取消</button>
</dialog>

<script>
  document.getElementById('native-modal').showModal();
  // 自动处理焦点陷阱、Escape关闭、ARIA角色、::backdrop
</script>
```

使用`.showModal()`自动获得：焦点陷阱、Escape处理、正确ARIA语义、背景遮罩 [^161^]。

**React中的焦点陷阱实现**：

```jsx
// useFocusTrap Hook 示例（来自Gravity Forms）
const trapRef = useFocusTrap(isOpen, {
  tabScopingEnabled: true,
  ariaModal: true,
  ariaRoleType: 'dialog',
  focusSelector: '[data-autofocus]', // 指定初始焦点元素
});

return <div ref={trapRef}>{/* 模态内容 */}</div>;
```

关键实现细节 [^219^]：
- 激活时保存当前焦点位置（`markForFocusLater`）
- 将焦点移动到第一个可聚焦元素或指定元素
- 拦截Tab键实现焦点循环（`scopeTab`）
- 关闭时恢复焦点到触发元素（`returnFocus`）
- 设置`aria-modal="true"`和`role="dialog"`
- 使用`inert`属性或`aria-hidden`隐藏背景内容

#### 焦点可见性样式（WCAG 2.4.13）

```css
/* WCAG 2.2 AA 要求的焦点指示器 */
:focus-visible {
  outline: 3px solid #1a73e8;
  outline-offset: 2px;
  border-radius: 3px;
}
```

必须满足：3:1非文本对比度要求 [^161^][^142^]。**注意**：67%的网站明确移除了默认焦点轮廓，较2024年增长14% [^253^]。

### 4.3 shadcn/ui焦点管理实现

shadcn/ui基于Radix UI，自动处理以下焦点管理细节 [^164^]：

- 遮罩层打开时，焦点自动移动到第一个交互元素
- 遮罩层关闭时，焦点自动恢复到触发元素
- Tab在遮罩层内循环
- Esc键自动关闭遮罩层
- `aria-labelledby`自动关联DialogTitle
- `aria-describedby`自动关联DialogDescription

**常见问题**：动画开始时遮罩层可能未完全可见，导致焦点设置失败。解决方案是监听`animationend`事件后再设置焦点 [^164^]。

### 4.4 React Aria键盘快捷键

React Aria提供完整的键盘快捷键解决方案 [^158^]：

- `useKeyboard` Hook：统一处理键盘事件
- 全局应用快捷键：整个应用范围内响应
- 组件级快捷键：特定组件内部的行为
- 冲突处理：智能的快捷键冲突检测和解决机制

---

## 5. 屏幕阅读器测试

### 5.1 三大主流屏幕阅读器

| 屏幕阅读器 | 平台 | 启动快捷键 | 特点 |
|-----------|------|-----------|------|
| **NVDA** | Windows | Win+Ctrl+N | 免费开源，最广泛使用，测试标准 [^139^] |
| **VoiceOver** | macOS/iOS | Cmd+F5 (macOS) | 苹果设备内置，支持Rotor菜单 [^139^] |
| **JAWS** | Windows | 商业软件 | 市场占有率最高的商业屏幕阅读器 |

### 5.2 NVDA测试流程

#### 模态框测试步骤 [^139^]

| 测试操作 | 预期结果 |
|---------|---------|
| 点击"打开模态框"按钮 | NVDA宣布"用户表单对话框已打开" |
| 按Tab键导航 | 焦点在模态框内循环，不跳出到背景 |
| 按Escape键 | 模态框关闭，焦点返回触发按钮 |
| 点击背景遮罩 | 模态框应关闭 |

**常见问题排查**：Tab键能跳出模态框通常因为：未正确设置`setAppElement`、模态框内包含iframe、自定义组件未正确实现`tabindex` [^139^]。

### 5.3 VoiceOver测试流程

#### 基础操作 [^139^]

- macOS通过`Cmd+F5`启用VoiceOver
- 使用`Ctrl+Option+U`打开Rotor菜单
- 选择"Web Rotor" > "Headings"验证页面结构

#### iOS触摸导航测试

- 单指轻扫：在元素间导航
- 双指轻扫：滚动页面
- 双击：激活当前元素 [^139^]

### 5.4 屏幕阅读器测试清单

1. **所有内容可听**：屏幕阅读器能正确朗读所有内容
2. **正确角色识别**：按钮被识别为按钮，链接被识别为链接
3. **状态变化通知**：展开/折叠、选中/未选中状态正确宣布
4. **焦点不丢失**：焦点始终有明确位置
5. **表单标签正确**：每个输入字段都有关联标签
6. **错误信息可感知**：表单错误通过`aria-live`区域宣布
7. **无背景内容泄漏**：模态框打开时背景内容不被朗读 [^139^][^131^]

---

## 6. 自动化测试工具与流程

### 6.1 测试金字塔（无障碍版）

```
        /\\
       /  \\     人工审计（屏幕阅读器、键盘测试）
      / E2 \\    
     /------\\   Playwright/Cypress + axe-core
    /Component\\ jest-axe / vitest-axe
   /------------\\
  /   静态分析    \\  eslint-plugin-jsx-a11y
 /------------------\\
```

**目标**：在低层捕获尽可能多的问题，使人工审计可以专注于细微之处 [^132^]。

### 6.2 静态分析工具

#### eslint-plugin-jsx-a11y

最低投入的入门方式，在代码编译前捕获问题 [^138^]。

```bash
npm install --save-dev eslint-plugin-jsx-a11y
```

配置：
```json
{
  "extends": ["plugin:jsx-a11y/recommended"],
  "plugins": ["jsx-a11y"]
}
```

可捕获问题 [^132^][^138^]：
- `<img>`缺少`alt`属性
- 非交互元素上的点击事件缺少键盘支持
- 标签缺少`htmlFor`
- 无效的ARIA属性或角色
- 交互元素不可键盘访问

**推荐**：每个React项目都应默认安装 [^138^]。

### 6.3 组件级测试

#### jest-axe / vitest-axe

```javascript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('should not have accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

特别适用于复杂UI交互的组件 [^137^][^138^]。

#### @axe-core/react

开发时实时检查，结果输出到Chrome DevTools控制台：

```javascript
if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}
```

**注意**：不支持React 18+，Deque推荐使用axe Developer Hub [^133^]。

### 6.4 E2E测试集成

#### Playwright + @axe-core/playwright

```javascript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('check a11y', async ({ page }) => {
  await page.goto('http://localhost:8080');
  
  const accessibilityScanResults = await new AxeBuilder({
    page,
  }).analyze();
  
  expect(accessibilityScanResults.violations).toHaveLength(0);
});
```

可传递配置对象强制执行特定WCAG指南 [^138^]。

#### Cypress + cypress-axe

```javascript
it('page loads & no accessibility issues', () => {
  cy.visit('/');
  cy.injectAxe();
  cy.checkA11y();
});
```

### 6.5 Storybook无障碍测试

#### @storybook/addon-a11y

基于axe-core，添加无障碍审核标签页到Storybook [^138^]。

```bash
npm install --save-dev @storybook/addon-a11y
```

在Storybook配置中添加：
```javascript
module.exports = {
  addons: ['@storybook/addon-a11y'],
};
```

**与Playwright集成实现CI自动化** [^146^]：

```typescript
// .storybook/test-runner.ts
import type { TestRunnerConfig } from '@storybook/test-runner';
import { injectAxe, checkA11y } from 'axe-playwright';

const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page) {
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
  },
};

export default config;
```

运行`npx test-storybook`时自动检查无障碍违规 [^146^]。

#### Chromatic无障碍回归测试

Chromatic提供无障碍回归测试，使用axe-core检测PR中的新违规 [^152^]：
- 建立每个组件的基线
- 区分已有问题和新引入的问题
- 在PR中标记新违规
- 在组件快照中高亮问题DOM节点

### 6.6 其他自动化工具

| 工具 | 类型 | 特点 |
|------|------|------|
| **Lighthouse** | Chrome内置 | 性能+SEO+PWA+无障碍综合审计，比axe-core发现更少问题 [^138^] |
| **Pa11y** | CI工具 | 可配置`.pa11yci`文件，扫描多个URL [^137^] |
| **WAVE** | 浏览器扩展 | 可视化高亮无障碍问题 |
| **axe DevTools** | 浏览器扩展 | 800,000+安装，零误报承诺 [^130^] |

### 6.7 工具组合推荐

| 项目类型 | 推荐工具组合 |
|---------|-------------|
| 每个项目（最低要求） | `eslint-plugin-jsx-a11y` + Storybook a11y addon [^138^] |
| 单元/集成测试 | React Testing Library + `jest-axe`/`vitest-axe` [^138^] |
| E2E测试 | Playwright/Cypress + `@axe-core/playwright`/`cypress-axe` [^138^] |
| 部署预览 | Pa11y 或 Lighthouse CI [^138^] |
| 持续监控 | Chromatic 无障碍回归测试 [^152^] |

**关键认知**：自动化工具约捕获30-57%的WCAG问题 [^250^][^252^]，人工测试（键盘+屏幕阅读器）不可替代。

---

## 7. 组件级别无障碍实现最佳实践

### 7.1 组件库无障碍分层架构

```
Layer 3: 样式层 (shadcn/ui, Tailwind)     <- 可能破坏无障碍
Layer 2: 交互层 (Radix, Ariakit)          <- 焦点管理、键盘导航
Layer 1: 无障碍基础 (WAI-ARIA APG)        <- 角色、状态、属性
```

**关键洞察**：shadcn/ui的34/48个组件通过WCAG 2.2 AA，但**最常见的失败是焦点可见性**——Radix提供正确的焦点管理，shadcn的默认样式`focus-visible:ring-1 ring-ring/50`在大多数主题中无法达到3:1非文本对比度 [^180^]。

### 7.2 各组件库无障碍审计结果

#### shadcn/ui 详细审计（2026年4月）[^180^]

**34个通过组件**（开箱即用）：
- 布局导航：Accordion, Aspect Ratio, Breadcrumb, Card, Collapsible, Resizable, Scroll Area, Separator, Sheet, Sidebar
- 表单基础：Checkbox, Form, Input OTP, Label, Radio Group, Select, Switch, Textarea, Toggle, Toggle Group
- 反馈：Alert, Dialog, Popover, Progress, Skeleton, Sonner (Toast), Tooltip
- 展示：Avatar, Badge, Calendar, Hover Card, Pagination, Table, Tabs

**9个需要小修复**：
1. Button — 焦点环对比度（2.4:1 < 3:1）
2. Input — placeholder对比度不足
3. Slider — 未暴露`step` prop
4. Date Picker — 月份/年份导航按钮触摸目标太小
5. Menubar — 子菜单触发器未宣布展开状态
6. Drawer (Vaul) — 关闭后焦点不总是返回

**修复示例**（Button焦点环）[^180^]：
```tsx
// 修复前
"focus-visible:ring-ring/50 focus-visible:ring-[3px]"

// 修复后 — 通过3:1对比度
"focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
```

### 7.3 关键组件实现模式

#### 模态对话框（Dialog/Modal）

必需实现 [^161^][^164^][^175^]：
1. `role="dialog"` + `aria-modal="true"`
2. `aria-labelledby`关联标题
3. 焦点陷阱 — Tab在模态框内循环
4. Escape关闭
5. 关闭后焦点返回触发元素
6. 背景内容通过`inert`属性禁用
7. 初始焦点移动到第一个交互元素或`autoFocus`指定元素
8. 触摸目标最小24x24px（WCAG 2.5.8）

#### 手风琴（Accordion）

```jsx
// Radix/shadcn Accordion 已自动处理
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>标题</AccordionTrigger>
    <AccordionContent>内容</AccordionContent>
  </AccordionItem>
</Accordion>
```

自动提供：`aria-expanded`、`aria-controls`、Enter/Space展开、方向键导航 [^210^]。

#### 标签页（Tabs）

```jsx
<Tabs defaultValue="account">
  <TabsList aria-label="导航">
    <TabsTrigger value="account">账户</TabsTrigger>
    <TabsTrigger value="password">密码</TabsTrigger>
  </TabsList>
  <TabsContent value="account">账户设置内容</TabsContent>
  <TabsContent value="password">密码设置内容</TabsContent>
</Tabs>
```

WAI-ARIA要求 [^210^]：`role="tablist"`容器 + `role="tab"` + `role="tabpanel"` + 方向键切换 + `aria-selected`。

#### 下拉菜单（Dropdown Menu）

```jsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>打开菜单</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>选项1</DropdownMenuItem>
    <DropdownMenuItem>选项2</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

键盘交互 [^197^]：方向键导航菜单项、Enter/Space选择、Escape关闭、Home/End跳转到首/尾项。

#### 表单组件

```jsx
// Flowbite React表单可访问性示例
<TextInput
  error
  helperText="请输入有效的电子邮件地址"
  aria-describedby="email-error"
/>
```

关键点 [^143^]：
- 每个输入字段有关联标签（不是仅靠placeholder）
- 错误信息通过`aria-describedby`关联
- 使用`aria-invalid="true"`标记无效字段
- 错误消息通过`aria-live`区域宣布

### 7.4 颜色对比度

| 文本类型 | WCAG AA要求 | WCAG AAA要求 |
|---------|------------|-------------|
| 正常文本（<18pt） | 4.5:1 | 7:1 |
| 大号文本（>=18pt bold / >=24pt） | 3:1 | 4.5:1 |
| UI组件/图形 | 3:1 | - |

**现状**：83.9%的首页存在低对比度文本问题，是最常见的无障碍失败 [^261^]。

### 7.5 触摸目标尺寸

- WCAG 2.2要求最小24x24 CSS像素（SC 2.5.8 Target Size Minimum）[^142^]
- 推荐移动端44x44px（Apple Human Interface Guidelines）
- 仅当目标间距足够或有等价替代方式时可豁免

### 7.6 减少动画偏好

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

shadcn/ui使用`motion-safe:`和`motion-reduce:`工具类 [^188^][^197^]。

---

## 8. 自研组件库无障碍检查清单

### 8.1 基础检查项（所有组件）

- [ ] 使用语义化HTML元素（`<button>`而非`<div role="button">`）
- [ ] 所有交互元素可通过键盘访问
- [ ] 焦点顺序逻辑且可见
- [ ] 焦点指示器满足3:1对比度（WCAG 2.4.7/2.4.13）
- [ ] 安装并配置`eslint-plugin-jsx-a11y`
- [ ] 文本与背景对比度>=4.5:1（AA）或7:1（AAA）
- [ ] 触摸目标>=24x24px
- [ ] 尊重`prefers-reduced-motion`偏好
- [ ] 文档声明`lang`属性

### 8.2 交互组件检查项

#### 模态框/对话框
- [ ] `role="dialog"` + `aria-modal="true"`
- [ ] `aria-labelledby`关联标题
- [ ] 焦点陷阱实现
- [ ] Escape关闭
- [ ] 关闭后焦点返回触发元素
- [ ] 背景内容`inert`或`aria-hidden="true"`

#### 手风琴
- [ ] 按钮在heading内
- [ ] `aria-expanded`反映状态
- [ ] `aria-controls`关联面板
- [ ] Enter/Space展开折叠

#### 标签页
- [ ] `role="tablist"` / `role="tab"` / `role="tabpanel"`
- [ ] `aria-selected`指示活动标签
- [ ] 方向键切换标签
- [ ] Tab键进入标签面板

#### 下拉菜单
- [ ] `role="menu"` / `role="menuitem"`
- [ ] 方向键导航
- [ ] Enter/Space选择
- [ ] Escape关闭并返回焦点

#### 表单
- [ ] 每个`<input>`有`<label>`（`htmlFor`关联）
- [ ] 错误信息通过`aria-describedby`关联
- [ ] `aria-invalid="true"`标记无效
- [ ] `aria-live`区域宣布动态更新
- [ ] placeholder不作为唯一标签

#### 按钮
- [ ] 清晰的可访问名称（不是"点击这里"）
- [ ] 图标按钮有`aria-label`
- [ ] 切换按钮使用`aria-pressed`

#### 表格
- [ ] `<th>`有`scope="col"`或`scope="row"`
- [ ] 复杂表格使用`headers`属性
- [ ] 可排序列有`aria-sort`

### 8.3 测试检查项

- [ ] 仅使用键盘完成所有交互流程
- [ ] NVDA/VoiceOver测试核心组件
- [ ] `jest-axe`单元测试覆盖关键组件
- [ ] Playwright + axe-core E2E测试覆盖关键用户流程
- [ ] Storybook `@storybook/addon-a11y`配置
- [ ] CI中集成无障碍检查（失败阻断构建）
- [ ] 定期手动审计（每季度）

### 8.4 开发流程集成

```
1. 编码阶段：eslint-plugin-jsx-a11y实时检查
2. 组件开发：Storybook a11y addon可视化检查
3. 单元测试：jest-axe自动化断言
4. PR审查：Chromatic无障碍回归测试
5. E2E测试：Playwright + axe-core
6. 部署前：Lighthouse无障碍审计
7. 定期：人工屏幕阅读器测试
```

---

## 9. 主要参与者与来源

### 权威标准组织
- **W3C WAI**：WCAG和WAI-ARIA标准的制定者 [^169^]
- **WebAIM**：年度Million报告，可访问性教育资源 [^214^][^261^]
- **Deque**：axe-core开发维护者，无障碍测试行业标准 [^130^]

### 领先的组件库
- **Radix UI**：WAI-ARIA合规的行业标杆，shadcn/ui的基础 [^169^][^160^]
- **Base UI (MUI)**：Radix的精神继承者，35个生产级无障碍组件 [^194^]
- **React Aria (Adobe)**：国际化无障碍最强，30+语言 [^191^][^269^]
- **Ariakit**：轻量级无障碍组件库 [^16^]
- **Chakra UI**：内置无障碍的完整组件库 [^179^]
- **Mantine**：提供`useFocusTrap`等无障碍专用hooks [^14^]

### 测试工具生态
- **axe-core**：40亿+下载，7.2k GitHub stars [^130^][^134^]
- **eslint-plugin-jsx-a11y**：React项目标配 [^138^]
- **jest-axe / vitest-axe**：组件级无障碍测试 [^137^]
- **@axe-core/playwright**：E2E无障碍测试 [^138^]
- **@storybook/addon-a11y**：组件开发时实时检查 [^138^][^146^]
- **Chromatic**：无障碍回归测试 [^152^]

### 法律合规资源
- **W3C WAI**：WCAG标准官方文档
- **European Commission**：EAA官方指南
- **DOJ**：ADA Title II最终规则 [^141^]
- **Section 508**：美国无障碍标准 [^156^]

---

## 10. 趋势与信号

### 上升趋势

1. **WCAG 2.2成为ISO标准**（ISO/IEC 40500:2025）：2025年10月批准，增加国际法律分量 [^141^]
2. **EAA强制执行**：2025年6月28日起无过渡期，市场监督开始 [^151^]
3. **ARIA使用激增**：ARIA代码量一年增长27%，是2019年的6倍以上 [^253^]——但错误实现反而加剧问题
4. **Headless/Primitive库崛起**：Radix、Base UI、React Aria等将无障碍作为核心卖点
5. **AI辅助无障碍测试**：Deque推出AI驱动的axe DevTools [^130^]
6. **shadcn/ui成为事实标准**：70k+ GitHub stars，Vercel/Linear/OpenAI使用，但自定义时可能破坏无障碍 [^180^]

### 警示信号

1. **无障碍状况在恶化**：2026年95.9%失败率（vs 2025年94.8%），六年改善趋势逆转 [^261^]
2. **页面复杂度飙升**：2026年平均1,437个元素/页面，一年增长22.5% [^261^]
3. **焦点指示器被大量移除**：67%网站明确移除默认焦点轮廓 [^253^]
4. **ARIA误用**：使用ARIA的页面错误数是无ARIA页面的两倍 [^267^]
5. **组件库样式层破坏无障碍**：shadcn默认主题焦点环不满足3:1对比度 [^180^]

### 未来方向

1. **从合规转向包容**：超越WCAG最低要求，关注真实用户体验
2. **自动化程度提升**：AI辅助检测和修复
3. **设计阶段无障碍**：Figma等设计工具集成无障碍检查
4. **法规持续收紧**：更多国家/地区立法

---

## 11. 争议与冲突观点

### 争议1：ARIA是好是坏？

- **正方**：ARIA填补HTML语义空白，使自定义组件可访问 [^169^]
- **反方**：WebAIM数据显示ARIA误用导致错误翻倍，"不使用ARIA比错误使用ARIA更好" [^267^]
- **共识**：优先语义HTML，ARIA作为补充，需要专家审核

### 争议2：自动化测试vs人工测试

- **自动化派**：axe-core 40亿+下载，零误报，可集成CI [^130^]
- **人工派**：自动化仅捕获~57%问题，键盘逻辑、屏幕阅读器体验无法自动化 [^250^]
- **共识**：分层测试——自动化为基线，人工为必须

### 争议3：组件库"开箱即用"可访问性的真实程度

- **厂商宣称**："无障碍默认"、"WAI-ARIA合规" [^169^][^179^]
- **审计现实**：shadcn/ui 34/48通过（71%），14个组件有问题 [^180^]
- **核心问题**：样式层（shadcn的Tailwind主题）可能破坏交互层（Radix）的无障碍特性
- **建议**：不要信任"开箱即用"声明，仍需独立审计

### 争议4：Headless vs Styled组件库

- **Headless（Radix/Ariakit）**：完整控制样式，无障碍行为内置 [^160^][^16^]
- **Styled（MUI/Chakra）**：更快开发，但可能难以覆盖默认样式
- **中间路线（shadcn/ui）**：源码在自己手中，可自行修复，但需要维护

### 争议5：EAA对小企业的影响

- **宽松观点**：微型企业（<10员工，<200万欧元营收）有豁免 [^157^]
- **严格观点**：无豁免，所有面向消费者的数字服务都必须合规 [^151^]
- **现实**：各国执法力度不一，但趋势是全面覆盖

---

## 12. 推荐深入调研方向

1. **Radix UI vs Base UI无障碍实现深度对比**：Base UI作为Radix的继任者，具体改进了哪些无障碍特性
2. **React Aria hooks无障碍API详细分析**：useButton、useDialog、useListBox等hooks的具体实现模式 [^269^]
3. **中国《无障碍环境建设法》对Web组件的具体要求**：国内法规与WCAG的对标关系
4. **AI辅助无障碍测试工具发展**：Deque AI工具、自动修复等前沿进展
5. **移动端无障碍特殊性**：触摸目标、屏幕阅读器手势、移动端键盘的特殊考量
6. **组件库无障碍性能权衡**：无障碍DOM（aria-live、inert等）对性能的影响
7. **设计系统级别的无障碍策略**：从Figma设计到代码实现的全链路无障碍保障
8. **shadcn/ui自定义时的无障碍风险**：哪些修改安全，哪些会破坏Radix的无障碍特性 [^178^]

---

## 参考文献索引

| 引用 | 来源 | 日期 |
|------|------|------|
| [^14^] | makersden.io - React UI libraries 2025 comparison | 2025-09 |
| [^16^] | Slashdot - Ariakit vs Radix UI comparison | 2025 |
| [^129^] | UXPin - Keyboard Navigation Patterns for Complex Widgets | 2026-06 |
| [^130^] | Deque - Axe DevTools | 2026-06 |
| [^131^] | UXPin - React Components for Screen Reader Accessibility | 2026-05 |
| [^132^] | rishikc.com - Automated Accessibility Testing with axe-core | 2026-04 |
| [^133^] | npm - @axe-core/react | 2026-04 |
| [^134^] | open-awesome.com - axe-core | 2026-06 |
| [^137^] | leadwithskills.com - axe-core and Pa11y | 2025-12 |
| [^138^] | howtotestfrontend.com - Automated Accessibility Testing | 2025-11 |
| [^139^] | CSDN - React-Modal屏幕阅读器测试 | 2025-11 |
| [^141^] | adaquickscan.com - WCAG 2.2 ISO Standard 2025 | 2026-02 |
| [^142^] | allaccessible.org - WCAG 2.2 Complete Guide | 2025-11 |
| [^143^] | CSDN - Flowbite React无障碍访问最佳实践 | 2026-04 |
| [^144^] | coaxsoft.com - Guide to EAA 2025 Compliance | 2026-05 |
| [^145^] | aiopsgroup.com - Digital accessibility compliance | 2026-05 |
| [^146^] | stevekinney.com - Accessibility Testing in Storybook | 2026-03 |
| [^147^] | GitHub (tomokusaba/zenn) - Web accessibility regulations | 2026-02 |
| [^148^] | datagainconnect.com - ADA Section 508 Guide | 2026-05 |
| [^151^] | senorit.de - Web Accessibility 2025 EAA Guide | 2025-12 |
| [^152^] | Chromatic - Accessibility Regression Testing | 2025-11 |
| [^153^] | alisoueidan.com - EAA Compliance & Testing Tools | 2025-10 |
| [^155^] | signicat.com - EAA 2025 B2B Guide | 2026-01 |
| [^156^] | adacompliancepros.com - Section 508 Compliance 2025 | 2025-10 |
| [^157^] | allaccessible.org - EAA Complete Compliance Guide | 2025-11 |
| [^158^] | CSDN - React Aria键盘快捷键 | 2025-09 |
| [^160^] | cssauthor.com - Best React UI Component Libraries 2025 | 2026-06 |
| [^161^] | UXPin - How to Build Accessible Modals with Focus Traps | 2026-04 |
| [^162^] | LogRocket - Headless UI alternatives comparison | 2026-03 |
| [^163^] | equalizedigital.com - Accessibility Testing Checklist | 2026-03 |
| [^164^] | eastondev.com - Dialog/Sheet/Popover Accessibility | 2026-05 |
| [^169^] | radix-ui.com - Accessibility documentation | - |
| [^178^] | eastondev.com - shadcn/ui and Radix Accessibility | 2026-06 |
| [^179^] | daily.dev - Chakra UI Design Patterns | 2026-05 |
| [^180^] | thefrontkit.com - shadcn/ui Accessibility Audit 2026 | 2026-04 |
| [^186^] | 掘金 - Radix vs ShadCN vs Headless UI 深度对比 | 2025-07 |
| [^191^] | certificates.dev - shadcn/ui, Radix, Base UI Explained | 2025-12 |
| [^194^] | InfoQ - MUI Releases Base UI 1 | 2026-02 |
| [^196^] | starterpick.com - shadcn/ui vs Radix vs Headless UI 2026 | 2026-03 |
| [^210^] | elementor.com - APG Examples & Rules 2025 | 2025-11 |
| [^214^] | webaim.org - WebAIM Million 2025 | 2025-03 |
| [^219^] | docs.js.gravity.com - useFocusTrap source code | - |
| [^250^] | digitalapplied.com - WCAG 2.2 Audit Checklist 2026 | 2026-05 |
| [^252^] | crosscheck.cloud - Why 95.9% Websites Fail Accessibility | 2026-05 |
| [^253^] | sqmagazine.co.uk - Web Design Statistics 2026 | 2026-05 |
| [^261^] | webaim.org - WebAIM Million 2026 | 2026-03 |
| [^267^] | vervali.com - Accessibility Testing Services 2026 | 2026-03 |
| [^269^] | lobehub.com - accessibility Skill (React Aria) | 2026-03 |

---

> **报告生成时间**：2025年7月
> **调研覆盖**：12次独立搜索，中英文信息源，涵盖WCAG标准、ARIA实践、键盘导航、屏幕阅读器测试、自动化工具、法律合规6大维度
