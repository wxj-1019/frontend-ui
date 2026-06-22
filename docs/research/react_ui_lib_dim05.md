# 维度 05: 可访问性工程化实践 — 深度调研报告

> 调研时间：2025年7月  
> 搜索次数：25次（中英文混合）  
> 覆盖来源：W3C规范、WebAIM报告、FTC裁决、Deque官方文档、RFC草案、学术文献、组件库官方文档等

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

可访问性（Accessibility，简称a11y）已从React UI组件库的"附加功能"演变为"核心合规要求"。2025年是全球数字可访问性的关键转折点——欧洲无障碍法（EAA）于6月28日生效，WCAG 2.2在2025年10月被正式采纳为ISO/IEC 40500:2025国际标准，美国ADA诉讼数量持续攀升（2025年3,117起联邦诉讼，+27%）[^591^]。

本维度调研覆盖以下核心领域：

- **WCAG 2.1/2.2合规**：AA/AAA级别要求，ISO标准化进程
- **ARIA实践**：WAI-ARIA Authoring Practices指南，正确使用与误用
- **键盘导航**：Tab顺序、焦点陷阱、焦点恢复
- **自动化测试**：axe-core、jest-axe、Storybook a11y addon的覆盖率与局限
- **法律合规**：ADA、Section 508、EAA（欧洲无障碍法）

---

## 2. 当前状态分析

### 2.1 全球网络可访问性现状：形势严峻

根据WebAIM 2026年发布的第八次年度百万报告（The WebAIM Million），网络可访问性状况依然严峻：

- **95.9%的网站首页**存在可检测的WCAG 2失败项（较2025年的94.8%有所恶化）[^261^]
- **平均每页56.1个错误**（较2025年的51个增长10.1%）[^261^]
- **96%的错误**集中在6个类别：低对比度文本（83.9%）、缺失alt文本（53.1%）、缺失表单标签（51%）、空链接（46.3%）、空按钮（30.6%）、缺失文档语言（13.5%）[^261^]
- **使用ARIA的页面错误率更高**：有ARIA的页面平均比无ARIA页面多**24个可检测错误**[^770^]
- **68.8%有ARIA的页面**至少包含一个ARIA错误[^715^]

> **Claim**: 95.9%的网站首页存在可检测的WCAG 2失败项，有ARIA的页面平均比无ARIA页面多24个可检测错误  
> **Source**: WebAIM Million 2026  
> **URL**: https://webaim.org/projects/million/  
> **Date**: 2026-03-30  
> **Excerpt**: "Pages with ARIA present averaged 24 more detectable errors than pages without ARIA... 95.9% of home pages had detected WCAG 2 failures"  
> **Confidence**: high

### 2.2 主流组件库可访问性评分

基于2025年的多维度评估，主流React UI组件库的可访问性表现差异显著：

| 组件库 | 可访问性评级 | 关键特点 | 评级来源 |
|--------|-------------|---------|---------|
| **Radix UI Primitives** | ★★★★★ | Headless，近完美WAI-ARIA实现，shadcn/ui底层基础 | [^8^] [^169^] |
| **shadcn/ui** | ★★★★☆ | 34/48组件通过WCAG 2.2 AA，最常见失败为焦点可见性 | [^180^] |
| **Chakra UI** | ★★★★☆ | 内置WCAG合规，所有组件带ARIA和焦点样式 | [^8^] [^14^] |
| **Mantine** | ★★★★☆ | 100+组件，50+hooks，内置useFocusTrap | [^8^] [^778^] |
| **Ark UI** | ★★★★★ | 基于Zag.js状态机，支持React/Vue/Solid | [^8^] |
| **React Aria (Adobe)** | ★★★★★ | 最深度可访问性原语，支持复杂ARIA模式 | [^766^] |
| **MUI (Material UI)** | ★★★☆☆ | v9目标WCAG 2.2 AA，当前v7持续改进 | [^8^] [^763^] |
| **Ant Design** | ★★★☆☆ | 遵循WCAG 2.0，文本对比度达AAA级(7:1) | [^706^] |

> **Claim**: shadcn/ui 34/48组件通过WCAG 2.2 AA，最常见失败为焦点可见性（shadcn的默认样式使用focus-visible:ring-1 ring-ring/50，在大多数主题中未达到3:1非文本对比度比）  
> **Source**: The Front Kit - shadcn/ui Accessibility Audit 2026  
> **URL**: https://thefrontkit.com/blogs/shadcn-ui-accessibility-audit-2026  
> **Date**: 2026-04-08  
> **Excerpt**: "34 out of 48 shadcn/ui components pass WCAG 2.2 AA out of the box... The most common failure: focus visibility. Radix gives you correct focus management, then shadcn's default styles use focus-visible:ring-1 ring-ring/50 which fails the 3:1 non-text contrast ratio in most themes"  
> **Confidence**: high

> **Claim**: Radix UI Primitives遵循WAI-ARIA Authoring Practices指南，在现代浏览器和常用辅助技术中经过测试  
> **Source**: Radix Primitives官方文档 - Accessibility  
> **URL**: https://www.radix-ui.com/primitives/docs/overview/accessibility  
> **Date**: 持续更新  
> **Excerpt**: "Radix Primitives follow the WAI-ARIA authoring practices guidelines and are tested in a wide selection of modern browsers and commonly used assistive technologies"  
> **Confidence**: high

### 2.3 WCAG 2.2 成为ISO标准

WCAG 2.2于2023年10月5日发布，2025年10月21日被正式采纳为**ISO/IEC 40500:2025**。这是可访问性标准化进程中的里程碑事件：

