"use client";

import { TimelineSequence } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

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
        { name: "steps", type: "TimelineStep[]", required: true, description: "动画步骤配置数组" },
        { name: "defaults", type: "gsap.TweenVars", default: "{ duration: 0.5, ease: 'power2.inOut' }", description: "默认动画参数" },
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
      examples={[
        {
          title: "基本序列",
          description: "按顺序执行多个动画步骤",
          code: `<TimelineSequence
  steps={[
    { selector: '.el', to: { x: 100 }, position: 0 },
    { selector: '.el', to: { scale: 1.5 }, position: 0.5 },
  ]}
>
  <div className="el h-16 w-16 bg-blue-500" />
</TimelineSequence>`,
          render: () => (
            <div className="h-40 overflow-hidden rounded-lg bg-[var(--color-bg-surface)] p-6">
              <TimelineSequence
                steps={[
                  { selector: '.seq1', to: { x: 150, backgroundColor: '#f5576c' }, position: 0 },
                  { selector: '.seq1', to: { scale: 1.5, borderRadius: '50%' }, position: 0.5 },
                ]}
              >
                <div className="seq1 h-16 w-16 rounded-lg bg-[#667eea]" />
              </TimelineSequence>
            </div>
          ),
        },
        {
          title: "滚动驱动",
          description: "绑定 ScrollTrigger，随滚动进度播放",
          code: `<TimelineSequence
  steps={[{ selector: '.el', to: { x: 200 } }]}
  scrollTrigger scrub
>
  <div className="el h-16 w-16 bg-green-500" />
</TimelineSequence>`,
          render: () => (
            <div className="h-48 overflow-hidden rounded-lg bg-[var(--color-bg-surface)] p-6">
              <p className="mb-2 text-sm text-[var(--color-text-muted)]">向下滚动查看效果</p>
              <TimelineSequence
                steps={[
                  { selector: '.seq2a', to: { x: 200 }, position: 0 },
                  { selector: '.seq2b', to: { y: -60, rotation: 180 }, position: 0.5 },
                ]}
                scrollTrigger
                scrub={0.5}
              >
                <div className="relative h-32">
                  <div className="seq2a absolute left-0 top-0 h-12 w-12 rounded-lg bg-emerald-500" />
                  <div className="seq2b absolute left-0 top-16 h-12 w-12 rounded-lg bg-cyan-500" />
                </div>
              </TimelineSequence>
            </div>
          ),
        },
      ]}
      accessibility="TimelineSequence 使用 GSAP Timeline 编排动画序列。内容始终存在于 DOM 中，动画仅影响视觉效果。对于设置了 prefers-reduced-motion 的用户，所有子元素直接显示，跳过动画。"
    />
  );
}
