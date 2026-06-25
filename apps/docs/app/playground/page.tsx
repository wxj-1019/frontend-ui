'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';

// 磁性按钮组件
function MagneticButton({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="px-6 py-3 bg-[var(--color-accent)] text-[var(--color-bg-primary)] rounded-lg font-semibold transition-shadow hover:shadow-[0_0_30px_rgba(0,245,255,0.5)]"
    >
      {children}
    </motion.button>
  );
}

// 3D 卡片倾斜组件
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);
    setGlarePosition({ x: (e.clientX - rect.left) / rect.width * 100, y: (e.clientY - rect.top) / rect.height * 100 });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-[var(--color-bg-secondary)] rounded-xl p-6 cursor-pointer"
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 50%)`
        }}
      />
      {children}
    </motion.div>
  );
}

// 打字机效果组件
function Typewriter({ text, speed = 50 }: { text: string; speed?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className="font-mono text-[var(--color-accent)]">
      {displayText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
}

// 渐变文字组件
function GradientText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`bg-gradient-to-r from-[#00f5ff] via-[#8b5cf6] to-[#ff006e] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradient-shift_3s_ease_infinite] ${className}`}
    >
      {children}
    </span>
  );
}

// 霓虹发光文字组件
function NeonText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`text-[var(--color-accent)] ${className}`}
      style={{
        textShadow: '0 0 5px var(--color-accent), 0 0 10px var(--color-accent), 0 0 20px var(--color-accent), 0 0 40px var(--color-accent)'
      }}
    >
      {children}
    </span>
  );
}

// 毛玻璃卡片组件
function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[var(--color-bg-secondary)]/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
}

// 涟漪按钮组件
function RippleButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className="relative overflow-hidden px-6 py-3 bg-[var(--color-accent)] text-[var(--color-bg-primary)] rounded-lg font-semibold"
    >
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute w-4 h-4 bg-white/30 rounded-full animate-[ripple_0.6s_ease-out_forwards]"
          style={{
            left: ripple.x - 8,
            top: ripple.y - 8,
          }}
        />
      ))}
    </button>
  );
}

// 滚动视差组件
function ParallaxSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative h-[50vh] overflow-hidden rounded-xl">
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center">
          <h3 className="text-4xl font-bold text-[var(--color-text-primary)] mb-4">
            <GradientText>滚动视差效果</GradientText>
          </h3>
          <p className="text-[var(--color-text-muted)]">上下滚动查看视差动画</p>
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-accent)]/10 to-[var(--color-motion)]/10" />
    </div>
  );
}

// SVG 路径绘制组件
function SVGPathAnimation() {
  const [isComplete, setIsComplete] = useState(false);

  return (
    <div className="relative">
      <svg viewBox="0 0 200 200" className="w-full h-48">
        <motion.path
          d="M100 20 L180 80 L160 170 L40 170 L20 80 Z"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          onAnimationComplete={() => setIsComplete(true)}
        />
        {isComplete && (
          <motion.text
            x="100"
            y="100"
            textAnchor="middle"
            fill="var(--color-text-primary)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            完成!
          </motion.text>
        )}
      </svg>
      <button
        onClick={() => setIsComplete(false)}
        className="absolute bottom-2 right-2 px-3 py-1 text-xs bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] rounded hover:text-[var(--color-accent)] transition-colors"
      >
        重播
      </button>
    </div>
  );
}

// 流体光标组件
function FluidCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - 4}px`;
        cursorRef.current.style.top = `${e.clientY - 4}px`;
      }
      if (followerRef.current) {
        followerRef.current.style.left = `${e.clientX - 16}px`;
        followerRef.current.style.top = `${e.clientY - 16}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-2 h-2 bg-[var(--color-accent)] rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
      <div
        ref={followerRef}
        className="fixed w-8 h-8 border border-[var(--color-accent)] rounded-full pointer-events-none z-[9998] transition-transform duration-300 mix-blend-difference"
      />
    </>
  );
}