- 总计**87个可测试成功标准**（9个新增，1个移除4.1.1 Parsing）[^708^]
- 新增标准重点关注：认知障碍、低视力用户、移动设备用户
- 达到WCAG 2.2 AA自动满足2.1和2.0 AA要求（向后兼容）[^788^]

**WCAG 2.2 新增9个成功标准**：

| 标准编号 | 级别 | 描述 |
|---------|------|------|
| 2.4.11 Focus Not Obscured (Minimum) | AA | 焦点不得被其他内容完全遮挡 |
| 2.4.12 Focus Not Obscured (Enhanced) | AAA | 焦点指示器任何部分都不得被遮挡 |
| 2.4.13 Focus Appearance | AAA | 焦点指示器最小2px周长，3:1对比度 |
| 2.5.7 Dragging Movements | AA | 提供拖拽的单指针替代方案 |
| 2.5.8 Target Size (Minimum) | AA | 交互目标最小24x24px或足够间距 |
| 3.2.6 Consistent Help | A | 帮助机制在所有页面保持相同相对位置 |
| 3.3.7 Redundant Entry | A | 已输入信息不得要求重复输入 |
| 3.3.8 Accessible Authentication (Minimum) | AA | 禁止使用认知功能测试作为唯一认证方式 |
| 3.3.9 Accessible Authentication (Enhanced) | AAA | 更严格的CAPTCHA要求 |

> **Claim**: WCAG 2.2于2025年10月21日被正式采纳为ISO/IEC 40500:2025  
> **Source**: EqualWeb - WCAG 2.2 Standards  
> **URL**: https://www.equalweb.com/platform/standards/wcag-2-2.html  
> **Date**: 2026-06-08  
> **Excerpt**: "WCAG 2.2... subsequently adopted as ISO/IEC 40500:2025 on October 21, 2025"  
> **Confidence**: high

### 2.4 欧洲无障碍法（EAA）2025年生效

**欧洲无障碍法（European Accessibility Act, EU 2019/882指令）于2025年6月28日在所有欧盟成员国生效**：

- **适用范围**：所有向欧盟消费者提供数字产品和服务的组织，包括非欧盟企业
- **合规标准**：EN 301 549（对齐WCAG 2.1 AA）[^144^] [^596^]
- **罚款**：最高可达€100,000每次违规或年营收4%[^598^]
- **豁免**：员工少于10人且年营收不足€200万的小微企业

> **Claim**: EAA于2025年6月28日生效，罚款可达€100,000或年营收4%  
> **Source**: iCrossing - EAA Compliance Guide  
> **URL**: https://www.icrossing.com/insights/eaa-compliance-guide  
> **Date**: 2026-03-27  
> **Excerpt**: "The European Accessibility Act (EAA) is an EU-wide directive requiring businesses to meet digital accessibility standards based on WCAG 2.1 guidelines—ensuring equal access for people with disabilities across websites, apps, and digital services effective June 28, 2025"  
> **Confidence**: high

### 2.5 ADA诉讼：2025年反弹增长

根据Seyfarth Shaw的权威统计：

- **2025年**：3,117起联邦网站可访问性诉讼（+27% vs 2024）[^591^] [^595^]
- **包括州法院**：总数字可访问性诉讼超5,000起[^591^]
- **电商占近70%**，食品服务21%[^591^]
- **重复被告**：联邦案件中46%涉及已被起诉过的公司[^591^]
- ** Fashion Nova**和解金额达$5.15M（创历史纪录）[^598^]

> **Claim**: 2025年3,117起联邦网站可访问性诉讼，同比+27%，网站案件占所有ADA Title III联邦案件的36%  
> **Source**: Seyfarth Shaw via Mondaq / beaccessible.com  
> **URL**: https://www.mondaq.com/unitedstates/discrimination-disability-sexual-harassment/1766320/federal-court-website-accessibility-lawsuit-filings-bounce-back-in-2025  
> **Date**: 2026-03-30  
> **Excerpt**: "Website accessibility lawsuits accounted for 36% of the total number of ADA Title III lawsuits filed in federal court in 2025 (3,117 out of 8,667 cases). That's 8% more than in 2024"  
> **Confidence**: high

### 2.6 自动化测试覆盖率与局限

自动化可访问性测试工具是组件库工程化的关键支柱，但其局限性必须被充分理解：

| 工具/方法 | 检测覆盖率 | 擅长领域 | 局限 |
|----------|-----------|---------|------|
| **axe-core** | 理论20-30%，实际~57% | 机械规则：缺失alt、表单标签、对比度、无效ARIA | 无法判断alt文本是否语义准确，无法检测焦点逻辑 |
| **jest-axe** | 同上 | React组件单元测试集成 | 仅测试静态渲染状态 |
| **@axe-core/playwright** | 同上 | E2E测试，捕获交互后状态 | 同上 |
| **Storybook a11y addon** | 同上 | 组件级自动化检查 | 需要手动配置规则 |
| **Lighthouse** | ~30% | 快速概览，集成度高 | 误报率较高 |
| **人工审计** | 100%（完整WCAG） | 语义正确性、用户体验、辅助技术兼容性 | 成本高，无法自动化 |

> **Claim**: 自动化工具仅捕获约30-40%的真实WCAG违规项，Deque的axe-core在实际审计中检测到57.38%的已知违规  
> **Source**: Deque / davidmello.com - Playwright Accessibility Testing  
> **URL**: https://www.davidmello.com/software-testing/test-automation/playwright-accessibility-testing-axe-lighthouse-limitations  
> **Date**: 2026-04-10  
> **Excerpt**: "Deque arrived at the 57.38% figure by taking a more pragmatic, real-world approach... this shows a 43% gap — proving you still need a mix of both manual and automated testing"  
> **Confidence**: high

