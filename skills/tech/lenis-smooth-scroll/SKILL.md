---
name: lenis-smooth-scroll
description: Lenis smooth scroll implementation for Frontend UI — smooth scrolling, scroll-linked animations, integration with GSAP ScrollTrigger, and scroll snapping. Use when implementing smooth scrolling in pages or components.
---

# Lenis Smooth Scroll

Smooth scrolling implementation using Lenis, covering initialization, scroll-linked animations, GSAP ScrollTrigger integration, and scroll snapping for the Frontend UI library.

## When to Use

- Implementing smooth scrolling on a page
- Creating scroll-linked animations
- Integrating with GSAP ScrollTrigger
- Building scroll snapping sections
- Needing to programmatically scroll to elements

---

## 1. Core Setup

### 1.1 Basic Initialization

```tsx
// apps/docs/app/layout.tsx or page wrapper
'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,          // Scroll duration (seconds)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical', // 'vertical' | 'horizontal'
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
}

// Context for child components
import { createContext, useContext } from 'react';

const LenisContext = createContext<React.RefObject<Lenis | null>>({ current: null });

export function useLenis() {
  return useContext(LenisContext);
}
```

### 1.2 React Hook Wrapper

```tsx
// packages/ui/src/hooks/use-lenis/use-lenis.ts
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function useLenis(options?: ConstructorParameters<typeof Lenis>[0]) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis(options);
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return lenisRef;
}
```

---

## 2. Configuration Options

```typescript
interface LenisOptions {
  // Scroll duration in seconds (default: 1.2)
  duration?: number;

  // Custom easing function (default: exponential)
  easing?: (t: number) => number;

  // Scroll direction (default: 'vertical')
  orientation?: 'vertical' | 'horizontal';

  // Gesture direction (default: 'vertical')
  gestureOrientation?: 'vertical' | 'horizontal' | 'both';

  // Enable smooth wheel scrolling (default: true)
  smoothWheel?: boolean;

  // Wheel scroll multiplier (default: 1)
  wheelMultiplier?: number;

  // Touch scroll multiplier (default: 1)
  touchMultiplier?: number;

  // Infinite scroll mode (default: false)
  infinite?: boolean;
}

// Common presets
const presets = {
  default: {
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  },
  snappy: {
    duration: 0.8,
    easing: (t: number) => t * (2 - t),
  },
  smooth: {
    duration: 1.5,
    easing: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  },
};
```

---

## 3. Programmatic Scrolling

### 3.1 Scroll to Element

```tsx
import { useLenis } from '@/hooks/use-lenis';

function ScrollToButton() {
  const lenisRef = useLenis();

  const scrollToSection = () => {
    lenisRef.current?.scrollTo('#target-section', {
      offset: -100,     // Offset from target (px)
      duration: 1.5,    // Override duration
      immediate: false, // Skip smooth scroll
      lock: true,       // Lock scroll during animation
      onComplete: () => {
        console.log('Scroll complete');
      },
    });
  };

  return <button onClick={scrollToSection}>Scroll to Section</button>;
}
```

### 3.2 Scroll to Position

```tsx
// Scroll to specific pixel position
lenis.scrollTo(500, { duration: 1 });

// Scroll by relative amount
lenis.scrollTo(lenis.scroll + 200, { duration: 0.8 });

// Scroll to top
lenis.scrollTo(0, { duration: 1.5 });
```

---

## 4. GSAP ScrollTrigger Integration

### 4.1 Sync Lenis with ScrollTrigger

```tsx
// apps/docs/app/layout.tsx
'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}
```

### 4.2 Scroll-Linked Animation with Lenis + GSAP

```tsx
// packages/ui/src/gsap-animations/scroll-reveal/scroll-reveal.tsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from '@/hooks/use-lenis';

export function ScrollReveal({
  children,
  direction = 'up',
}: {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const offset = {
      up: { y: 50 },
      down: { y: -50 },
      left: { x: 50 },
      right: { x: -50 },
    };

    gsap.from(element, {
      ...offset[direction],
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });
  }, [direction]);

  return <div ref={ref}>{children}</div>;
}
```