// 主页面组件
export default function PlaygroundPage() {
  const [activeSection, setActiveSection] = useState('magnetic');

  const sections = [
    { id: 'magnetic', label: '磁性按钮' },
    { id: 'tilt', label: '3D 倾斜' },
    { id: 'typewriter', label: '打字机' },
    { id: 'gradient', label: '渐变文字' },
    { id: 'neon', label: '霓虹发光' },
    { id: 'glass', label: '毛玻璃' },
    { id: 'ripple', label: '涟漪效果' },
    { id: 'parallax', label: '视差滚动' },
    { id: 'svg', label: 'SVG 绘制' },
    { id: 'cursor', label: '流体光标' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <FluidCursor />
      
      {/* 头部导航 */}
      <header className="sticky top-0 z-50 bg-[var(--color-bg-primary)]/80 backdrop-blur-xl border-b border-[var(--color-border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              <GradientText>特效演示</GradientText>
            </h1>
            <span className="text-sm text-[var(--color-text-muted)]">
              基于 Awwwards / Codrops / Godly 灵感
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* 侧边栏导航 */}
          <nav className="w-48 flex-shrink-0">
            <div className="sticky top-24 space-y-2">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                    activeSection === section.id
                      ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-l-2 border-[var(--color-accent)]'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)]'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </nav>

          {/* 主内容区 */}
          <main className="flex-1 space-y-8">
            {/* 磁性按钮演示 */}
            {activeSection === 'magnetic' && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold">磁性按钮</h2>
                <p className="text-[var(--color-text-muted)]">
                  按钮跟随鼠标移动，产生磁性吸引效果。常见于 Awwwards 获奖网站的 CTA 按钮。
                </p>
                <div className="flex gap-4 flex-wrap">
                  <MagneticButton>悬停我</MagneticButton>
                  <MagneticButton strength={0.5}>强磁性</MagneticButton>
                  <MagneticButton strength={0.1}>弱磁性</MagneticButton>
                </div>
              </motion.section>
            )}

            {/* 3D 倾斜演示 */}
            {activeSection === 'tilt' && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold">3D 卡片倾斜</h2>
                <p className="text-[var(--color-text-muted)]">
                  卡片跟随鼠标产生 3D 倾斜效果，带有光泽反射。常见于 Godly 精选网站。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TiltCard>
                    <div className="text-center">
                      <div className="text-4xl mb-4">🚀</div>
                      <h3 className="text-xl font-bold text-[var(--color-text-primary)]">GSAP</h3>
                      <p className="text-sm text-[var(--color-text-muted)] mt-2">专业级动画引擎</p>
                    </div>
                  </TiltCard>
                  <TiltCard>
                    <div className="text-center">
                      <div className="text-4xl mb-4">🎬</div>
                      <h3 className="text-xl font-bold text-[var(--color-text-primary)]">Motion</h3>
                      <p className="text-sm text-[var(--color-text-muted)] mt-2">React 动画库</p>
                    </div>
                  </TiltCard>
                </div>
              </motion.section>
            )}

            {/* 打字机演示 */}
            {activeSection === 'typewriter' && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold">打字机效果</h2>
                <p className="text-[var(--color-text-muted)]">
                  逐字显示文字，带有闪烁光标。常见于 Codrops 教程的 Hero 区域。
                </p>
                <div className="bg-[var(--color-bg-secondary)] rounded-xl p-8 font-mono text-2xl">
                  <Typewriter text="Welcome to Frontend UI" speed={80} />
                </div>
                <button
                  onClick={() => setActiveSection('typewriter')}
                  className="text-sm text-[var(--color-accent)] hover:underline"
                >
                  点击重新播放
                </button>
              </motion.section>
            )}

            {/* 渐变文字演示 */}
            {activeSection === 'gradient' && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold">渐变文字</h2>
                <p className="text-[var(--color-text-muted)]">
                  文字颜色渐变动画，常见于 Awwwards 获奖网站的标题设计。
                </p>
                <div className="space-y-4">
                  <h3 className="text-5xl font-bold">
                    <GradientText>Frontend UI</GradientText>
                  </h3>
                  <h4 className="text-3xl font-bold">
                    <GradientText>动画组件库</GradientText>
                  </h4>
                  <p className="text-lg">
                    <GradientText>130+ 精心设计的动画组件</GradientText>
                  </p>
                </div>
              </motion.section>
            )}

            {/* 霓虹发光演示 */}
            {activeSection === 'neon' && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold">霓虹发光</h2>
                <p className="text-[var(--color-text-muted)]">
                  文字和边框的霓虹发光效果，常见于赛博朋克风格的网站设计。
                </p>
                <div className="bg-[var(--color-bg-secondary)] rounded-xl p-8 space-y-6">
                  <h3 className="text-4xl font-bold text-center">
                    <NeonText>NEON GLOW</NeonText>
                  </h3>
                  <div className="flex justify-center gap-4">
                    <div className="px-6 py-3 border border-[var(--color-accent)] rounded-lg"
                      style={{ boxShadow: '0 0 10px var(--color-accent), inset 0 0 10px var(--color-accent)' }}>
                      发光边框
                    </div>
                    <div className="px-6 py-3 bg-[var(--color-accent)] rounded-lg"
                      style={{ boxShadow: '0 0 20px var(--color-accent), 0 0 40px var(--color-accent)' }}>
                      发光按钮
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* 毛玻璃演示 */}
            {activeSection === 'glass' && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold">毛玻璃效果</h2>
                <p className="text-[var(--color-text-muted)]">
                  半透明背景 + 模糊效果，现代 Web 设计的标配。
                </p>
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-motion)]/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GlassCard className="text-center">
                      <h3 className="text-xl font-bold text-[var(--color-text-primary)]">毛玻璃卡片</h3>
                      <p className="text-[var(--color-text-muted)] mt-2">backdrop-filter: blur(20px)</p>
                    </GlassCard>
                  </div>
                </div>
              </motion.section>
            )}

            {/* 涟漪效果演示 */}
            {activeSection === 'ripple' && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold">涟漪效果</h2>
                <p className="text-[var(--color-text-muted)]">
                  点击时产生波纹扩散效果，Material Design 风格。
                </p>
                <div className="flex gap-4">
                  <RippleButton>点击我</RippleButton>
                  <RippleButton>再次点击</RippleButton>
                </div>
                <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6">
                  <p className="text-sm text-[var(--color-text-muted)]">
                    💡 提示：点击按钮查看涟漪动画效果
                  </p>
                </div>
              </motion.section>
            )}

            {/* 视差滚动演示 */}
            {activeSection === 'parallax' && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold">视差滚动</h2>
                <p className="text-[var(--color-text-muted)]">
                  滚动时元素产生不同速度的位移，创造深度感。常见于 Codrops 教程。
                </p>
                <ParallaxSection />
              </motion.section>
            )}

            {/* SVG 绘制演示 */}
            {activeSection === 'svg' && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold">SVG 路径绘制</h2>
                <p className="text-[var(--color-text-muted)]">
                  SVG 路径逐帧绘制动画，常见于页面转场和加载动画。
                </p>
                <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6">
                  <SVGPathAnimation />
                </div>
              </motion.section>
            )}

            {/* 流体光标演示 */}
            {activeSection === 'cursor' && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold">流体光标</h2>
                <p className="text-[var(--color-text-muted)]">
                  自定义光标 + 跟随外圈，常见于 Godly 精选网站。
                </p>
                <div className="bg-[var(--color-bg-secondary)] rounded-xl p-8 text-center">
                  <p className="text-[var(--color-text-muted)]">
                    👆 移动鼠标查看自定义光标效果
                  </p>
                  <p className="text-sm text-[var(--color-text-subtle)] mt-2">
                    小圆点跟随鼠标，外圈延迟跟随
                  </p>
                </div>
              </motion.section>
            )}
          </main>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="border-t border-[var(--color-border-subtle)] mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-[var(--color-text-muted)]">
          基于 Awwwards、Codrops、Godly 2026 年设计趋势分析
        </div>
      </footer>

      {/* 全局样式 */}
      <style jsx global>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(10);
            opacity: 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
