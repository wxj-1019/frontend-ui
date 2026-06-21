"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface EngineComparisonProps {
  title?: string;
}

const engines = [
  { id: "motion", name: "Motion", color: "#f0f" },
  { id: "gsap", name: "GSAP", color: "#88ce02" },
  { id: "spring", name: "react-spring", color: "#00ffaa" },
  { id: "anime", name: "Anime.js", color: "#ff6b6b" },
];

const demos = [
  {
    name: "淡入动画",
    motion: `initial={{ opacity: 0 }}\nanimate={{ opacity: 1 }}`,
    gsap: `gsap.from(el, {\n  opacity: 0,\n  duration: 0.5\n});`,
    spring: `from: { opacity: 0 },\nto: { opacity: 1 }`,
    anime: `animate(el, {\n  opacity: [0, 1],\n  duration: 500\n});`,
  },
  {
    name: "弹跳效果",
    motion: `animate={{ y: [0, -20, 0] }}\ntransition={{ type: "spring" }}`,
    gsap: `gsap.to(el, {\n  y: -20,\n  yoyo: true,\n  repeat: 1,\n  ease: "bounce.out"\n});`,
    spring: `from: { y: 0 },\nto: { y: -20 },\nconfig: { tension: 300 }`,
    anime: `animate(el, {\n  translateY: [0, -20, 0],\n  easing: "easeOutBounce"\n});`,
  },
  {
    name: "滚动触发",
    motion: `<motion.div\n  initial={{ opacity: 0 }}\n  whileInView={{ opacity: 1 }}\n/>`,
    gsap: `gsap.to(el, {\n  opacity: 1,\n  scrollTrigger: {\n    trigger: el\n  }\n});`,
    spring: `// 需要额外库\nreact-use-gesture`,
    anime: `// 需要手动实现\nwindow.addEventListener()`,
  },
];

/** 实时动画预览球 */
function PreviewBall({ engineId, playing, color }: { engineId: string; playing: boolean; color: string }) {
  const ballRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = (timestamp - startTimeRef.current) / 1000;
    const ball = ballRef.current;
    if (!ball) return;

    if (engineId === "motion") {
      const y = Math.abs(Math.sin(elapsed * 2)) * -30;
      const opacity = Math.min(1, elapsed * 2);
      ball.style.transform = `translateY(${y}px)`;
      ball.style.opacity = String(opacity);
    } else if (engineId === "gsap") {
      const t = (elapsed % 1.5) / 1.5;
      const eased = 1 - Math.pow(1 - t, 3);
      const y = -eased * 40;
      ball.style.transform = `translateY(${y}px)`;
      ball.style.opacity = String(0.3 + eased * 0.7);
    } else if (engineId === "spring") {
      const damping = Math.exp(-elapsed * 2);
      const oscillation = Math.cos(elapsed * 4);
      const y = damping * oscillation * -35;
      ball.style.transform = `translateY(${y}px)`;
      ball.style.opacity = String(Math.min(1, 0.2 + elapsed));
    } else if (engineId === "anime") {
      const t = (elapsed % 1.2) / 1.2;
      const elastic = Math.sin(t * Math.PI * 3) * Math.exp(-t * 3);
      const y = elastic * -25;
      ball.style.transform = `translateY(${y}px)`;
      ball.style.opacity = String(Math.min(1, elapsed * 1.5));
    }

    if (elapsed < 4) {
      frameRef.current = requestAnimationFrame(animate);
    } else {
      if (ball) {
        ball.style.transform = "translateY(0px)";
        ball.style.opacity = "0.3";
      }
    }
  }, [engineId]);

  useEffect(() => {
    if (playing) {
      startTimeRef.current = 0;
      frameRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(frameRef.current);
      if (ballRef.current) {
        ballRef.current.style.transform = "translateY(0px)";
        ballRef.current.style.opacity = "0.3";
      }
    }
    return () => cancelAnimationFrame(frameRef.current);
  }, [playing, animate]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div
          ref={ballRef}
          className="h-6 w-6 rounded-full"
          style={{ backgroundColor: color, willChange: "transform, opacity", opacity: 0.3 }}
        />
      </div>
    </div>
  );
}

