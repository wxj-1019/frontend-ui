"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function AuroraPage() {
  return (
    <ComponentDocPage
      category={{ label: "背景特效", href: "/backgrounds" }}
      name="Aurora"
      description="极光背景效果，创建流动的渐变背景"
      installName="aurora"
      importStatement={'import { Aurora } from "@frontend-ui/ui";'}
      defaultValues={{ colors: ["#3b82f6", "#8b5cf6", "#ec4899"] }}
      propConfig={[]}
      propDocs={[
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "colors", type: "string[]", default: '["#3b82f6", "#8b5cf6", "#ec4899"]', description: "极光颜色数组" },
      ]}
      codeGenerator={() => `<Aurora className="absolute inset-0" />`}
      renderPreview={() => (
        <div className="relative h-48 w-full overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-aurora" />
          <div className="relative z-10 flex h-full items-center justify-center">
            <p className="text-sm text-[var(--color-text-muted)]">极光效果预览</p>
          </div>
        </div>
      )}
    />
  );
}
