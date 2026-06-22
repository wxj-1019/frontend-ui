"use client";

import { Accordion } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

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
        { name: "items", type: "{ title: string; content: ReactNode }[]", required: true, description: "面板项数组" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "defaultOpen", type: "number", default: "-", description: "默认展开项索引" },
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
    />
  );
}
