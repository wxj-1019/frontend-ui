---
name: canvas-2d-animation
description: Canvas 2D animation patterns for Frontend UI — particle systems, RAF loops, OffscreenCanvas + Worker, performance optimization, and lifecycle management. Use when building Canvas-based background or animation components.
---

# Canvas 2D Animation

Patterns and best practices for building high-performance Canvas 2D components in the Frontend UI library, covering particle systems, animation loops, worker offloading, and lifecycle management.

## When to Use

- Building Canvas-based background components (Particles, Starfield, etc.)
- Implementing particle systems or physics simulations
- Creating data visualization canvases
- Optimizing existing Canvas components for performance
- Deciding between Canvas 2D, SVG, or DOM for an animation

---

## 1. Architecture Patterns

### 1.1 Component Structure

```tsx
// packages/ui/src/backgrounds/particles/particles.tsx
'use client';

import { useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

interface ParticlesProps {
  count?: number;
  color?: string;
  className?: string;
}

export function Particles({
  count = 50,
  color = '#ffffff',
  className,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const isActiveRef = useRef(true);

  // Initialize particles
  const initParticles = useCallback(
    (width: number, height: number) => {
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          color,
        });
      }
      return particles;
    },
    [count, color]
  );

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActiveRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const particles = particlesRef.current;

    // Clear with trail effect (optional)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);

    // Update and draw particles
    particles.forEach((p) => {
      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Draw
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
      ctx.fill();
    });

    // Connect nearby particles (optional)
    connectParticles(ctx, particles, width, height);

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  // Resize handler
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      particlesRef.current = initParticles(canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [initParticles]);

  // Start/stop animation
  useEffect(() => {
    isActiveRef.current = true;
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      isActiveRef.current = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0', className)}
      style={{ width: '100%', height: '100%' }}
    />
  );
}

function connectParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  width: number,
  height: number
) {
  const maxDistance = 100;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        const opacity = (1 - distance / maxDistance) * 0.2;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
}
```

### 1.2 Lifecycle Management

```tsx
// Critical: Always cleanup RAF on unmount
useEffect(() => {
  const rafId = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(rafId);
}, []);

// Critical: Use refs for mutable state (avoid re-renders)
const stateRef = useRef({ x: 0, y: 0 });
// NOT: const [state, setState] = useState({ x: 0, y: 0 });

// Critical: Track visibility to pause when off-screen
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting && !rafRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    { threshold: 0.1 }
  );
  if (canvasRef.current) observer.observe(canvasRef.current);
  return () => observer.disconnect();
}, []);
```

---

## 2. Performance Optimization

### 2.1 Object Pooling

```typescript
// Avoid garbage collection from creating/destroying objects
class ParticlePool {
  private pool: Particle[] = [];
  private active: Particle[] = [];

  acquire(): Particle {
    return this.pool.pop() || this.createParticle();
  }

  release(particle: Particle): void {
    this.pool.push(particle);
  }

  private createParticle(): Particle {
    return { x: 0, y: 0, vx: 0, vy: 0, size: 0, opacity: 0, color: '' };
  }
}

// Usage: Reset instead of recreate
function resetParticle(p: Particle, width: number, height: number): void {
  p.x = Math.random() * width;
  p.y = Math.random() * height;
  p.vx = (Math.random() - 0.5) * 0.5;
  p.vy = (Math.random() - 0.5) * 0.5;
  // ... don't create new object
}
```

### 2.2 Batch Drawing Operations

```typescript
// BAD: Multiple draw calls per particle
particles.forEach(p => {
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
  ctx.fillStyle = p.color;
  ctx.fill();
});

// GOOD: Batch by color (if applicable)
function drawParticlesByColor(
  ctx: CanvasRenderingContext2D,
  particles: Particle[]
) {
  const colorMap = new Map<string, Particle[]>();
  particles.forEach(p => {
    const existing = colorMap.get(p.color) || [];
    existing.push(p);
    colorMap.set(p.color, existing);
  });

  colorMap.forEach((group, color) => {
    ctx.fillStyle = color;
    group.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
  });
}
```

### 2.3 Pixel Ratio Handling

```typescript
function setupHighDPICanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  // Set actual canvas size to match device pixels
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  // Scale context so CSS pixels match
  ctx.scale(dpr, dpr);

  // CSS size stays the same
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;
}
```

### 2.4 Offscreen Rendering

```typescript
// Pre-render static elements to offscreen canvas
function createOffscreenCanvas(width: number, height: number) {
  const offscreen = document.createElement('canvas');
  offscreen.width = width;
  offscreen.height = height;
  return offscreen.getContext('2d')!;
}

// Usage: Draw once, blit every frame
const offscreenCtx = createOffscreenCanvas(100, 100);
// ... draw complex shape once

// In animation loop:
ctx.drawImage(offscreenCtx.canvas, x, y);
```

---

## 3. Worker Offloading

