"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function GlassCardPage() {
  return (
    <ComponentDocPage
      category={{ label: "复合组件", href: "/components" }}
      name="GlassCard"
      description="玻璃态卡片组件，支持3D倾斜、动态光晕和毛玻璃效果。鼠标移动时卡片产生透视倾斜，光晕跟随鼠标位置。"
      installName="glass-card"
      importStatement="import { GlassCard } from '@frontend-ui/ui';"
      defaultValues={{ borderRadius: 16, glowIntensity: 0.3, blur: 20, backgroundOpacity: 0.15, tilt: true }}
      propConfig={[
        { name: "borderRadius", type: "number", min: 0, max: 40, step: 1 },
        { name: "glowIntensity", type: "number", min: 0, max: 1, step: 0.05 },
        { name: "blur", type: "number", min: 0, max: 50, step: 1 },
        { name: "tilt", type: "boolean" },
      ]}
      propDocs={[
        { name: "borderRadius", type: "number", default: "16", description: "卡片圆角" },
        { name: "glowColor", type: "string", default: "'var(--color-accent)'", description: "边框发光颜色" },
        { name: "glowIntensity", type: "number", default: "0.3", description: "发光强度 (0-1)" },
        { name: "blur", type: "number", default: "20", description: "毛玻璃模糊程度" },
        { name: "backgroundOpacity", type: "number", default: "0.15", description: "背景透明度" },
        { name: "tilt", type: "boolean", default: "true", description: "是否启用3D倾斜" },
        { name: "tiltDegree", type: "number", default: "10", description: "最大倾斜角度" },
      ]}
      codeGenerator={(values) => `<GlassCard\n  borderRadius={${values.borderRadius}}\n  glowIntensity={${values.glowIntensity}}\n  blur={${values.blur}}\n  ${values.tilt ? "" : "tilt={false} "}\n>\n  <div>Your content</div>\n</GlassCard>`}
      renderPreview={(values) => (
        <div className="p-6">
          <div className="text-center">
            <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">玻璃态卡片</h3>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">悬停查看3D倾斜效果</p>
          </div>
        </div>
      )}
    />
  );
}
