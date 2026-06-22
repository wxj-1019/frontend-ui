"use client";

import { SvgPathDraw } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

const defaultPath = "M100 20 A80 80 0 1 0 100 180 A80 80 0 1 0 100 20";

export default function SvgPathDrawPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="SvgPathDraw"
      description="SVG 路径描边动画，支持循环绘制、反向绘制等效果"
      installName="svg-path-draw"
      importStatement={'import { SvgPathDraw } from "@frontend-ui/ui";'}
      defaultValues={{
        path: defaultPath,
        strokeColor: "#00F5FF",
        strokeWidth: 2,
        duration: 2000,
        loop: false,
        reverse: false,
        viewBoxWidth: 200,
        viewBoxHeight: 200,
      }}
      propConfig={[
        { name: "strokeColor", type: "string" },
        { name: "strokeWidth", type: "number", min: 1, max: 10 },
        { name: "duration", type: "number", min: 500, max: 10000, step: 500 },
        { name: "loop", type: "boolean" },
        { name: "reverse", type: "boolean" },
      ]}
      propDocs={[
        { name: "path", type: "string", required: true, description: "SVG 路径 d 值" },
        { name: "strokeColor", type: "string", default: "currentColor", description: "描边颜色" },
        { name: "strokeWidth", type: "number", default: "2", description: "描边宽度" },
        { name: "duration", type: "number", default: "2000", description: "动画持续时间 (ms)" },
        { name: "loop", type: "boolean", default: "false", description: "是否循环播放" },
        { name: "reverse", type: "boolean", default: "false", description: "是否反向绘制" },
        { name: "viewBoxWidth", type: "number", default: "200", description: "SVG 视口宽度" },
        { name: "viewBoxHeight", type: "number", default: "200", description: "SVG 视口高度" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) => `<SvgPathDraw
  path="M100 20 A80 80 1 0 0 100 180"
  strokeColor="${v.strokeColor}"
  strokeWidth={${v.strokeWidth}}
  duration={${v.duration}}
  loop={${v.loop}}
/>`}
      renderPreview={(v) => (
        <div className="flex items-center justify-center py-8">
          <SvgPathDraw
            path={defaultPath}
            strokeColor={String(v.strokeColor)}
            strokeWidth={Number(v.strokeWidth)}
            duration={Number(v.duration)}
            loop={Boolean(v.loop)}
            reverse={Boolean(v.reverse)}
            viewBoxWidth={200}
            viewBoxHeight={200}
            className="h-48 w-48"
          />
        </div>
      )}
    />
  );
}
