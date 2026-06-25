---
name: svg-animation
description: SVG animation patterns for Frontend UI — path morphing, stroke-dasharray animation, viewBox responsive scaling, and GSAP/Motion SVG integration. Use when building SVG-based animated components.
---

# SVG Animation

Patterns and best practices for building animated SVG components in the Frontend UI library, covering path interpolation, stroke animation, morphing, and responsive scaling.

## When to Use

- Building SVG path drawing animations (SvgPathDraw, MorphingSVG)
- Creating animated icons or loaders with SVG
- Implementing stroke-dasharray reveal effects
- Morphing between SVG shapes
- Deciding between SVG and Canvas for an animation

---

## 1. SVG Architecture Patterns

### 1.1 Component Structure

```tsx
// packages/ui/src/animations/svg-path-draw/svg-path-draw.tsx
'use client';

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SvgPathDrawProps {
  path: string;
  duration?: number;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
  trigger?: 'auto' | 'hover' | 'in-view';
}

export function SvgPathDraw({
  path,
  duration = 2,
  strokeColor = '#ffffff',
  strokeWidth = 2,
  className,
  trigger = 'auto',
}: SvgPathDrawProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const pathEl = pathRef.current;
    if (!pathEl) return;

    const length = pathEl.getTotalLength();

    // Set up initial state (hidden)
    pathEl.style.strokeDasharray = `${length}`;
    pathEl.style.strokeDashoffset = `${length}`;

    // Animate
    if (trigger === 'auto') {
      pathEl.style.transition = `stroke-dashoffset ${duration}s ease-in-out`;
      // Force reflow
      pathEl.getBoundingClientRect();
      pathEl.style.strokeDashoffset = '0';
    }
  }, [path, duration, trigger]);

  const handleHover = () => {
    if (trigger !== 'hover') return;
    const pathEl = pathRef.current;
    if (!pathEl) return;
    pathEl.style.transition = `stroke-dashoffset ${duration}s ease-in-out`;
    pathEl.style.strokeDashoffset = '0';
  };

  const handleLeave = () => {
    if (trigger !== 'hover') return;
    const pathEl = pathRef.current;
    if (!pathEl) return;
    const length = pathEl.getTotalLength();
    pathEl.style.transition = `stroke-dashoffset ${duration}s ease-in-out`;
    pathEl.style.strokeDashoffset = `${length}`;
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      className={cn('w-full h-full', className)}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <path
        ref={pathRef}
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
```

### 1.2 Responsive SVG with viewBox

```tsx
// Responsive SVG that scales to container
function ResponsiveSVG({
  children,
  viewBox = '0 0 100 100',
  preserveAspectRatio = 'xMidYMid meet',
  className,
}: ResponsiveSVGProps) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio={preserveAspectRatio}
      className={cn('w-full h-full', className)}
      // No width/height attributes — let CSS control
    >
      {children}
    </svg>
  );
}

// CSS: aspect-ratio maintains proportions
// .svg-container { aspect-ratio: 1; width: 100%; }
```

---

## 2. Stroke Animation Patterns

### 2.1 Stroke Dasharray Reveal

```typescript
// Core technique for drawing lines
function animateStroke(
  pathElement: SVGPathElement,
  duration: number = 1000
): Promise<void> {
  const length = pathElement.getTotalLength();

  // Reset
  pathElement.style.strokeDasharray = `${length}`;
  pathElement.style.strokeDashoffset = `${length}`;

  // Trigger animation
  return new Promise(resolve => {
    pathElement.style.transition = `stroke-dashoffset ${duration}ms ease-in-out`;
    pathElement.style.strokeDashoffset = '0';

    setTimeout(resolve, duration);
  });
}
```

### 2.2 Multi-Path Sequential Animation

```tsx
// Animate multiple paths in sequence
function SequentialPathDraw({ paths }: { paths: string[] }) {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    async function animateSequence() {
      for (let i = 0; i < pathRefs.current.length; i++) {
        const path = pathRefs.current[i];
        if (path) await animateStroke(path, 1000);
      }
    }
    animateSequence();
  }, [paths]);

  return (
    <svg viewBox="0 0 200 200">
      {paths.map((path, i) => (
        <path
          key={i}
          ref={el => (pathRefs.current[i] = el)}
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}
```

### 2.3 Stroke with Fill Follow-up

```tsx
// Draw stroke first, then fill
function StrokeThenFill({ path, fillColor }: { path: string; fillColor: string }) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const pathEl = pathRef.current;
    if (!pathEl) return;

    const length = pathEl.getTotalLength();

    // Phase 1: Set up for stroke animation
    pathEl.style.strokeDasharray = `${length}`;
    pathEl.style.strokeDashoffset = `${length}`;
    pathEl.style.fill = 'transparent';

    // Phase 2: Animate stroke (1s)
    setTimeout(() => {
      pathEl.style.transition = 'stroke-dashoffset 1s ease-in-out';
      pathEl.style.strokeDashoffset = '0';
    }, 100);

    // Phase 3: Fill after stroke completes
    setTimeout(() => {
      pathEl.style.transition = 'fill 0.5s ease-in-out';
      pathEl.style.fill = fillColor;
    }, 1100);
  }, [path, fillColor]);

  return (
    <path
      ref={pathRef}
      d={path}
      stroke="currentColor"
      strokeWidth="2"
      fill="transparent"
    />
  );
}
```

