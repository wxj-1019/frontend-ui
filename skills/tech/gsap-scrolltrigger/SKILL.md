---
name: gsap-scrolltrigger
description: Official GSAP skill for ScrollTrigger — scroll-linked animations, pinning, scrub, triggers. Use when building or recommending scroll-based animation, parallax, pinned sections.
license: MIT
---

# GSAP ScrollTrigger

## When to Use

Apply when implementing scroll-driven animations: triggering tweens/timelines on scroll, pinning elements, scrubbing animation to scroll position.

## Register

```javascript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
```

## Basic Trigger

```javascript
gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".box",
    start: "top center",      // when top of trigger hits center of viewport
    end: "bottom center",
    toggleActions: "play reverse play reverse"
  }
});
```

## Key Config Options

| Property | Description |
|----------|-------------|
| trigger | Element whose position defines the ScrollTrigger start |
| start | `"top bottom"` (default). Format: `"triggerPos viewportPos"` |
| end | `"bottom top"` (default). Use `"+=500"` for pixel distance |
| scrub | true (tie to scroll) or number for smoothing (e.g. `scrub: 1`) |
| pin | true (pin element during scroll) or `".selector"` |
| markers | true (show debug markers) |
| toggleActions | `"play reverse play reverse"` (enter/leave/enterBack/leaveBack) |

## Timeline + ScrollTrigger (preferred)

```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section",
    start: "top center",
    end: "bottom center",
    scrub: true
  }
});
tl.to(".panel", { x: 100 })
  .to(".panel", { rotation: 5 });
```

## Refresh on Layout Change

```javascript
// After DOM changes, image loads, etc.
ScrollTrigger.refresh();
```

## React Cleanup

```javascript
useGSAP(() => {
  gsap.to(".box", { x: 100, scrollTrigger: ".box" });
}, { scope: containerRef }); // ScrollTriggers auto-cleaned
```

## Best Practices
- ✅ Attach ScrollTrigger to timelines (not individual tweens) for complex sequences
- ✅ Call ScrollTrigger.refresh() after layout changes
- ✅ Pin only what's needed; scrub with small value for performance
- ❌ Don't create ScrollTriggers during SSR
- ❌ Don't forget cleanup in React (ctx.revert() or useGSAP)