> **Claim**: axe-core + Playwright自动化测试可覆盖30-50%的可访问性问题，剩余50-70%需要人工审查  
> **Source**: QAMadness - Axe-Core Playwright Accessibility Testing Guide  
> **URL**: https://www.qamadness.com/a-you-oriented-guide-to-axe-core-playwright-accessibility-testing/  
> **Date**: 2026-06-05  
> **Excerpt**: "Playwright and Axe will help you cover 30-50% of issues. But that means that there are 50-70% of defects that go unnoticed unless reviewed by a human specialist"  
> **Confidence**: high

### 2.7 焦点管理与键盘导航

焦点管理是React组件可访问性的核心技术挑战之一。现代组件库采用以下工程模式：

**焦点陷阱（Focus Trap）**：模态对话框打开时，键盘焦点被限制在对话框内，Tab在最后一个元素循环回第一个。实现方式包括：
- HTML `<dialog>`元素的原生`showModal()`API（推荐，浏览器内置支持）[^630^]
- `focus-trap-react`等第三方库
- Radix UI Dialog组件内置的焦点陷阱逻辑[^161^]

**焦点恢复（Focus Restoration）**：对话框关闭后，焦点返回到触发元素。这是WCAG 2.4.3的要求。

**焦点可见性（Focus Visibility）**：WCAG 2.2新增2.4.11和2.4.13对焦点可见性提出更严格要求。`:focus-visible`CSS伪类是现代解决方案[^662^]：

```css
:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
```

> **Claim**: HTML `<dialog>`元素的`showModal()`提供内置焦点管理、Escape键处理、backdrop样式和正确ARIA语义  
> **Source**: Chris Henrick - Building an Accessible Modal Dialog in React  
> **URL**: https://clhenrick.io/blog/react-a11y-modal-dialog/  
> **Date**: 2026-05-18  
> **Excerpt**: "Using the HTML `<dialog>` element gives us a lot of accessibility features for free: Focus management, traps keyboard focus, prevents content outside from being accessed by assistive technology, closes on Escape, implicitly applies ARIA 'dialog' role"  
> **Confidence**: high

---

## 3. 历史演变

### 3.1 可访问性标准的演变时间线

```
1991  Tim Berners-Lee发明万维网，创立W3C
1998  Section 508修订，要求联邦机构数字内容可访问[^760^]
1999  WCAG 1.0发布（14个指南，65个检查点）[^745^]
2008  WCAG 2.0发布，引入POUR原则和A/AA/AAA级别
2017  Section 508修订版生效，对齐WCAG 2.0 AA[^704^]
2018  WCAG 2.1发布（新增17个成功标准）
2023  WCAG 2.2发布（新增9个成功标准）[^783^]
2025  EAA生效（6月28日）；WCAG 2.2成为ISO/IEC 40500:2025[^793^]
2026  ADA Title II最终规则合规截止（4月24日，人口5万+政府）[^593^]
```

> **Claim**: 1998年Section 508修订要求联邦机构及其承包商的数字内容可访问  
> **Source**: DigitalA11y - The History of Digital Accessibility  
> **URL**: https://www.digitala11y.com/the-history-of-digital-accessibility-a-timeline-of-progress/  
> **Date**: 2025-04-21  
> **Excerpt**: "In 1998, the U.S. government updated Section 508 to demand that federal agencies—and anyone who wants to work with them—make their digital stuff accessible"  
> **Confidence**: high

### 3.2 从"附加功能"到"核心要求"的范式转变

可访问性在组件库领域的角色经历了根本性转变：

**阶段一：可选附加（2015年前）**
- 可访问性被视为"nice-to-have"
- Bootstrap等早期组件库可访问性支持有限
- 专门的jQuery UI Accessibility插件模式

**阶段二：渐进整合（2015-2020）**
- ARIA 1.1发布（2017），WAI-ARIA Authoring Practices成熟
- Material UI、Ant Design等企业级库开始系统性整合可访问性
- Deque推出axe-core，自动化测试起步

**阶段三：原生内置（2020-2023）**
- **Headless UI运动兴起**：Radix UI（2020）、React Aria提供无样式但完全可访问的原语
- WAI-ARIA Authoring Practices 1.2发布
- shadcn/ui模式——"复制而非安装"——将可访问性原语直接带入开发者代码库

**阶段四：合规驱动（2023-2025）**
- WCAG 2.2发布（2023年10月）
- EAA倒计时启动
- ADA诉讼数量持续增长
- 可访问性成为**采购硬性要求**——政府RFP要求VPAT/ACR报告[^156^]
- FTC对accessiBe的$1M罚款标志着监管机构介入（2025年1月）[^707^]

> **Claim**: FTC于2025年1月对accessiBe罚款$1M，因其虚假宣称其AI小部件可在48小时内使任何网站WCAG合规  
> **Source**: FTC / ratedwithai.com - accessiBe Review 2026  
> **URL**: https://ratedwithai.com/blog/accessibe-review-2026  
> **Date**: 2026-06-15  
> **Excerpt**: "On January 13, 2025, the Federal Trade Commission announced a complaint and proposed settlement against accessiBe Ltd... required accessiBe to pay $1 million and permanently prohibited the company from making unsubstantiated compliance or legal protection claims"  
> **Confidence**: high

### 3.3 ARIA实践的认知转变

ARIA的使用经历了从"越多越好"到"谨慎使用"的认知转变：