### 3.1 OffscreenCanvas in Web Worker

```typescript
// worker.ts
self.onmessage = (e) => {
  const { canvas, width, height, count } = e.data;
  const offscreen = canvas as OffscreenCanvas;
  const ctx = offscreen.getContext('2d')!;

  offscreen.width = width;
  offscreen.height = height;

  const particles = initParticles(width, height, count);

  function animate() {
    ctx.clearRect(0, 0, width, height);
    updateParticles(particles, width, height);
    drawParticles(ctx, particles);
    requestAnimationFrame(animate);
  }

  animate();
};

// Component.tsx
const workerRef = useRef<Worker | null>(null);

useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas || !canvas.transferControlToOffscreen) return;

  const offscreen = canvas.transferControlToOffscreen();
  const worker = new Worker(new URL('./worker.ts', import.meta.url));

  workerRef.current = worker;
  worker.postMessage(
    { canvas: offscreen, width: 800, height: 600, count: 100 },
    [offscreen]
  );

  return () => worker.terminate();
}, []);
```

### 3.2 When to Use Workers

| Use Worker | Keep in Main Thread |
|-----------|-------------------|
| >1000 particles | <200 particles |
| Complex physics simulation | Simple floating particles |
| CPU-intensive generation | Static background rendering |
| Multiple independent canvases | Single hero canvas |

---

## 4. Interaction Patterns

### 4.1 Mouse/Touch Interaction

```typescript
const handleMouseMove = useCallback((e: MouseEvent) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  // Apply to particle system (e.g., repulsion)
  particlesRef.current.forEach(p => {
    const dx = p.x - mouseX;
    const dy = p.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) {
      const force = (100 - distance) / 100;
      p.vx += (dx / distance) * force * 0.5;
      p.vy += (dy / distance) * force * 0.5;
    }
  });
}, []);

useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  canvas.addEventListener('mousemove', handleMouseMove);
  return () => canvas.removeEventListener('mousemove', handleMouseMove);
}, [handleMouseMove]);
```

### 4.2 Responsive Canvas

```typescript
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const resizeObserver = new ResizeObserver(entries => {
    const entry = entries[0];
    const { width, height } = entry.contentRect;

    // Handle DPR
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    // Reinitialize particles for new size
    particlesRef.current = initParticles(width, height);
  });

  resizeObserver.observe(canvas.parentElement!);
  return () => resizeObserver.disconnect();
}, [initParticles]);
```

---

## 5. Common Patterns

### 5.1 Particle System Types

```typescript
// Floating particles (background)
const floating: ParticleConfig = {
  vx: () => (Math.random() - 0.5) * 0.3,
  vy: () => (Math.random() - 0.5) * 0.3,
  wrap: true,
  connect: true,
};

// Rising particles (confetti, bubbles)
const rising: ParticleConfig = {
  vx: () => (Math.random() - 0.5) * 0.5,
  vy: () => -Math.random() * 2 - 0.5,
  wrap: false,
  respawn: true,
};

// Explosion particles (burst effect)
const explosion: ParticleConfig = {
  vx: (angle: number) => Math.cos(angle) * speed,
  vy: (angle: number) => Math.sin(angle) * speed,
  decay: true,
  gravity: 0.1,
};
```

### 5.2 Trail Effect

```typescript
// Leave trailing paths instead of clearing fully
function drawWithTrail(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  // Semi-transparent clear creates trails
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, width, height);
}
```

### 5.3 Gradient Backgrounds

```typescript
function drawGradientBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#0f0c29');
  gradient.addColorStop(0.5, '#302b63');
  gradient.addColorStop(1, '#24243e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}
```

---

## 6. Testing Canvas Components

See `component-testing` skill for detailed patterns. Key points:

```typescript
// Mock canvas in tests
const mockContext = {
  fillRect: vi.fn(),
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  // ... etc
};

HTMLCanvasElement.prototype.getContext = vi.fn(() => mockContext);

// Test cleanup
it('cleans up RAF on unmount', () => {
  const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame');
  const { unmount } = render(<Particles />);
  unmount();
  expect(cancelSpy).toHaveBeenCalled();
});
```

---

## 7. Decision Matrix: Canvas vs SVG vs DOM

| Criteria | Canvas 2D | SVG | DOM/CSS |
|---------|-----------|-----|---------|
| **Particle count** | > 1000 | < 500 | < 100 |
| **Complex shapes** | ✅ Raster effects | ✅ Paths, filters | ❌ Limited |
| **Interactivity** | Manual hit detection | Native events | Native events |
| **Accessibility** | ❌ Needs fallback | ✅ Native | ✅ Native |
| **Resolution** | DPR scaling | Vector (crisp) | CSS scaling |
| **Memory** | Lower (bitmap) | Higher (DOM nodes) | Medium |
| **Animation type** | Procedural, physics | Path morphing | Transforms, transitions |

---

*Version: 1.0.0 | For Frontend UI Canvas Components*
