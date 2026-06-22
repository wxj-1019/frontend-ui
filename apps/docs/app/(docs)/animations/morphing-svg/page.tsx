"use client";

import { useState } from "react";
import { MorphingSVG } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

const shapePaths = [
  "M100 20 A80 80 0 1 0 100 180 A80 80 0 1 0 100 20",
  "M100 10 L120 70 L180 70 L130 110 L150 170 L100 140 L50 170 L70 110 L20 70 L80 70 Z",
  "M100 40 L160 100 L100 160 L40 100 Z",
];

function ControlledMorphPreview() {
  const [index, setIndex] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <MorphingSVG
        paths={shapePaths}
        activeIndex={index}
        strokeColor="#f472b6"
        duration={600}
        loop={false}
        viewBoxWidth={200}
        viewBoxHeight={200}
        className="h-40 w-40"
      />
      <button
        onClick={() => setIndex((i) => (i + 1) % 3)}
        className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm text-white"
      >
        下一个形状 ({index + 1}/3)
      </button>
    </div>
  );
}

export default function MorphingSVGPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="MorphingSVG"
      description="基于 CSS transition 的 SVG 路径平滑变形动画，通过 CSS d 属性过渡实现多形状自动轮播。"
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
        { name: "paths", type: "string[]", required: true, description: "SVG 路径 d 值数组，自动轮播变形" },
        { name: "activeIndex", type: "number", default: "-", description: "受控模式下的激活路径索引" },
        { name: "fillColor", type: "string", default: "'none'", description: "填充颜色" },
        { name: "strokeColor", type: "string", default: "'currentColor'", description: "描边颜色" },
        { name: "strokeWidth", type: "number", default: "2", description: "描边宽度" },
        { name: "duration", type: "number", default: "800", description: "变形动画时长（ms）" },
        { name: "autoPlayInterval", type: "number", default: "3000", description: "自动轮播间隔（ms）" },
        { name: "loop", type: "boolean", default: "true", description: "是否循环播放" },
        { name: "onCycle", type: "(index: number) => void", default: "-", description: "路径切换时的回调" },
        { name: "viewBoxWidth", type: "number", default: "200", description: "SVG 视口宽度" },
        { name: "viewBoxHeight", type: "number", default: "200", description: "SVG 视口高度" },
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
      examples={[
        {
          title: "自动轮播形状",
          description: "圆形 → 星形 → 菱形 自动循环变形",
          code: `<MorphingSVG
  paths={[
    "M100 20 A80 80 0 1 0 100 180 A80 80 0 1 0 100 20",
    "M100 10 L120 70 L180 70 L130 110 L150 170 L100 140 L50 170 L70 110 L20 70 L80 70 Z",
    "M100 40 L160 100 L100 160 L40 100 Z",
  ]}
  strokeColor="#00F5FF"
  strokeWidth={2}
  duration={800}
  autoPlayInterval={3000}
  loop={true}
/>`,
          render: () => (
            <div className="flex items-center justify-center py-4">
              <MorphingSVG
                paths={shapePaths}
                strokeColor="#00F5FF"
                strokeWidth={2}
                duration={800}
                autoPlayInterval={3000}
                loop={true}
                viewBoxWidth={200}
                viewBoxHeight={200}
                className="h-40 w-40"
              />
            </div>
          ),
        },
        {
          title: "受控模式",
          description: "通过 activeIndex 手动控制当前形状",
          code: `const [index, setIndex] = useState(0);

<MorphingSVG
  paths={shapePaths}
  activeIndex={index}
  strokeColor="#f472b6"
  duration={600}
  loop={false}
/>

<button onClick={() => setIndex(i => (i + 1) % 3)}>
  下一个形状
</button>`,
          render: () => <ControlledMorphPreview />,
        },
      ]}
      accessibility="MorphingSVG 是纯装饰性的 SVG 动画组件，使用 CSS transition on the d 属性实现路径平滑过渡。支持受控模式（通过 activeIndex）和非受控自动轮播两种方式。SVG 元素可传入 aria-hidden='true' 标记为装饰性内容，对屏幕阅读器无影响。对于设置了 prefers-reduced-motion 的用户，CSS 过渡自动禁用，路径直接跳至目标状态。组件不包含交互元素，无需键盘导航或焦点管理支持。"
    />
  );
}