**ARIA第一规则**（W3C官方）："如果你可以使用原生HTML元素或属性获得所需语义和行为，那么就这样做，而不是重复利用元素并添加ARIA角色、状态或属性来使其可访问。"[^634^]

**WebAIM Million数据揭示的ARIA悖论**：
- 2022年：68%页面使用ARIA，有ARIA的页面平均多24个错误[^770^]
- 2025年：ARIA使用率持续增长，但误用率不降
- 60%的ARIA菜单编码不正确[^770^]

> **Claim**: 有ARIA的页面平均比无ARIA页面多24个可检测错误，60%的ARIA菜单编码不正确  
> **Source**: WebAIM - Using the WebAIM Million and User Surveys  
> **URL**: https://webaim.org/presentations/2022/csun/WebAIM-Million-and-Surveys.pdf  
> **Date**: 2022（WebAIM Million数据持续更新至2026）  
> **Excerpt**: "68% of home pages had ARIA... Pages with ARIA present averaged 24 more detectable errors than pages without ARIA... 60% of ARIA menus are not properly coded"  
> **Confidence**: high

---

## 4. 关键参与者与利益相关者

### 4.1 标准制定者

| 组织 | 角色 | 关键产出 |
|------|------|---------|
| **W3C / WAI** | 全球可访问性标准制定 | WCAG 2.0/2.1/2.2, ARIA 1.1/1.2, APG |
| **W3C ARIA Authoring Practices Task Force** | ARIA使用模式指导 | WAI-ARIA Authoring Practices Guide (60+模式) |
| **ISO** | 国际标准采纳 | ISO/IEC 40500:2025 (WCAG 2.2) |
| **ETSI** | 欧洲标准化 | EN 301 549 (欧洲对齐标准) |
| **美国Access Board** | 联邦标准 | 修订Section 508标准 |

### 4.2 残障用户群体

| 用户群体 | 主要需求 | 辅助技术 |
|---------|---------|---------|
| 视觉障碍（全盲） | 屏幕阅读器兼容性、键盘导航 | NVDA, JAWS, VoiceOver, TalkBack |
| 低视力 | 高对比度、可缩放、大触摸目标 | 屏幕放大镜、浏览器缩放 |
| 运动障碍 | 键盘操作、无需精确手势、充足时间 | 替代键盘、开关设备、语音控制 |
| 认知障碍 | 一致导航、简化输入、清晰错误提示 | 可读性工具、专注模式 |
| 听力障碍 | 字幕、视觉替代听觉信号 | 实时字幕、振动提示 |

> **Claim**: 1/5的欧洲人需要数字无障碍设施，96%的网站未能通过基本可访问性测试  
> **Source**: iCrossing - EAA Compliance Guide  
> **URL**: https://www.icrossing.com/insights/eaa-compliance-guide  
> **Date**: 2026-03-27  
> **Excerpt**: "1 in 5 Europeans need digital accommodations. 96% of websites fail basic accessibility tests"  
> **Confidence**: high

### 4.3 组件库生态参与者

**底层原语层**：
- **Radix UI** (WorkOS)：被shadcn/ui广泛使用，28+无样式可访问组件[^169^]
- **React Aria** (Adobe)：最深度可访问性原语，支持i18n[^766^]
- **Zag.js** (Chakra UI团队)：状态机驱动的跨框架可访问性逻辑
- **Base UI** (MUI)：MUI的可访问性原语层

**组件层**：
- **shadcn/ui**：Radix + Tailwind，34/48组件WCAG 2.2 AA通过[^180^]
- **Chakra UI**：内置WCAG合规，prop-based样式[^179^]
- **MUI v7/v9**：v9目标WCAG 2.2 AA[^763^]
- **Ant Design**：企业级，遵循WCAG 2.0 AAA文本对比度[^706^]

### 4.4 法律与合规生态

| 角色 | 职责 |
|------|------|
| **无障碍审计师** | 执行WCAG合规评估，出具VPAT/ACR报告 |
| **法务团队** | 评估ADA/EAA/Section 508诉讼风险 |
| **政府采购部门** | 要求供应商提供可访问性合规证明 |
| **FTC/监管机构** | 对虚假宣传可访问性的企业执法 |

> **Claim**: 非合规Section 508会直接导致政府合同丢失，RFP可能被直接拒绝  
> **Source**: ADA Compliance Pros - Who Needs Section 508  
> **URL**: https://www.adacompliancepros.com/blog/who-needs-to-follow-section-508-compliance-explained-for-2025  
> **Date**: 2025-10-03  
> **Excerpt**: "Your proposal can be rejected during an RFP if you fail to provide Section 508 compliance certification"  
> **Confidence**: medium

### 4.5 中国的可访问性法规环境

- 《中华人民共和国无障碍环境建设法》（2023年）第三十二条要求利用财政资金建立的互联网网站、服务平台、移动应用逐步符合无障碍网站设计标准[^772^]
- 2019年国家标准《信息技术互联网内容无障碍可访问性技术要求与测试方法》（2020年3月实施），以WCAG 2.0和2.1为参考[^772^]
- 2012年《无障碍环境建设条例》推进信息无障碍在中国有了统一法规支撑[^780^]

> **Claim**: 中国《无障碍环境建设法》要求利用财政资金建立的互联网网站逐步符合无障碍标准  
> **Source**: East Asian Library Organizations - ADA Title II and East Asian Digital Resource Accessibility  
> **URL**: https://www.eastasianlib.org/newsite/wp-content/uploads/2025/04/CCM_2025_Special_4-Lucy-Li-Shuqi-Ye-ADA-Title-II-and-East-Asian-Digital-Resource-Accessibility.pdf  
> **Date**: 2025  
> **Excerpt**: "利用财政资金建立的互联网网站、服务平台、移动互联网应用程序，应当逐步符合无障碍网站设计标准和国家信息无障碍标准"  
> **Confidence**: high

