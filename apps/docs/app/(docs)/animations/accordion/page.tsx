"use client";

import { Accordion } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";
import { ChevronDown, ChevronRight, HelpCircle, Settings, BookOpen } from "lucide-react";

export default function AccordionPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="Accordion"
      description="可折叠面板组件，基于 Motion 实现高度动画，支持多展开模式"
      installName="accordion"
      importStatement={'import { Accordion } from "@frontend-ui/ui";'}
      defaultValues={{ allowMultiple: false, duration: 0.3 }}
      propConfig={[
        { name: "allowMultiple", type: "boolean" },
        { name: "duration", type: "number", min: 0.1, max: 2, step: 0.1 },
      ]}
      propDocs={[
        { name: "items", type: "AccordionItem[]", required: true, description: "面板项数组，每项包含 title (string) 和 content (ReactNode)" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "defaultOpen", type: "number", default: "-", description: "默认展开项索引，不传则全部折叠" },
        { name: "allowMultiple", type: "boolean", default: "false", description: "是否允许同时展开多项" },
        { name: "duration", type: "number", default: "0.3", description: "动画时长 (s)" },
      ]}
      codeGenerator={(v) => `<Accordion
  allowMultiple={${v.allowMultiple}}
  duration={${v.duration}}
  defaultOpen={0}
  items={[
    { title: "项目一", content: <p>内容一</p> },
    { title: "项目二", content: <p>内容二</p> },
  ]}
/>`}
      renderPreview={(v) => (
        <div className="w-full max-w-md">
          <Accordion
            className="w-full"
            allowMultiple={Boolean(v.allowMultiple)}
            duration={Number(v.duration)}
            defaultOpen={0}
            items={[
              { title: "项目一", content: <p>这是第一个面板的内容。</p> },
              { title: "项目二", content: <p>这是第二个面板的内容。</p> },
              { title: "项目三", content: <p>这是第三个面板的内容。</p> },
            ]}
          />
        </div>
      )}
      examples={[
        {
          title: "单展开模式",
          description: "同一时间只能展开一个面板",
          code: `<Accordion
  defaultOpen={0}
  allowMultiple={false}
  items={[
    { title: "什么是 React？", content: <p>React 是一个用于构建用户界面的 JavaScript 库。</p> },
    { title: "什么是 Motion？", content: <p>Motion 是一个强大的 React 动画库。</p> },
    { title: "如何开始？", content: <p>安装依赖后即可开始使用。</p> },
  ]}
/>`,
          render: () => (
            <div className="w-full max-w-md">
              <Accordion
                defaultOpen={0}
                allowMultiple={false}
                items={[
                  { title: "什么是 React？", content: <p className="text-sm">React 是一个用于构建用户界面的 JavaScript 库。</p> },
                  { title: "什么是 Motion？", content: <p className="text-sm">Motion 是一个强大的 React 动画库。</p> },
                  { title: "如何开始？", content: <p className="text-sm">安装依赖后即可开始使用。</p> },
                ]}
              />
            </div>
          ),
        },
        {
          title: "多展开模式",
          description: "允许同时展开多个面板",
          code: `<Accordion
  allowMultiple={true}
  duration={0.4}
  items={[
    { title: "功能一", content: <p>详细说明...</p> },
    { title: "功能二", content: <p>详细说明...</p> },
    { title: "功能三", content: <p>详细说明...</p> },
  ]}
/>`,
          render: () => (
            <div className="w-full max-w-md">
              <Accordion
                allowMultiple={true}
                duration={0.4}
                items={[
                  { title: "功能一", content: <p className="text-sm">支持自定义动画时长和展开模式。</p> },
                  { title: "功能二", content: <p className="text-sm">基于 Motion 的平滑高度过渡动画。</p> },
                  { title: "功能三", content: <p className="text-sm">完整的无障碍支持和键盘导航。</p> },
                ]}
              />
            </div>
          ),
        },
        {
          title: "带图标的自定义手风琴",
          description: "每个面板项带有自定义图标和样式，适用于 FAQ 或文档场景",
          code: `import { ChevronDown, HelpCircle, Settings, BookOpen } from "lucide-react";

<Accordion
  allowMultiple={true}
  duration={0.3}
  items={[
    {
      title: "什么是前端 UI 库？",
      content: (
        <div className="flex items-start gap-2">
          <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
          <p>前端 UI 库是一套可复用的组件集合...</p>
        </div>
      ),
    },
    {
      title: "如何自定义主题？",
      content: (
        <div className="flex items-start gap-2">
          <Settings className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <p>通过 CSS 变量覆盖默认主题...</p>
        </div>
      ),
    },
    {
      title: "支持 TypeScript 吗？",
      content: (
        <div className="flex items-start gap-2">
          <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
          <p>所有组件均提供完整的类型定义...</p>
        </div>
      ),
    },
  ]}
/>`,
          render: () => (
            <div className="w-full max-w-md">
              <Accordion
                allowMultiple={true}
                duration={0.3}
                items={[
                  {
                    title: "什么是前端 UI 库？",
                    content: (
                      <div className="flex items-start gap-2">
                        <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                        <p className="text-sm">前端 UI 库是一套可复用的组件集合，帮助开发者快速构建一致的用户界面，减少重复开发工作。</p>
                      </div>
                    ),
                  },
                  {
                    title: "如何自定义主题？",
                    content: (
                      <div className="flex items-start gap-2">
                        <Settings className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                        <p className="text-sm">通过 CSS 变量覆盖默认主题色值，支持亮色和暗色模式切换，也可通过配置文件自定义全局样式。</p>
                      </div>
                    ),
                  },
                  {
                    title: "支持 TypeScript 吗？",
                    content: (
                      <div className="flex items-start gap-2">
                        <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                        <p className="text-sm">所有组件均提供完整的类型定义，支持泛型 Props 推断和事件类型推导，开箱即用。</p>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          ),
        },
      ]}
      accessibility="Accordion 组件完全遵循 WAI-ARIA 手风琴模式：每个触发按钮设置了 aria-expanded 表示展开状态、aria-controls 关联对应面板；每个面板设置了 role='region' 和 aria-labelledby 关联触发按钮。面板使用 h3 语义标题包裹按钮。展开/折叠动画使用 motion/react 的 AnimatePresence 实现平滑高度过渡。支持键盘操作：Enter 或空格键触发展开/折叠。文本内容始终存在于 DOM 中，屏幕阅读器可正常读取。对于设置了 prefers-reduced-motion 的用户，动画被跳过，面板直接切换显示/隐藏状态。"
    />
  );
}
