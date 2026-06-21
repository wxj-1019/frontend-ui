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
        { name: "tabs", type: "{ label: string; content: ReactNode }[]", required: true, description: "标签项数组" },
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
    />
  );
}
