---
name: animejs-animation
description: Anime.js animation patterns for Frontend UI — timeline sequencing, SVG path drawing, stagger animations, and easing functions. Use when building anime.js-based animations.
---

# Anime.js Animation

Animation patterns using Anime.js, covering timeline sequencing, SVG path drawing, stagger effects, and integration with React for the Frontend UI library.

## When to Use

- Building complex timeline animations
- Creating SVG path drawing effects
- Implementing staggered list animations
- Needing fine-grained easing control
- Combining multiple animations in sequence

---

## 1. Core Concepts

### 1.1 Anime.js vs Other Engines

```typescript
// Anime.js strengths:
// ✅ Timeline sequencing (best in class)
// ✅ SVG path morphing and drawing
// ✅ Stagger animations with complex delays
// ✅ Lightweight (~15kb)
// ✅ Works with any DOM element

// Use when:
// - Timeline control is critical
// - SVG path animations needed
// - Stagger patterns are complex
// - Bundle size matters

// Prefer GSAP when:
// - ScrollTrigger needed
// - Heavy timeline nesting
// - Plugin ecosystem required

// Prefer Motion when:
// - React-native feel desired
// - Layout animations needed
// - Declarative API preferred
```

### 1.2 Basic Animation

```tsx
import { useEffect, useRef } from 'react';
import anime from 'animejs';

function BasicAnimation() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const animation = anime({
      targets: elementRef.current,
      translateX: 250,
      rotate: '1turn',
      duration: 2000,
      easing: 'easeInOutQuad',
      loop: true,
      direction: 'alternate',
    });

    return () => animation.pause();
  }, []);

  return <div ref={elementRef} className="w-16 h-16 bg-primary rounded" />;
}
```

---

## 2. React Integration Patterns

### 2.1 useAnime Hook

```tsx
// packages/ui/src/hooks/use-anime/use-anime.ts
import { useEffect, useRef } from 'react';
import anime, { type AnimeParams } from 'animejs';

export function useAnime(
  params: Omit<AnimeParams, 'targets'> & { targets?: string | Element | NodeList },
  deps: React.DependencyList = []
) {
  const targetRef = useRef<HTMLElement>(null);
  const animationRef = useRef<anime.AnimeInstance | null>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    animationRef.current = anime({
      targets: targetRef.current,
      ...params,
    });

    return () => {
      animationRef.current?.pause();
    };
  }, deps);

  return { targetRef, animation: animationRef };
}

// Usage
function AnimatedBox() {
  const { targetRef } = useAnime({
    translateX: 100,
    duration: 1000,
    easing: 'easeInOutQuad',
    loop: true,
    direction: 'alternate',
  });

  return <div ref={targetRef} className="w-16 h-16 bg-primary rounded" />;
}
```

### 2.2 Anime.js Component Wrapper

```tsx
// packages/ui/src/animations/anime-wrapper/anime-wrapper.tsx
import { useEffect, useRef, useCallback } from 'react';
import anime, { type AnimeParams } from 'animejs';

interface AnimeWrapperProps {
  children: React.ReactNode;
  animation: Omit<AnimeParams, 'targets'>;
  playOnMount?: boolean;
  trigger?: 'hover' | 'click' | 'in-view' | 'auto';
}

export function AnimeWrapper({
  children,
  animation,
  playOnMount = true,
  trigger = 'auto',
}: AnimeWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<anime.AnimeInstance | null>(null);

  const createAnimation = useCallback(() => {
    if (!containerRef.current) return;

    animationRef.current = anime({
      targets: containerRef.current.children,
      ...animation,
      autoplay: false,
    });

    if (playOnMount) {
      animationRef.current.play();
    }
  }, [animation, playOnMount]);

  useEffect(() => {
    createAnimation();
    return () => animationRef.current?.pause();
  }, [createAnimation]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') animationRef.current?.play();
  };

  const handleClick = () => {
    if (trigger === 'click') {
      animationRef.current?.restart();
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
```

---

## 3. Timeline Sequencing

### 3.1 Basic Timeline

```tsx
import anime from 'animejs';

function createTimeline() {
  const tl = anime.timeline({
    easing: 'easeOutExpo',
    duration: 750,
  });

  tl.add({
    targets: '.element-1',
    translateX: 250,
  })
  .add({
    targets: '.element-2',
    translateX: 250,
  }, '-=500') // Overlap by 500ms
  .add({
    targets: '.element-3',
    translateX: 250,
    rotate: 45,
  }, '+=100'); // Wait 100ms after previous

  return tl;
}
```

### 3.2 Timeline Component

```tsx
// packages/ui/src/animations/anime-timeline/anime-timeline.tsx
import { useEffect, useRef } from 'react';
import anime from 'animejs';

interface TimelineStep {
  targets: string;
  properties: anime.AnimeParams;
  offset?: string | number;
}

interface AnimeTimelineProps {
  steps: TimelineStep[];
  loop?: boolean;
  direction?: 'normal' | 'reverse' | 'alternate';
}

export function AnimeTimeline({ steps, loop = false, direction = 'normal' }: AnimeTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = anime.timeline({
      loop,
      direction,
    });

    steps.forEach((step) => {
      tl.add({
        targets: containerRef.current!.querySelectorAll(step.targets),
        ...step.properties,
      }, step.offset);
    });

    return () => tl.pause();
  }, [steps, loop, direction]);

  return <div ref={containerRef} />;
}
```

