"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";
import { Dock } from "@frontend-ui/ui";
import { Home, Settings, User, Folder } from "lucide-react";

export default function DockPage() {
  return (
    <ComponentDocPage
      category={{ label: "复合组件", href: "/components" }}
      name="Dock"
      description="macOS 风格的停靠栏，支持弹性缩放效果"
      installName="dock"
      importStatement={'import { Dock } from "@frontend-ui/ui";'}
      defaultValues={{}}
      propConfig={[]}
      propDocs={[
        { name: "items", type: "{ icon: ReactNode; label: string }[]", required: true, description: "停靠栏项目列表" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
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
    />
  );
}