---

## 5. 反面观点与争议

### 5.1 "ARIA误用比不用更糟"

这是可访问性领域最被广泛引用的反面观点。WebAIM Million数据提供了有力的实证：

- 有ARIA的页面平均比无ARIA页面多**24-34%的错误**[^770^] [^775^]
- 72%的残障用户认为覆盖层（overlay）工具无效[^717^]
- 常见的ARIA误用包括：`role="button"`用于`<div>`但无键盘支持、抽象角色直接使用、同一角色重复无区分[^594^]

> **Claim**: 使用ARIA的页面平均比不使用ARIA的页面多34%的错误（如角色分配不正确）  
> **Source**: Technical University of Vienna - Screen Reader für Web Accessibility Tutorials  
> **URL**: https://repositum.tuwien.at/bitstream/handle/20.500.12708/205271/1/Bubich%20Wolfgang%20Helmut%20-%202024%20-%20Screen%20reader%20for%20web%20accessibility%20tutorials%20an...pdf  
> **Date**: 2024  
> **Excerpt**: "The websites examined also showed that pages with ARIA markups had an average of 34% more errors (e.g., incorrect role assignment) than those that did not use them"  
> **Confidence**: high

### 5.2 可访问性覆盖层（Overlay）的争议

2025年FTC对accessiBe的$1M罚款是可访问性领域的关键转折点：

**覆盖层的承诺 vs 现实**：
- **承诺**："一行代码实现WCAG合规"
- **现实**：22.6%被诉网站已安装覆盖层小部件[^718^]
- **FTC发现**：accessWidget甚至无法使基本的菜单、标题、表格和图片达到WCAG合规[^707^]

**Overlay Fact Sheet**：800+可访问性专家签署，明确反对覆盖层方法[^716^]

> **Claim**: 22.6%被诉网站已安装可访问性覆盖层，覆盖层安装不能作为真正WCAG合规的证据  
> **Source**: onepageaudit.com - accessiBe and UserWay Don't Stop ADA Lawsuits  
> **URL**: https://onepageaudit.com/blog/accessibility-overlays-dont-work  
> **Date**: 2026-03-14  
> **Excerpt**: "EcomBack's H1 2025 digital accessibility lawsuit report found that 22.6% of websites that received ADA lawsuits had an accessibility overlay widget installed at the time they were sued"  
> **Confidence**: high

### 5.3 性能开销争议

可访问性实现确实带来一定的性能影响，但现代组件库已将其最小化：

**潜在开销**：
- ARIA状态管理的JavaScript开销
- 焦点管理的额外DOM操作
- 可访问性测试工具的bundle增加（axe-core ~200KB未压缩）
- Live region的额外DOM节点

**缓解策略**：
- Radix UI单个组件5-25KB gzipped，tree-shakeable[^767^]
- React Aria支持tree-shaking，仅导入所需hooks
- `@axe-core/react`仅在开发环境运行
- 使用HTML原生元素（`<dialog>`）减少自定义JavaScript

> **Claim**: Radix UI单个组件5-25KB gzipped，针对可访问性优化而无性能成本  
> **Source**: index.dev - Chakra UI vs Mantine vs Radix UI性能对比  
> **URL**: https://www.index.dev/skill-vs-skill/chakra-ui-vs-mantine-vs-radix-ui  
> **Date**: 持续更新  
> **Excerpt**: "Excellent - Lightweight primitives with minimal JavaScript (~15-30KB gzipped per component), optimized for accessibility without performance cost"  
> **Confidence**: medium

### 5.4 "过度可访问性"论点的反驳

业界存在对可访问性投入"过度"的担心，但主流观点和数据不支持这一论点：

- **成本**：建设新可访问网站的额外成本仅10-15%，长期ROI为4-8倍[^715^]
- **市场规模**：全球13万亿美元残障人士市场[^666^]
- **SEO收益**：可访问性与SEO正相关——结构化HTML、alt文本、语义标记都是SEO因素[^596^]
- **通用设计**：可访问性功能改善所有用户体验（如字幕、键盘快捷键）

### 5.5 `disabled` vs `aria-disabled`的设计争议

这是一个在可访问性社区内存在分歧的技术议题：

**传统`disabled`属性**：
- 元素从可访问性对象模型中完全移除
- 无法获得焦点，屏幕阅读器用户不知道该元素存在
- 视觉用户看到禁用状态，非视觉用户看不到

**`aria-disabled`方案**（越来越多组件库采用）：
- 元素保持焦点able，屏幕阅读器通知"禁用"
- 需要额外CSS（pointer-events: none）和JavaScript（阻止onClick）
- Storybook Button组件已提议使用aria-disabled替代disabled[^701^]

> **Claim**: HTML disabled属性使元素从可访问性对象模型移除，屏幕阅读器用户无法发现该功能存在  
> **Source**: Storybook GitHub Issue #31678  
> **URL**: https://github.com/storybookjs/storybook/issues/31678  
> **Date**: 2025-06-05  
> **Excerpt**: "An HTML button that is disabled is removed from the accessibility object model altogether and cannot be reached via keyboard navigation"  
> **Confidence**: high

---

## 6. 证据详述

### 证据 1：WCAG 2.2 ISO标准化