export function EngineComparison({ title = "动画引擎对比" }: EngineComparisonProps) {
  const [selectedEngine, setSelectedEngine] = useState("motion");
  const [selectedDemo, setSelectedDemo] = useState(0);
  const [playing, setPlaying] = useState(false);

  const currentDemo = demos[selectedDemo];

  const getCode = () => {
    switch (selectedEngine) {
      case "motion":
        return currentDemo.motion;
      case "gsap":
        return currentDemo.gsap;
      case "spring":
        return currentDemo.spring;
      case "anime":
        return currentDemo.anime;
      default:
        return "";
    }
  };

  const handlePlay = () => {
    setPlaying(false);
    setTimeout(() => setPlaying(true), 50);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
      {/* Header */}
      <div className="border-b border-[var(--color-border-subtle)] px-6 py-4">
        <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
          {title}
        </h3>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          同一效果，不同引擎实现 — 点击播放查看实时对比
        </p>
      </div>

      {/* Demo Tabs */}
      <div
        role="tablist"
        aria-label="演示类型"
        className="flex gap-2 border-b border-[var(--color-border-subtle)] px-6 py-3"
      >
        {demos.map((demo, index) => (
          <button
            key={demo.name}
            role="tab"
            aria-selected={selectedDemo === index}
            aria-controls="demo-panel"
            id={`demo-tab-${index}`}
            onClick={() => setSelectedDemo(index)}
            className={`font-display rounded-lg px-3 py-1.5 text-sm transition-colors ${
              selectedDemo === index
                ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                : "text-[var(--color-text-muted)] hover:bg-[var(--color-hover)]"
            }`}
          >
            {demo.name}
          </button>
        ))}
      </div>

      {/* Live Preview Area */}
      <div className="border-b border-[var(--color-border-subtle)] px-6 py-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-display text-sm font-medium text-[var(--color-text-primary)]">
            实时预览
          </span>
          <button
            onClick={handlePlay}
            className="flex items-center gap-2 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            播放对比
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {engines.map((engine) => (
            <div key={engine.id} className="flex flex-col items-center gap-3 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] p-4">
              <PreviewBall engineId={engine.id} playing={playing} color={engine.color} />
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: engine.color }} />
                <span className="font-display text-xs font-medium text-[var(--color-text-muted)]">
                  {engine.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engine Tabs + Code */}
      <div className="flex flex-col sm:flex-row">
        {/* Engine Selector */}
        <div className="border-b border-[var(--color-border-subtle)] p-3 sm:w-48 sm:border-b-0 sm:border-r">
          <div role="tablist" aria-label="动画引擎" className="flex gap-1 sm:flex-col sm:space-y-1">
            {engines.map((engine) => (
              <button
                key={engine.id}
                role="tab"
                aria-selected={selectedEngine === engine.id}
                aria-controls="engine-code-panel"
                id={`engine-tab-${engine.id}`}
                onClick={() => setSelectedEngine(engine.id)}
                className={`flex flex-1 items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  selectedEngine === engine.id
                    ? "bg-[var(--color-hover)] text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-muted)] hover:bg-[var(--color-hover)]"
                }`}
              >
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: engine.color }} />
                {engine.name}
              </button>
            ))}
          </div>
        </div>

        {/* Code Display */}
        <div
          role="tabpanel"
          id="engine-code-panel"
          aria-labelledby={`engine-tab-${selectedEngine}`}
          className="flex-1 p-4"
        >
          <div className="rounded-lg bg-[var(--color-bg-primary)] p-4">
            <pre className="overflow-x-auto font-mono text-sm leading-relaxed text-[var(--color-text-primary)]">
              <code>{getCode()}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
