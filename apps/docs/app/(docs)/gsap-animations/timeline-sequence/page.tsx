"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";
import { TimelineSequence } from "@frontend-ui/ui";

export default function GsapTimelineSequencePage() {
  return (
    <ComponentDocPage
      category={{ label: "GSAP 动画", href: "/gsap-animations" }}
      name="TimelineSequence"
      description="基于 GSAP Timeline 的序列动画编排组件，支持 scrollTrigger、scrub、pin 等功能"
      installName="timeline-sequence"
      importStatement={'import { TimelineSequence } from "@frontend-ui/ui";'}
      defaultValues={{}}
      propConfig={[
        { name: "scrollTrigger", type: "boolean" },
        { name: "scrub", type: "boolean" },
        { name: "pin", type: "boolean" },
        { name: "markers", type: "boolean" },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "要应用动画的内容" },
        { name: "steps", type: "TimelineStep[]", required: true, description: "动画步骤配置" },
        { name: "defaults", type: "TweenVars", default: "{ duration: 0.5, ease: 'power2.inOut' }", description: "默认动画参数" },
        { name: "scrollTrigger", type: "boolean", default: "false", description: "是否启用 ScrollTrigger" },
        { name: "start", type: "string", default: "top 80%", description: "ScrollTrigger 开始位置" },
        { name: "end", type: "string", default: "bottom 20%", description: "ScrollTrigger 结束位置" },
        { name: "scrub", type: "boolean | number", default: "false", description: "是否跟随滚动" },
        { name: "pin", type: "boolean", default: "false", description: "是否固定元素" },
        { name: "markers", type: "boolean", default: "false", description: "显示调试标记" },
        { name: "pause", type: "boolean", default: "false", description: "是否初始暂停" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={() => `<TimelineSequence
  steps={[
    { selector: '.box', to: { x: 200 }, position: 0 },
    { selector: '.box', to: { rotation: 360 }, position: 0.5 },
  ]}
  scrollTrigger
  scrub={0.5}
>
  <div className="box" />
</TimelineSequence>`}
      renderPreview={() => (
        <div className="overflow-hidden rounded-lg bg-[var(--color-bg-surface)] p-6">
          <p className="mb-4 text-sm text-[var(--color-text-muted)]">
            向下滚动查看序列动画效果
          </p>
          <TimelineSequence
            steps={[
              { selector: '.box1', to: { x: 200, backgroundColor: '#f5576c' }, position: 0 },
              { selector: '.box2', to: { y: -80, scale: 1.2 }, position: 0.3 },
              { selector: '.box3', to: { rotation: 360, borderRadius: '50%' }, position: 0.6 },
            ]}
            scrollTrigger
            scrub={0.5}
          >
            <div className="relative h-40">
              <div className="box1 absolute left-0 top-0 h-16 w-16 rounded-lg bg-[#667eea]" />
              <div className="box2 absolute left-0 top-20 h-16 w-16 rounded-lg bg-[#764ba2]" />
              <div className="box3 absolute left-0 bottom-0 h-16 w-16 rounded-lg bg-[#f093fb]" />
            </div>
          </TimelineSequence>
        </div>
      )}
    />
  );
}
