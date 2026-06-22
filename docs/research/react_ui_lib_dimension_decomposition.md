# Phase 2: Dimension Decomposition — React UI组件库自研调研

## 调研维度分解（12个维度）

### Dim 01: 主流组件库架构模式对比
- **角度**: 架构设计对比
- **范围**: 传统NPM包模式(MUI/AntD) vs Copy-Paste模式(shadcn/ui) vs Headless模式(Radix)的深层架构差异
- **重叠维度**: Dim 02, Dim 07, Dim 09
- **预期来源**: 官方文档、架构分析文章、GitHub源码

### Dim 02: Headless UI组件原语技术深度
- **角度**: 底层技术实现
- **范围**: Radix UI/Ariakit/Base UI的状态管理、可访问性实现机制、组件组合模式
- **重叠维度**: Dim 01, Dim 05, Dim 09
- **预期来源**: 官方文档、源码分析、技术博客

### Dim 03: 组件库工程化工具链选型
- **角度**: 开发基础设施
- **范围**: 构建工具(Rollup/Vite/tsup)、Monorepo(Turborepo/Nx)、测试(Jest/Vitest/RTL)、文档(Storybook/Docusaurus)
- **重叠维度**: Dim 07, Dim 10, Dim 11
- **预期来源**: 官方文档、性能基准测试、工程实践文章

### Dim 04: 样式系统与Design Tokens架构
- **角度**: 视觉系统设计
- **范围**: CSS方案对比(CSS-in-JS/Tailwind/CSS Modules)、Design Tokens三层架构、主题系统、Tailwind v4
- **重叠维度**: Dim 01, Dim 06, Dim 07
- **预期来源**: W3C规范、官方文档、设计系统实践

### Dim 05: 可访问性工程化实践
- **角度**: 无障碍合规
- **范围**: WCAG 2.2合规、ARIA正确使用、键盘导航、自动化测试(axe-core)、法律要求(ADA/EAA)
- **重叠维度**: Dim 02, Dim 07, Dim 09
- **预期来源**: W3C规范、无障碍测试报告、法律文件

### Dim 06: React Server Components与新技术兼容
- **角度**: 前沿技术适配
- **范围**: RSC兼容性、React Compiler v1.0影响、零运行时样式、React 19新特性
- **重叠维度**: Dim 03, Dim 04, Dim 11
- **预期来源**: React官方博客、RFC文档、框架迁移指南

### Dim 07: 自研组件库实施路线图设计
- **角度**: 实操指南
- **范围**: 从零搭建的完整步骤、目录结构、开发规范、组件分类体系、代码规范
- **重叠维度**: Dim 01, Dim 03, Dim 04, Dim 09
- **预期来源**: 教程文章、开源项目案例、最佳实践指南

### Dim 08: 国内企业级组件库生态与选型
- **角度**: 中国市场视角
- **范围**: AntD/Semi Design/TDesign/Arco Design深度对比、国内特殊需求、生态集成
- **重叠维度**: Dim 01, Dim 10
- **预期来源**: 官方文档、中文技术博客、企业案例

### Dim 09: 组件API设计与开发模式
- **角度**: 开发者体验
- **范围**: Compound Components、Composition模式、Props命名规范、TypeScript类型设计、forwardRef模式
- **重叠维度**: Dim 01, Dim 02, Dim 05, Dim 07
- **预期来源**: API设计指南、TypeScript文档、组件库源码

### Dim 10: 组件库发布、版本管理与生态运营
- **角度**: 运维与社区
- **范围**: npm发布流程、Changesets版本管理、文档站点建设、社区运营、贡献者管理
- **重叠维度**: Dim 03, Dim 07, Dim 08
- **预期来源**: 开源运营文章、版本管理工具文档、社区案例

### Dim 11: 性能优化与Bundle体积控制
- **角度**: 性能工程
- **范围**: Tree-shaking优化、懒加载、Bundle分析、运行时性能、渲染优化
- **重叠维度**: Dim 03, Dim 06, Dim 09
- **预期来源**: 性能测试报告、Bundle分析工具文档、优化实践

### Dim 12: 跨平台与多端组件方案
- **角度**: 多端统一
- **范围**: Web+移动端共享组件、小程序适配、Design to Code、跨平台框架(Tamagui)
- **重叠维度**: Dim 04, Dim 06, Dim 08
- **预期来源**: 跨平台框架文档、D2C工具文档、多端实践案例