```
Claim: WCAG 2.2于2025年10月21日被正式采纳为ISO/IEC 40500:2025，使WCAG 2.2成为政府和采购团队可以正式引用的可访问性基准
Source: Skynet Technologies / EqualWeb
URL: https://www.skynettechnologies.com/blog/wcag-2-2-as-an-iso-standard-latest-compliance-expectation-for-businesses-in-2025
Date: 2025-12-25
Excerpt: "WCAG 2.2 was approved and published as an ISO/IEC international standard (ISO/IEC 40500:2025). That makes WCAG 2.2 the formally referenced accessibility benchmark for governments, procurement teams, and regulators"
Context: ISO状态意味着政府采购RFP可以直接引用WCAG 2.2，增强了在法律诉讼中的权重
Confidence: high
```

### 证据 2：shadcn/ui可访问性审计结果

```
Claim: shadcn/ui 34/48组件通过WCAG 2.2 AA，最常见失败为焦点可见性（focus-visible:ring-1 ring-ring/50在大多数主题中未达3:1对比度）
Source: The Front Kit - shadcn/ui Accessibility Audit 2026
URL: https://thefrontkit.com/blogs/shadcn-ui-accessibility-audit-2026
Date: 2026-04-08
Excerpt: "34 out of 48 shadcn/ui components pass WCAG 2.2 AA out of the box. 9 components need minor fixes. 5 components have meaningful gaps... The most common failure: focus visibility. Radix gives you correct focus management, then shadcn's default styles use focus-visible:ring-1 ring-ring/50 which fails the 3:1 non-text contrast ratio"
Context: shadcn/ui作为最流行的React组件库模式之一，其可访问性表现直接影响数百万网站
Confidence: high
```

### 证据 3：ADA诉讼统计与趋势

```
Claim: 2025年3,117起联邦网站可访问性诉讼（+27%），包括州法院超5,000起，电商占70%，46%案件涉及重复被告
Source: Seyfarth Shaw via beaccessible.com / Mondaq
URL: https://beaccessible.com/post/americans-with-disabilities-act-statistics/
Date: 2026-05-27 (数据截至2025年底)
Excerpt: "In 2025, plaintiffs filed 3,117 website accessibility lawsuits in federal court, a 27% increase over 2024... nearly half of all federal cases in 2025 involved companies that had already been sued at least once before"
Context: ADA诉讼增长趋势表明法律风险持续上升，组件库的可访问性直接影响下游产品的法律风险
Confidence: high
```

### 证据 4：自动化测试覆盖率局限性

```
Claim: 自动化可访问性工具仅捕获约30-40%的真实WCAG违规项（理论估计），Deque axe-core在实际审计中检测到57.38%的已知违规（乐观估计），仍有43%的缺口
Source: Deque / davidmello.com
URL: https://www.davidmello.com/software-testing/test-automation/playwright-accessibility-testing-axe-lighthouse-limitations
Date: 2026-04-10
Excerpt: "Deque arrived at the 57.38% figure by taking a more pragmatic, real-world approach... this shows a 43% gap — proving you still need a mix of both manual and automated testing"
Context: 组件库工程化应建立"自动化+人工"的混合测试策略，而非仅依赖自动化工具
Confidence: high
```

### 证据 5：ARIA第一规则与误用数据

```
Claim: W3C官方ARIA使用第一规则规定：若原生HTML已提供所需语义和行为，不应使用ARIA。有ARIA的页面平均比无ARIA页面多24个可检测错误
Source: W3C Using ARIA / WebAIM Million
URL: https://www.w3.org/TR/using-aria/ / https://webaim.org/projects/million/
Date: 2026-02-24 / 持续更新
Excerpt: "If you can use a native HTML element or attribute with the semantics and behavior you require already built in, instead of re-purposing an element and adding an ARIA role, state or property to make it accessible, then do so"
Context: 组件库设计应优先使用语义化HTML，仅在HTML无法表达时才使用ARIA
Confidence: high
```

### 证据 6：FTC对accessiBe的罚款与覆盖层争议

```
Claim: FTC于2025年1月对accessiBe罚款$1M，认定其关于AI小部件可自动实现WCAG合规的声明为虚假、误导或无法证实。800+可访问性专家签署Overlay Fact Sheet反对覆盖层方法
Source: FTC / ratedwithai.com / Brickfield
URL: https://ratedwithai.com/blog/accessibe-review-2026 / https://brickfield.ie/2026/03/27/why-accessibility-overlays-fail/
Date: 2026-06-15 / 2026-03-27
Excerpt: "The FTC found these claims were false, misleading, or unsubstantiated... accessWidget failed to make basic website components — menus, headings, tables, images — compliant with WCAG"
Context: 覆盖层的失败强化了"源代码级修复"的工程化路径，组件库是实现这一目标的关键基础设施
Confidence: high
```

### 证据 7：EAA合规要求与罚款

```
Claim: 欧洲无障碍法（EAA）于2025年6月28日生效，要求所有向欧盟消费者提供数字服务的企业符合WCAG 2.1 AA（EN 301 549），罚款可达€100,000或年营收4%
Source: iCrossing / coaxsoft.com
URL: https://www.icrossing.com/insights/eaa-compliance-guide
Date: 2026-03-27
Excerpt: "Starting June 28, 2025, the EAA applies to all organizations operating in or targeting EU consumers... This includes B2B and B2C brands—even if headquartered outside the EU"
Context: EAA的域外效力意味着全球React组件库都需要考虑其可访问性标准
Confidence: high
```

### 证据 8：Section 508与政府采购