---

## 5. Scroll Snapping

### 5.1 Section Snap with Lenis

```tsx
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

function ScrollSnapPage() {
  const lenisRef = useRef<Lenis | null>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      snap: {
        // Snap to nearest section
        snapTo: (value: number) => {
          const sectionHeights = sectionsRef.current.map(
            (section) => section.offsetTop
          );
          const nearest = sectionHeights.reduce((prev, curr) =>
            Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
          );
          return nearest;
        },
        duration: 0.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      },
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div>
      {Array.from({ length: 5 }).map((_, i) => (
        <section
          key={i}
          ref={(el) => { if (el) sectionsRef.current[i] = el; }}
          className="h-screen flex items-center justify-center"
        >
          Section {i + 1}
        </section>
      ))}
    </div>
  );
}
```

### 5.2 CSS Scroll Snap (Alternative)

```css
/* When you need native snap without Lenis */
.snap-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}

.snap-section {
  scroll-snap-align: start;
  height: 100vh;
}
```

---

## 6. Event Handling

### 6.1 Scroll Events

```tsx
import { useEffect } from 'react';
import { useLenis } from '@/hooks/use-lenis';

function ScrollProgress() {
  const lenisRef = useLenis();

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    lenis.on('scroll', (e: { scroll: number; limit: number; progress: number }) => {
      console.log('Scroll:', e.scroll);
      console.log('Limit:', e.limit);
      console.log('Progress:', e.progress); // 0 to 1
    });
  }, [lenisRef]);

  return <div>Scroll progress indicator here</div>;
}
```

### 6.2 Scroll State

```typescript
interface LenisScrollEvent {
  scroll: number;     // Current scroll position
  limit: number;      // Maximum scroll position
  velocity: number;   // Scroll velocity
  direction: number;  // 1 (down) or -1 (up)
  progress: number;   // 0 to 1
}

lenis.on('scroll', (e: LenisScrollEvent) => {
  // Update progress bar
  progressBar.style.width = `${e.progress * 100}%`;
  
  // Detect scroll direction
  if (e.direction === 1) {
    // Scrolling down
  } else {
    // Scrolling up
  }
  
  // Parallax based on velocity
  element.style.transform = `translateY(${e.velocity * 0.5}px)`;
});
```

---

## 7. Horizontal Scroll

```tsx
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lenis = new Lenis({
      orientation: 'horizontal',
      gestureOrientation: 'both',
      duration: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div ref={containerRef} className="flex overflow-hidden">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex-shrink-0 w-screen h-screen">
          Section {i + 1}
        </div>
      ))}
    </div>
  );
}
```

---

## 8. Integration with Frontend UI

### 8.1 Provider Pattern

```tsx
// packages/ui/src/hooks/smooth-scroll-provider.tsx
'use client';

import { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (target: string | number, options?: object) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
});

export function SmoothScrollProvider({
  children,
  options,
}: {
  children: React.ReactNode;
  options?: ConstructorParameters<typeof Lenis>[0];
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      ...options,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const scrollTo = (target: string | number, options?: object) => {
    lenisRef.current?.scrollTo(target, options);
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}
```

---

## 9. Common Issues

### 9.1 Scroll Position Not Updating

```tsx
// Ensure RAF loop is running
function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Don't use React state for scroll position
// ❌ Bad: const [scroll, setScroll] = useState(0);
// ✅ Good: lenis.on('scroll', (e) => { progressBar.style.width = ... });
```

### 9.2 Lenis + Next.js App Router

```tsx
// app/layout.tsx — use 'use client' for Lenis
// Wrap in a client component since Lenis needs window

'use client';
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
```

### 9.3 Mobile Touch Issues

```tsx
const lenis = new Lenis({
  touchMultiplier: 2,    // Increase touch sensitivity
  gestureOrientation: 'vertical',
  // If using swipe gestures, test on actual devices
});
```

---

*Version: 1.0.0 | For Frontend UI Smooth Scroll*
