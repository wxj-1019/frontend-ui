"use client";

import { Tabs } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function TabsPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="Tabs"
      description="标签页组件，使用 Motion layoutId 实现滑动指示器与内容切换动画"
      installName="tabs"
      importStatement={'import { Tabs } from "@frontend-ui/ui";'}
      defaultValues={{ orientation: "horizontal" }}
      propConfig={[
        { name: "orientation", type: "string", options: ["horizontal", "vertical"] },
      ]}
      propDocs={[
        { name: "tabs", type: "TabItem[]", required: true, description: "标签项数组，每项包含 label (string) 和 content (ReactNode)" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "defaultIndex", type: "number", default: "0", description: "默认激活索引" },
        { name: "orientation", type: "'horizontal' | 'vertical'", default: "'horizontal'", description: "标签朝向" },
      ]}
      codeGenerator={(v) => `<Tabs
  orientation="${v.orientation}"
  defaultIndex={0}
  tabs={[
    { label: "标签一", content: <p>内容一</p> },
    { label: "标签二", content: <p>内容二</p> },
  ]}
/>`}
      renderPreview={(v) => (
        <div className="w-full max-w-md">
          <Tabs
            orientation={v.orientation as "horizontal" | "vertical"}
            defaultIndex={0}
            tabs={[
              { label: "概览", content: <p>这是概览面板，展示项目基本信息。</p> },
              { label: "活动", content: <p>这是活动面板，展示近期动态。</p> },
              { label: "设置", content: <p>这是设置面板，可调整偏好选项。</p> },
            ]}
          />
        </div>
      )}
      examples={[
        {
          title: "水平标签页",
          description: "最常见的水平排列标签页",
          code: `<Tabs
  orientation="horizontal"
  defaultIndex={0}
  tabs={[
    { label: "概览", content: <p>项目概览内容</p> },
    { label: "分析", content: <p>数据分析内容</p> },
    { label: "设置", content: <p>系统设置内容</p> },
  ]}
/>`,
          render: () => (
            <div className="w-full max-w-md">
              <Tabs
                orientation="horizontal"
                defaultIndex={0}
                tabs={[
                  { label: "概览", content: <p className="text-sm">项目概览内容，展示核心指标。</p> },
                  { label: "分析", content: <p className="text-sm">数据分析内容，展示图表统计。</p> },
                  { label: "设置", content: <p className="text-sm">系统设置内容，调整各项参数。</p> },
                ]}
              />
            </div>
          ),
        },
        {
          title: "垂直标签页",
          description: "标签垂直排列，适合侧边导航场景",
          code: `<Tabs
  orientation="vertical"
  defaultIndex={0}
  tabs={[
    { label: "个人资料", content: <p>编辑个人信息</p> },
    { label: "安全设置", content: <p>管理密码和安全</p> },
    { label: "通知", content: <p>配置通知偏好</p> },
  ]}
/>`,
          render: () => (
            <div className="w-full max-w-md">
              <Tabs
                orientation="vertical"
                defaultIndex={0}
                tabs={[
                  { label: "个人资料", content: <p className="text-sm">编辑头像、昵称和个人简介。</p> },
                  { label: "安全设置", content: <p className="text-sm">管理密码、两步验证和登录历史。</p> },
                  { label: "通知", content: <p className="text-sm">配置邮件、推送和站内通知偏好。</p> },
                ]}
              />
            </div>
          ),
        },
      ]}
      accessibility="Tabs 组件遵循 WAI-ARIA 标签页模式：外层容器设置 role='tablist' 和 aria-orientation；每个标签按钮设置 role='tab'、aria-selected 表示选中状态、aria-controls 关联面板、tabIndex 管理焦点（仅选中标签可 tab 聚焦）；每个面板设置 role='tabpanel' 和 aria-labelledby 关联标签。支持键盘方向键导航。内容始终存在于 DOM 中，对屏幕阅读器友好。对于设置了 prefers-reduced-motion 的用户，指示器滑动动画被跳过，直接切换到目标位置。"
    />
  );
}