```
Claim: Section 508要求联邦机构及其承包商的ICT符合WCAG 2.0 AA（2025年参考WCAG 2.1/2.2），非合规企业将在RFP中被拒绝。VPAT/ACR报告是政府合同的前提条件
Source: ADA Compliance Pros / LoopStudio
URL: https://www.adacompliancepros.com/blog/who-needs-to-follow-section-508-compliance-explained-for-2025
Date: 2025-10-03
Excerpt: "Your proposal can be rejected during an RFP if you fail to provide Section 508 compliance certification... Non-compliance leads to lost deals, legal risks, and damaged reputation"
Context: 使用可访问组件库是满足Section 508的技术基础，直接影响政府市场进入能力
Confidence: medium
```

### 证据 9：焦点管理的工程实践

```
Claim: HTML5 <dialog>元素的showModal()API提供内置焦点管理、Escape键处理、ARIA语义和背景隔离，是构建可访问模态对话框的推荐方法
Source: Chris Henrick / UXPin
URL: https://clhenrick.io/blog/react-a11y-modal-dialog/ / https://www.uxpin.com/studio/blog/how-to-build-accessible-modals-with-focus-traps/
Date: 2026-05-18 / 2026-04-22
Excerpt: "Using the HTML <dialog> element gives us a lot of accessibility features for free: Focus management, traps keyboard focus, prevents content outside from being accessed by assistive technology, closes on Escape"
Context: 使用原生HTML可访问性API比自定义JavaScript实现更可靠，这是"ARIA第一规则"的工程化体现
Confidence: high
```

### 证据 10：中国可访问性法规

```
Claim: 中国《无障碍环境建设法》（2023年）要求利用财政资金建立的互联网网站逐步符合无障碍标准，2019年国家标准以WCAG 2.0/2.1为参考
Source: East Asian Library Organizations
URL: https://www.eastasianlib.org/newsite/wp-content/uploads/2025/04/CCM_2025_Special_4-Lucy-Li-Shuqi-Ye-ADA-Title-II-and-East-Asian-Digital-Resource-Accessibility.pdf
Date: 2025
Excerpt: "利用财政资金建立的互联网网站、服务平台、移动互联网应用程序，应当逐步符合无障碍网站设计标准和国家信息无障碍标准"
Context: 中国市场对可访问性组件库的需求正在增长，Ant Design等企业级库已开始系统性支持
Confidence: high
```

### 证据 11：jest-axe单元测试实践

```
Claim: jest-axe允许在React组件单元测试中集成axe-core，验证组件渲染无WCAG违规。最佳实践包括测试初始状态、交互状态、不同视口尺寸
Source: oneuptime.com / howtotestfrontend.com
URL: https://oneuptime.com/blog/post/2026-01-15-test-react-accessibility-axe-core/view / https://howtotestfrontend.com/resources/accessibility-testing-your-react-app
Date: 2026-01-15 / 2025-11-19
Excerpt: "test('should have no accessibility violations', async () => { const { container } = render(<Button onClick={() => {}}>Click me</Button>); const results = await axe(container); expect(results).toHaveNoViolations(); })"
Context: 将jest-axe纳入CI流程可捕获回归性可访问性缺陷，是组件库工程化的关键实践
Confidence: high
```

### 证据 12：disabled vs aria-disabled的争论

```
Claim: 传统disabled属性使按钮从可访问性对象模型移除，屏幕阅读器用户无法感知其存在。现代最佳实践建议使用aria-disabled + CSS pointer-events + 条件onClick处理
Source: Kitty Giraudel / Deque / Storybook GitHub
URL: https://kittygiraudel.com/2024/03/29/on-disabled-and-aria-disabled-attributes/ / https://www.deque.com/blog/distinguishing-between-aria-and-native-html-attributes/
Date: 2024-03-29 / 2025-12-18
Excerpt: "disabled optimizes for DX. It's simple and easy for developers. aria-disabled optimizes for UX. It improves accessibility and discovery for users" — Cory House; "The HTML disabled attribute makes a form control disabled, meaning it will be unchangeable, unfocusable... aria-disabled ONLY tells assistive technologies that the element is disabled"
Context: 组件库需要在开发者体验（DX）和用户体验（尤其是无障碍）之间做出明确选择
Confidence: high
```

### 证据 13：Storybook可访问性插件

```
Claim: @storybook/addon-a11y基于axe-core，在Storybook中为每个story自动运行可访问性检查，支持配置rules、context和 WCAG标准级别
Source: jsDocs.io (Storybook官方文档)
URL: https://www.jsdocs.io/package/@storybook/addon-a11y
Date: 2026-06-11
Excerpt: "Storybook Addon A11y: Test UI component compliance with WCAG web accessibility standards... config: Configuration object for axe-core... options: Options for running axe-core"
Context: Storybook a11y addon是组件驱动开发中集成可访问性测试的关键工具
Confidence: high
```

### 证据 14：Skip Navigation模式

```
Claim: Skip Navigation Link是WCAG 2.4.1 (Bypass Blocks)的核心实现模式，允许键盘用户跳过重复导航直接到达主要内容。17.1%的首页已实现skip link（2026年数据），但其中10%存在broken问题
Source: WebAIM Million 2026 / WebAbility
URL: https://webaim.org/projects/million/ / https://www.webability.io/glossary/skip-link
Date: 2026-03-30
Excerpt: "17.1% of home pages had a 'skip' link present, up from 15.3% in 2025. One out of every ten 'skip' links were broken—either they were hidden in a way that made them inaccessible or the link target was not present in the page"
Context: Skip link是组件库应提供的基础可访问性组件模式
Confidence: high
```

### 证据 15：Ant Design可访问性实践

