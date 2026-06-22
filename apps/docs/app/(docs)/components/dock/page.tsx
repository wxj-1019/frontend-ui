"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";
import { Dock } from "@frontend-ui/ui";
import { Home, Settings, User, Folder, Mail, Music } from "lucide-react";

export default function DockPage() {
  return (
    <ComponentDocPage
      category={{ label: "复合组件", href: "/components" }}
      name="Dock"
      description="基于 Motion 的 macOS 风格停靠栏，通过弹簧动画实现弹性缩放效果。"
      installName="dock"
      importStatement={'import { Dock } from "@frontend-ui/ui";'}
      defaultValues={{}}
      propConfig={[]}
      propDocs={[
        { name: "items", type: "{ icon: ReactNode; label: string }[]", required: true, description: "停靠栏项目列表，每项包含 icon 和 label" },
        { name: "className", type: "string", description: "自定义类名" },
        { name: "ref", type: "Ref<HTMLDivElement>", description: "转发的 DOM ref 引用" },
      ]}
      codeGenerator={() => `<Dock
  items={[
    { icon: <HomeIcon />, label: "首页" },
    { icon: <SettingsIcon />, label: "设置" },
    { icon: <UserIcon />, label: "用户" },
  ]}
/>`}
      renderPreview={() => (
        <Dock
          items={[
            { icon: <Home className="h-5 w-5" />, label: "首页" },
            { icon: <Settings className="h-5 w-5" />, label: "设置" },
            { icon: <User className="h-5 w-5" />, label: "用户" },
            { icon: <Folder className="h-5 w-5" />, label: "文件" },
          ]}
        />
      )}
      examples={[
        {
          title: "基础用法",
          description: "传入 icon 和 label 数组即可渲染停靠栏",
          code: `<Dock
  items={[
    { icon: <Home className="h-5 w-5" />, label: "首页" },
    { icon: <Settings className="h-5 w-5" />, label: "设置" },
    { icon: <User className="h-5 w-5" />, label: "用户" },
  ]}
/>`,
          render: () => (
            <Dock
              items={[
                { icon: <Home className="h-5 w-5" />, label: "首页" },
                { icon: <Settings className="h-5 w-5" />, label: "设置" },
                { icon: <User className="h-5 w-5" />, label: "用户" },
              ]}
            />
          ),
        },
        {
          title: "自定义样式",
          description: "通过 className 自定义停靠栏外观",
          code: `<Dock
  className="bg-black/50 border-white/20"
  items={[
    { icon: <Mail className="h-5 w-5" />, label: "邮件" },
    { icon: <Music className="h-5 w-5" />, label: "音乐" },
    { icon: <Folder className="h-5 w-5" />, label: "文件" },
  ]}
/>`,
          render: () => (
            <Dock
              className="bg-black/50 border-white/20"
              items={[
                { icon: <Mail className="h-5 w-5" />, label: "邮件" },
                { icon: <Music className="h-5 w-5" />, label: "音乐" },
                { icon: <Folder className="h-5 w-5" />, label: "文件" },
              ]}
            />
          ),
        },
      ]}
      accessibility="Dock 组件使用 role='toolbar' 和 aria-label='Dock 导航' 标记为工具栏。每个停靠项使用 button 元素并带有 aria-label，确保屏幕阅读器可以正确朗读每个导航项的名称。标签文本在悬停时显示，提供视觉提示。"
    />
  );
}