---

## 4. SVG Path Drawing

### 4.1 Stroke Animation

```tsx
import { useEffect, useRef } from 'react';
import anime from 'animejs';

function SvgPathDraw() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    // Set up dash array
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    anime({
      targets: path,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 2000,
      direction: 'alternate',
      loop: true,
    });
  }, []);

  return (
    <svg viewBox="0 0 200 200">
      <path
        ref={pathRef}
        d="M100,10 L190,190 L10,190 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
```

### 4.2 Multi-Path Drawing

```tsx
function MultiPathDraw() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const paths = containerRef.current.querySelectorAll('path');

    anime({
      targets: paths,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1500,
      delay: anime.stagger(200),
      direction: 'alternate',
      loop: true,
    });
  }, []);

  return (
    <div ref={containerRef}>
      <svg viewBox="0 0 100 100">
        <path d="M10,50 L90,50" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M50,10 L50,90" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M20,20 L80,80" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
}
```

---

## 5. Stagger Animations

### 5.1 Grid Stagger

```tsx
function GridStagger() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    anime({
      targets: containerRef.current.children,
      scale: [
        { value: 0.1, easing: 'easeOutSine', duration: 500 },
        { value: 1, easing: 'easeInOutQuad', duration: 1200 },
      ],
      delay: anime.stagger(200, { grid: [5, 5], from: 'center' }),
      loop: true,
    });
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-5 gap-2">
      {Array.from({ length: 25 }).map((_, i) => (
        <div key={i} className="w-8 h-8 bg-primary rounded" />
      ))}
    </div>
  );
}
```

### 5.2 Stagger with Custom Easing

```tsx
anime({
  targets: '.list-item',
  translateX: 100,
  delay: anime.stagger(100, {
    start: 500,
    from: 'first',
    direction: 'normal',
  }),
  easing: 'spring(1, 80, 10, 0)',
});
```

---

## 6. Easing Functions

### 6.1 Built-in Easings

```typescript
// Linear
'easeOutQuad'
'easeInOutCubic'
'easeInOutQuart'

// Elastic
'easeOutElastic'
'easeInOutElastic'

// Bounce
'easeOutBounce'
'easeInOutBounce'

// Back
'easeInOutBack'
'easeOutBack'

// Spring (anime.js v4+)
'spring(mass, stiffness, damping, velocity)'
// Example: 'spring(1, 80, 10, 0)'
```

### 6.2 Custom Easing

```typescript
anime({
  targets: '.element',
  translateX: 100,
  easing: function(el, i, total) {
    return function(t) {
      return Math.pow(t, 2 + (i / total));
    };
  },
});
```

---

## 7. Integration with Frontend UI

### 7.1 Component Pattern

```tsx
// packages/ui/src/animations/anime-fade/anime-fade.tsx
'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { cn } from '@/lib/utils';

interface AnimeFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function AnimeFade({
  children,
  className,
  delay = 0,
  duration = 800,
  direction = 'up',
}: AnimeFadeProps) {
  const ref = useRef<HTMLDivElement>(null);

  const directions = {
    up: { y: [30, 0] },
    down: { y: [-30, 0] },
    left: { x: [30, 0] },
    right: { x: [-30, 0] },
  };

  useEffect(() => {
    if (!ref.current) return;

    const animation = anime({
      targets: ref.current,
      opacity: [0, 1],
      ...directions[direction],
      duration,
      delay,
      easing: 'easeOutExpo',
    });

    return () => animation.pause();
  }, [direction, delay, duration]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
```

### 7.2 prefers-reduced-motion

```tsx
import { useEffect, useRef } from 'react';
import anime from 'animejs';

function AccessibleAnime({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!ref.current || prefersReduced) return;

    const animation = anime({
      targets: ref.current,
      opacity: [0, 1],
      duration: 500,
      easing: 'easeOutQuad',
    });

    return () => animation.pause();
  }, [prefersReduced]);

  return (
    <div ref={ref} style={{ opacity: prefersReduced ? 1 : undefined }}>
      {children}
    </div>
  );
}
```

---

## 8. Utility Functions

### 8.1 Animation Helpers

```typescript
// packages/ui/src/lib/anime-utils.ts
import anime from 'animejs';

export function animateInView(
  element: Element,
  animation: anime.AnimeParams
): IntersectionObserver {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        anime({ targets: element, ...animation });
        observer.disconnect();
      }
    },
    { threshold: 0.1 }
  );

  observer.observe(element);
  return observer;
}

export function createScrollProgress(
  element: Element,
  callback: (progress: number) => void
): () => void {
  const handleScroll = () => {
    const rect = element.getBoundingClientRect();
    const progress = 1 - rect.top / window.innerHeight;
    callback(Math.max(0, Math.min(1, progress)));
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}
```

---

*Version: 1.0.0 | For Frontend UI Anime.js Components*