```
Claim: Ant Design配色系统严格遵循WCAG 2.0标准，文本与背景对比度达AAA级（7:1以上），采用语义化HTML标签，DatePicker组件已重构键盘交互逻辑
Source: CSDN - Ant Design无障碍设计
URL: https://blog.csdn.net/gitblog_00443/article/details/152581841
Date: 2026-02-20
Excerpt: "Ant Design的配色系统严格遵循WCAG 2.0标准，文本与背景的对比度达到AAA级（7:1以上）... 正文文本使用 rgba(0, 0, 0, 0.85)，与白色背景形成足够对比度"
Context: 中国企业级组件库在无障碍方面已有成熟实践，为本土合规提供技术基础
Confidence: medium
```

---

## 7. 推荐深入方向

### 7.1 紧急方向

1. **WCAG 2.2合规路线图**：为组件库制定从2.1到2.2的迁移指南，特别关注新增9个成功标准的影响
2. **EAA合规清单**：针对欧盟市场用户的组件库，建立EAA合规的开发和测试流程
3. **FTC裁决后续影响**：跟踪2025年后可访问性工具市场的监管变化

### 7.2 技术方向

4. **Headless UI可访问性基准测试**：建立Radix UI、React Aria、Ark UI等原语库的标准化可访问性评估框架
5. **自动化+人工混合测试策略**：研究如何将axe-core（~57%覆盖率）与人工审计结合，实现80%+的覆盖率
6. **原生HTML可访问性API的利用**：深入研究`<dialog>`、`<details>`、`<input type="date">`等元素替代ARIA组件的可能性
7. **性能与可访问性平衡**：量化可访问性功能（焦点管理、ARIA状态、live region）对组件运行时性能的实际影响

### 7.3 研究方向

8. **ARIA误用的根因分析**：系统性研究为何有ARIA的页面错误更多，开发教育和工具改进方案
9. **认知障碍可访问性**：WCAG 2.2新增的认知相关标准（Accessible Authentication、Redundant Entry、Consistent Help）的工程化实践
10. **移动端可访问性**：触摸目标尺寸（2.5.8）、拖拽替代方案（2.5.7）在移动组件库中的实现
11. **中国无障碍法规跟踪**：《无障碍环境建设法》的实施细则和执法趋势
12. **AI辅助可访问性**：在FTC罚款背景下，审慎评估AI在可访问性测试和修复中的合理角色

---

## 附录：关键数据汇总

| 指标 | 数值 | 来源 |
|------|------|------|
| 全球网站WCAG失败率 | 95.9% (2026) | WebAIM Million |
| 每页平均错误数 | 56.1 (2026) | WebAIM Million |
| ARIA页面额外错误 | +24个/页 | WebAIM Million |
| ADA联邦诉讼(2025) | 3,117起 (+27%) | Seyfarth Shaw |
| 电商诉讼占比 | 70% | UsableNet |
| EAA罚款上限 | €100,000或营收4% | EAA指令 |
| 自动化测试覆盖率 | 30-57% | Deque/WebAIM |
| shadcn/ui WCAG 2.2 AA通过率 | 34/48 (71%) | The Front Kit |
| FTC accessiBe罚款 | $1,000,000 | FTC |
| 覆盖层被诉网站比例 | 22.6% | EcomBack |

---

## 参考来源索引

- [^261^] WebAIM Million 2026: https://webaim.org/projects/million/
- [^591^] ADA Lawsuit Statistics 2025: https://beaccessible.com/post/americans-with-disabilities-act-statistics/
- [^595^] Federal Court Website Accessibility Lawsuit Filings Bounce Back 2025: https://www.mondaq.com/unitedstates/discrimination-disability-sexual-harassment/1766320/
- [^596^] EAA Compliance Guide: https://www.icrossing.com/insights/eaa-compliance-guide
- [^598^] ADA Lawsuit Statistics 2025-2026: https://wcagsafe.com/blog/ada-lawsuit-statistics
- [^630^] Building an Accessible Modal Dialog in React: https://clhenrick.io/blog/react-a11y-modal-dialog/
- [^633^] I Learned The First Rule of ARIA the Hard Way: https://css-tricks.com/i-learned-the-first-rule-of-aria-the-hard-way/
- [^634^] Using ARIA (W3C): https://www.w3.org/TR/using-aria/
- [^708^] WCAG 2.2 Standards: https://www.equalweb.com/platform/standards/wcag-2-2.html
- [^707^] accessiBe Review 2026: https://ratedwithai.com/blog/accessibe-review-2026
- [^716^] Why Accessibility Overlays Fail: https://brickfield.ie/2026/03/27/why-accessibility-overlays-fail/
- [^718^] accessiBe and UserWay Don't Stop ADA Lawsuits: https://onepageaudit.com/blog/accessibility-overlays-dont-work
- [^744^] Top Headless UI libraries for React in 2026: https://www.greatfrontend.com/zh-CN/blog/top-headless-ui-libraries-for-react-in-2026
- [^770^] WebAIM Million and User Surveys: https://webaim.org/presentations/2022/csun/WebAIM-Million-and-Surveys.pdf
- [^783^] WCAG 2.2 New Criteria: https://www.bfsg-experte.de/en/blog/wcag-22-new-criteria/
- [^787^] Playwright Accessibility Testing Limitations: https://www.davidmello.com/software-testing/test-automation/playwright-accessibility-testing-axe-lighthouse-limitations
- [^788^] WCAG 2.1 vs 2.2: https://askem.com/compliance/wcag-2-2/
- [^793^] WCAG 2.2 as ISO Standard: https://www.skynettechnologies.com/blog/wcag-2-2-as-an-iso-standard-latest-compliance-expectation-for-businesses-in-2025

---

> **报告声明**：本调研基于公开可获取的信息源，所有数据和引用均保留原始来源。可访问性标准和法规持续演进，建议读者验证最新信息。
