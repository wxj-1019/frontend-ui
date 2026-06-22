"use client";

import { MorphingSVG } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

const shapePaths = [
  "M100 20 A80 80 0 1 0 100 180 A80 80 0 1 0 100 20",
  "M100 10 L120 70 L180 70 L130 110 L150 170 L100 140 L50 170 L70 110 L20 70 L80 70 Z",
  "M100 40 L160 100 L100 160 L40 100 Z",
];

export default function MorphingSVGPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="MorphingSVG"
      description="SVG 路径平滑变形动画，支持自动轮播多种形状"
      installName="morphing-svg"
      importStatement={'import { MorphingSVG } from "@frontend-ui/ui";'}
      defaultValues={{
        strokeColor: "#00F5FF",
        strokeWidth: 2,
        duration: 800,
        autoPlayInterval: 3000,
        loop: true,
        viewBoxWidth: 200,
        viewBoxHeight: 200,
      }}
      propConfig={[
        { name: "strokeColor", type: "color" },
        { name: "strokeWidth", type: "number", min: 1, max: 10 },
        { name: "duration", type: "number", min: 200, max: 5000, step: 100 },
        { name: "autoPlayInterval", type: "number", min: 500, max: 10000, step: 500 },
        { name: "loop", type: "boolean" },
      ]}
      propDocs={[
        { name: "paths", type: "string[]", required: true, description: "SVG 路径 d 值数组" },
        { name: "activeIndex", type: "number", default: "-", description: "受控模式下的激活索引" },
        { name: "fillColor", type: "string", default: "none", description: "填充颜色" },
        { name: "strokeColor", type: "string", default: "currentColor", description: "描边颜色" },
        { name: "strokeWidth", type: "number", default: "2", description: "描边宽度" },
        { name: "duration", type: "number", default: "800", description: "变形动画时长 (ms)" },
        { name: "autoPlayInterval", type: "number", default: "3000", description: "自动轮播间隔 (ms)" },
        { name: "loop", type: "boolean", default: "true", description: "是否循环" },
        { name: "onCycle", type: "(index) => void", default: "-", description: "切换回调" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) => `<MorphingSVG
  paths={['M100 20 A80...', 'M100 10 L120...']}
  strokeColor="${v.strokeColor}"
  duration={${v.duration}}
  autoPlayInterval={${v.autoPlayInterval}}
/>`}
      renderPreview={(v) => (
        <div className="flex items-center justify-center py-8">
          <MorphingSVG
            paths={shapePaths}
            strokeColor={String(v.strokeColor)}
            strokeWidth={Number(v.strokeWidth)}
            duration={Number(v.duration)}
            autoPlayInterval={Number(v.autoPlayInterval)}
            loop={Boolean(v.loop)}
            viewBoxWidth={200}
            viewBoxHeight={200}
            className="h-48 w-48"
          />
        </div>
      )}
    />
  );
}
