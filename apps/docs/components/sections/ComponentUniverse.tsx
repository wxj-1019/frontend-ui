"use client";

import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

interface NodeItem {
  id: string;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  category: string;
  href: string;
}

interface CategoryHub {
  id: string;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  componentCount: number;
  href: string;
}

/** 组件宇宙数据 */
function buildUniverse(width: number, height: number): { hubs: CategoryHub[]; nodes: NodeItem[] } {
  const cx = width / 2;
  const cy = height / 2;
  const hubRadius = Math.min(width, height) * 0.28;

  const categories = [
    { id: "text", label: "文字动画", color: "#00F5FF", count: 20, angle: -Math.PI / 2 },
    { id: "anim", label: "交互动画", color: "#FF006E", count: 30, angle: -Math.PI / 6 },
    { id: "comp", label: "复合组件", color: "#8B5CF6", count: 30, angle: Math.PI / 6 },
    { id: "bg", label: "背景特效", color: "#88CE02", count: 50, angle: Math.PI / 2 },
    { id: "block", label: "页面区块", color: "#FF6B6B", count: 20, angle: (5 * Math.PI) / 6 },
  ];

  const hubs: CategoryHub[] = categories.map((cat) => ({
    id: cat.id,
    label: cat.label,
    x: cx + Math.cos(cat.angle) * hubRadius,
    y: cy + Math.sin(cat.angle) * hubRadius,
    vx: 0,
    vy: 0,
    radius: 28,
    color: cat.color,
    componentCount: cat.count,
    href: `/${cat.id === "text" ? "text-animations" : cat.id === "anim" ? "animations" : cat.id === "comp" ? "components" : cat.id === "bg" ? "backgrounds" : "blocks"}`,
  }));

  const nodes: NodeItem[] = [];
  const sampleComponents: Record<string, string[]> = {
    text: ["BlurText", "GradientText", "SplitText", "TypingText", "WaveText"],
    anim: ["Magnet", "FadeContent", "ScrollReveal", "TiltCard", "ShuffleGrid"],
    comp: ["Dock", "SpotlightCard", "BounceCards", "LiquidGlass", "CountUp"],
    bg: ["Aurora", "Particles", "Hyperspeed", "Starfield", "Waves"],
    block: ["HeroSection", "BentoGrid", "PricingTable", "FeatureGrid", "CTA"],
  };

  hubs.forEach((hub) => {
    const samples = sampleComponents[hub.id] || [];
    samples.forEach((label, i) => {
      const angle = (i / samples.length) * Math.PI * 2;
      const dist = 50 + Math.random() * 30;
      nodes.push({
        id: `${hub.id}-${i}`,
        label,
        x: hub.x + Math.cos(angle) * dist,
        y: hub.y + Math.sin(angle) * dist,
        vx: 0,
        vy: 0,
        radius: 4 + Math.random() * 2,
        color: hub.color,
        category: hub.id,
        href: hub.href,
      });
    });
  });

  return { hubs, nodes };
}

