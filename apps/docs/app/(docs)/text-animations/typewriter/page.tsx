"use client";

import { useState } from "react";
import { Typewriter } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

function TypewriterTerminalPreview() {
  const lines = [
    "> 正在连接服务器...",
    "> 加载配置文件...",
    "> 初始化完成 ✓",
    "> 欢迎使用 MiMoCode",
  ];
  const [index, setIndex] = useState(0);
  return (
    <div className="w-full max-w-md rounded-lg bg-gray-900 p-4 font-mono text-sm text-green-400 shadow-lg">
      <div className="mb-2 flex gap-1.5">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-500" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
      </div>
      <Typewriter
        text={lines[index]}
        speed={40}
        cursor
        loop
        onComplete={() => setIndex((i) => (i + 1) % lines.length)}
      />
    </div>
  );
}

export default function TypewriterPage() {
  return (
    <ComponentDocPage
      category={{ label: "文字动画", href: "/text-animations" }}
      name="Typewriter"
      description="基于 requestAnimationFrame 的打字机效果，逐字符显示文本，支持光标闪烁和循环播放。"
      installName="typewriter"
      importStatement={'import { Typewriter } from "@frontend-ui/ui";'}
      defaultValues={{ text: "Hello World", speed: 50, cursor: true, loop: false }}
      propConfig={[
        { name: "text", type: "string" },
        { name: "speed", type: "number", min: 10, max: 200, step: 10 },
        { name: "cursor", type: "boolean" },
        { name: "loop", type: "boolean" },
      ]}
      propDocs={[
        { name: "text", type: "string", required: true, description: "要显示的文本内容" },
        { name: "speed", type: "number", default: "50", description: "打字速度（毫秒/字符）" },
        { name: "delay", type: "number", default: "0", description: "开始延迟（毫秒）" },
        { name: "cursor", type: "boolean", default: "true", description: "是否显示光标" },
        { name: "cursorClassName", type: "string", default: "-", description: "光标自定义类名" },
        { name: "loop", type: "boolean", default: "false", description: "是否循环播放" },
        { name: "onComplete", type: "() => void", default: "-", description: "打字完成回调" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) =>
        `<Typewriter text="${v.text}" speed={${v.speed}} cursor={${v.cursor}} loop={${v.loop}} />`
      }
      renderPreview={(v) => (
        <Typewriter
          text={String(v.text)}
          speed={Number(v.speed)}
          cursor={Boolean(v.cursor)}
          loop={Boolean(v.loop)}
          className="font-display text-3xl font-bold text-[var(--color-text-primary)]"
        />
      )}
      examples={[
        {
          title: "基本打字效果",
          description: "默认速度的打字机效果",
          code: `<Typewriter text="Hello World" speed={50} />`,
          render: () => (
            <Typewriter
              text="Hello World"
              speed={50}
              className="font-display text-2xl font-bold text-[var(--color-text-primary)]"
            />
          ),
        },
        {
          title: "循环打字",
          description: "打完后删除并重新开始",
          code: `<Typewriter text="Looping..." loop speed={80} />`,
          render: () => (
            <Typewriter
              text="Looping text..."
              loop
              speed={80}
              className="font-display text-2xl font-bold text-[var(--color-accent)]"
            />
          ),
        },
        {
          title: "无光标",
          description: "隐藏光标的打字效果",
          code: `<Typewriter text="No cursor" cursor={false} speed={60} />`,
          render: () => (
            <Typewriter
              text="No cursor here"
              cursor={false}
              speed={60}
              className="font-display text-2xl font-bold text-[var(--color-text-primary)]"
            />
          ),
        },
        {
          title: "多行循环打字",
          description: "逐行打字显示后清空并循环，模拟终端输出效果",
          code: `function TypewriterTerminal() {
  const lines = [
    "> 正在连接服务器...",
    "> 加载配置文件...",
    "> 初始化完成 ✓",
    "> 欢迎使用 MiMoCode",
  ];
  const [index, setCurrent] = useState(0);
  return (
    <div className="font-mono bg-gray-900 text-green-400 p-4 rounded-lg">
      <Typewriter
        text={lines[index]}
        speed={40}
        loop
        onComplete={() => setCurrent((i) => (i + 1) % lines.length)}
      />
    </div>
  );
}`,
          render: () => <TypewriterTerminalPreview />,
        },
      ]}
      accessibility="Typewriter 使用 requestAnimationFrame 逐步显示文本，光标使用 aria-hidden='true' 标记为装饰性元素。完整文本始终通过 aria-label 可被屏幕阅读器访问，无需等待动画完成。对于设置了 prefers-reduced-motion 的用户，建议在全局层面尊重 prefers-reduced-motion 媒体查询来控制动画播放。"
    />
  );
}
