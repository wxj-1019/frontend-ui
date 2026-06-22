"use client";

import { SvgPathDraw } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

const defaultPath = "M100 20 A80 80 0 1 0 100 180 A80 80 0 1 0 100 20";
const starPath = "M100 10 L120 70 L180 70 L130 110 L150 170 L100 140 L50 170 L70 110 L20 70 L80 70 Z";

export default function SvgPathDrawPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="SvgPathDraw"
      description="基于 requestAnimationFrame 的 SVG 路径描边动画，通过 stroke-dasharray 和 dashoffset 控制绘制进度，支持循环和反向绘制。"
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
        { name: "strokeColor", type: "string", default: "'currentColor'", description: "描边颜色" },
        { name: "strokeWidth", type: "number", default: "2", description: "描边宽度" },
        { name: "duration", type: "number", default: "2000", description: "动画持续时间（ms）" },
        { name: "loop", type: "boolean", default: "false", description: "是否循环播放" },
        { name: "reverse", type: "boolean", default: "false", description: "是否反向绘制" },
        { name: "viewBoxWidth", type: "number", default: "200", description: "SVG 视口宽度" },
        { name: "viewBoxHeight", type: "number", default: "200", description: "SVG 视口高度" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "svgProps", type: "React.SVGAttributes<SVGSVGElement>", default: "-", description: "传递给 SVG 元素的额外属性" },
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
      examples={[
        {
          title: "一次绘制",
          description: "圆形路径的一次性描边绘制",
          code: `<SvgPathDraw
  path="M100 20 A80 80 0 1 0 100 180 A80 80 0 1 0 100 20"
  strokeColor="#00F5FF"
  strokeWidth={2}
  duration={2000}
/>`,
          render: () => (
            <div className="flex items-center justify-center py-4">
              <SvgPathDraw
                path={defaultPath}
                strokeColor="#00F5FF"
                strokeWidth={2}
                duration={2000}
                viewBoxWidth={200}
                viewBoxHeight={200}
                className="h-40 w-40"
              />
            </div>
          ),
        },
        {
          title: "循环反向绘制",
          description: "星形路径循环播放，反向擦除效果",
          code: `<SvgPathDraw
  path="M100 10 L120 70 L180 70 L130 110 L150 170 L100 140 L50 170 L70 110 L20 70 L80 70 Z"
  strokeColor="#f472b6"
  strokeWidth={2}
  duration={1500}
  loop={true}
  reverse={true}
/>`,
          render: () => (
            <div className="flex items-center justify-center py-4">
              <SvgPathDraw
                path={starPath}
                strokeColor="#f472b6"
                strokeWidth={2}
                duration={1500}
                loop={true}
                reverse={true}
                viewBoxWidth={200}
                viewBoxHeight={200}
                className="h-40 w-40"
              />
            </div>
          ),
        },
      ]}
      accessibility="SvgPathDraw 是纯装饰性的 SVG 动画组件，使用 requestAnimationFrame 实现描边动画，通过 stroke-dasharray 和 stroke-dashoffset 控制绘制进度。SVG 元素可传入 aria-hidden='true' 标记为装饰性内容，对屏幕阅读器无影响。对于设置了 prefers-reduced-motion 的用户，建议在全局层面尊重 prefers-reduced-motion 媒体查询来禁用动画。组件不包含交互元素，无需键盘导航或焦点管理支持。"
    />
  );
}