export function ComponentUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const [hoveredHub, setHoveredHub] = useState<string | null>(null);
  const hubsRef = useRef<CategoryHub[]>([]);
  const nodesRef = useRef<NodeItem[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.offsetWidth;
    let height = container.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const init = buildUniverse(width, height);
    hubsRef.current = init.hubs;
    nodesRef.current = init.nodes;

    const resize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      const rebuilt = buildUniverse(width, height);
      hubsRef.current = rebuilt.hubs;
      nodesRef.current = rebuilt.nodes;
    };
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };

      // 检测悬浮的 hub
      let found: string | null = null;
      for (const hub of hubsRef.current) {
        const dx = hub.x - mouseRef.current.x;
        const dy = hub.y - mouseRef.current.y;
        if (Math.sqrt(dx * dx + dy * dy) < hub.radius + 5) {
          found = hub.id;
          break;
        }
      }
      setHoveredHub(found);
      canvas.style.cursor = found ? "pointer" : "default";
    };
    canvas.addEventListener("mousemove", onMouseMove);

    const onClick = () => {
      if (!hoveredHub) return;
      const hub = hubsRef.current.find((h) => h.id === hoveredHub);
      if (hub) {
        window.location.href = hub.href;
      }
    };
    canvas.addEventListener("click", onClick);

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const hubs = hubsRef.current;
      const nodes = nodesRef.current;

      // 更新节点位置（轻微浮动）
      if (!shouldReduce) {
        nodes.forEach((node) => {
          node.x += (Math.random() - 0.5) * 0.3;
          node.y += (Math.random() - 0.5) * 0.3;
        });
      }

      // 绘制 hub 之间的连线
      ctx.lineWidth = 1;
      for (let i = 0; i < hubs.length; i++) {
        for (let j = i + 1; j < hubs.length; j++) {
          const opacity = hoveredHub === hubs[i].id || hoveredHub === hubs[j].id ? 0.4 : 0.1;
          ctx.strokeStyle = `rgba(0, 245, 255, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(hubs[i].x, hubs[i].y);
          ctx.lineTo(hubs[j].x, hubs[j].y);
          ctx.stroke();
        }
      }

      // 绘制 hub 到子节点的连线
      nodes.forEach((node) => {
        const hub = hubs.find((h) => h.id === node.category);
        if (!hub) return;
        const isActive = hoveredHub === hub.id;
        ctx.strokeStyle = isActive
          ? hub.color + "60"
          : hub.color + "15";
        ctx.lineWidth = isActive ? 1 : 0.5;
        ctx.beginPath();
        ctx.moveTo(hub.x, hub.y);
        ctx.lineTo(node.x, node.y);
        ctx.stroke();
      });

      // 绘制子节点
      nodes.forEach((node) => {
        const hub = hubs.find((h) => h.id === node.category);
        const isActive = hub ? hoveredHub === hub.id : false;
        ctx.fillStyle = isActive ? node.color : node.color + "60";
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 绘制 hubs
      hubs.forEach((hub) => {
        const isHovered = hoveredHub === hub.id;
        const r = isHovered ? hub.radius + 4 : hub.radius;

        // 光晕
        if (isHovered) {
          const gradient = ctx.createRadialGradient(hub.x, hub.y, 0, hub.x, hub.y, r * 2.5);
          gradient.addColorStop(0, hub.color + "40");
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(hub.x, hub.y, r * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // 主圆
        ctx.fillStyle = hub.color + (isHovered ? "" : "30");
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, r, 0, Math.PI * 2);
        ctx.fill();

        // 边框
        ctx.strokeStyle = hub.color;
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, r, 0, Math.PI * 2);
        ctx.stroke();

        // 标签
        ctx.font = `${isHovered ? "bold " : ""}12px "Space Grotesk", sans-serif`;
        ctx.fillStyle = isHovered ? "#FFFFFF" : "#A8A8BC";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(hub.label, hub.x, hub.y - r - 12);

        // 数量
        ctx.font = '10px "Outfit", sans-serif';
        ctx.fillStyle = hub.color;
        ctx.fillText(`${hub.componentCount}+`, hub.x, hub.y);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", onClick);
      cancelAnimationFrame(animationId);
    };
  }, [shouldReduce, hoveredHub]);

  return (
    <div ref={containerRef} className="relative h-[500px] w-full overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
      <canvas ref={canvasRef} className="h-full w-full" />

      {/* Hint overlay */}
      <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg bg-[var(--color-bg-primary)]/80 px-3 py-2 text-xs text-[var(--color-text-subtle)] backdrop-blur-sm">
        悬浮节点查看分类 · 点击跳转
      </div>

      {/* Legend */}
      {hoveredHub && (
        <div className="pointer-events-none absolute right-4 top-4 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)]/90 px-4 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: hubsRef.current.find((h) => h.id === hoveredHub)?.color }}
            />
            <span className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
              {hubsRef.current.find((h) => h.id === hoveredHub)?.label}
            </span>
          </div>
          <p className="mt-1 text-xs text-[var(--color-text-muted)]">
            {hubsRef.current.find((h) => h.id === hoveredHub)?.componentCount}+ 个组件
          </p>
        </div>
      )}
    </div>
  );
}