---

## 3. Path Morphing

### 3.1 Morphing with GSAP MorphSVG

```tsx
// packages/ui/src/animations/morphing-svg/morphing-svg.tsx
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

gsap.registerPlugin(MorphSVGPlugin);

interface MorphingSVGProps {
  paths: string[]; // Array of path data to morph between
  duration?: number;
  className?: string;
}

export function MorphingSVG({
  paths,
  duration = 1,
  className,
}: MorphingSVGProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const pathEl = pathRef.current;
    if (!pathEl || paths.length < 2) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    paths.forEach((path, i) => {
      if (i === 0) {
        pathEl.setAttribute('d', path);
      } else {
        tl.to(pathEl, {
          duration,
          morphSVG: path,
          ease: 'power2.inOut',
        });
      }
    });

    return () => { tl.kill(); };
  }, [paths, duration]);

  return (
    <svg viewBox="0 0 100 100" className={className}>
      <path ref={pathRef} fill="currentColor" />
    </svg>
  );
}
```

### 3.2 Compatible Path Morphing

```typescript
// Paths must have same number of anchor points for smooth morphing
// Use a tool like SVGPathEditor or Illustrator to ensure compatibility

// BAD: Different number of points
const pathA = 'M0,0 L50,50 L100,0';     // 3 points
const pathB = 'M0,50 L50,0 L100,50 L50,100'; // 4 points

// GOOD: Same structure (with compatible curves)
const pathA = 'M0,50 Q25,0 50,50 Q75,100 100,50';
const pathB = 'M0,50 Q25,100 50,50 Q75,0 100,50';

// Alternative: Use GSAP's MorphSVG point matching
// MorphSVGPlugin.convertToPath('#elementId');
```

---

## 4. SVG with Motion (Framer Motion)

### 4.1 Animated SVG Paths

```tsx
import { motion } from 'motion/react';

function AnimatedPath({ path }: { path: string }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
    </motion.svg>
  );
}
```

### 4.2 SVG Group Animation

```tsx
function AnimatedIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <motion.g
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: 'center' }}
      >
        <motion.path
          d="M12 5v14M5 12h14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{
            d: isOpen
              ? 'M12 5v14M5 12h14'  // Plus
              : 'M5 12h14',          // Minus (one line fades)
          }}
        />
      </motion.g>
    </svg>
  );
}
```

---

## 5. Advanced Patterns

### 5.1 SVG Filters for Glow Effects

```tsx
function GlowSVG({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 100 100">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#glow)">{children}</g>
    </svg>
  );
}
```

### 5.2 Clip Path Animation

```tsx
function ClipReveal({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 100 100">
      <defs>
        <clipPath id="circle-clip">
          <motion.circle
            cx="50"
            cy="50"
            r="0"
            animate={{ r: 100 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </clipPath>
      </defs>
      <g clipPath="url(#circle-clip)">{children}</g>
    </svg>
  );
}
```

### 5.3 SVG Pattern Animation

```tsx
// Animated pattern fill
function AnimatedPattern() {
  return (
    <svg viewBox="0 0 100 100">
      <defs>
        <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <motion.circle
            cx="5"
            cy="5"
            r="2"
            animate={{ r: [1, 3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#dots)" />
    </svg>
  );
}
```

---

## 6. Performance Considerations

### 6.1 SVG Optimization Rules

```typescript
// ❌ BAD: Inline styles that cause repaint
<path style={{ strokeDashoffset: animatedValue }} />

// ✅ GOOD: CSS transitions or Motion
<path style={{ transition: 'stroke-dashoffset 1s' }} />
// Or use Motion's animate prop

// ❌ BAD: Complex filters on every frame
<filter id="heavy">
  <feGaussianBlur />
  <feColorMatrix />
  <feBlend />
</filter>

// ✅ GOOD: Pre-bake complex effects or use CSS
// For simple glow, use drop-shadow CSS filter on the SVG container
```

### 6.2 DOM vs SVG Decision

| Use SVG | Use DOM |
|---------|---------|
| Icon animations | Layout animations |
| Path drawing | Card transitions |
| Shape morphing | Text animations |
| Data visualization | Grid/list animations |
| Complex curves | Simple transforms |

---

## 7. Accessibility

```tsx
// Always provide accessible alternatives
function AccessibleSVGAnimation({
  path,
  label,
}: {
  path: string;
  label: string;
}) {
  return (
    <div role="img" aria-label={label}>
      <svg aria-hidden="true" viewBox="0 0 100 100">
        <path d={path} />
      </svg>
    </div>
  );
}

// Respect reduced motion
const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)');

{prefersReduced ? (
  <svg viewBox="0 0 100 100">
    <path d={path} fill="currentColor" />
  </svg>
) : (
  <AnimatedPath path={path} />
)}
```

---

*Version: 1.0.0 | For Frontend UI SVG Components*
