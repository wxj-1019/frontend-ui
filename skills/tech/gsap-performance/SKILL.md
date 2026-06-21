---
name: gsap-performance
description: Official GSAP skill for performance — prefer transforms, avoid layout thrashing, will-change, batching, quickTo. Use when optimizing GSAP animations, reducing jank, or when the user asks about animation performance, FPS, or smooth 60fps.
license: MIT
---

# GSAP Performance

## When to Use

Apply when optimizing GSAP animations for smooth 60fps, reducing layout/paint cost, or when the user asks about performance.

## Prefer Transform and Opacity

Animating transform and opacity keeps work on the compositor and avoids layout/paint:

- ✅ Prefer: x, y, scale, rotation, opacity
- ❌ Avoid: width, height, top, left, margin, padding

GSAP's x/y use transforms by default; use them instead of left/top.

## will-change

```css
.will-animate { will-change: transform; }
```
Use only on elements that actually animate. Remove after animation completes.

## Batch Reads and Writes

GSAP batches updates internally. When mixing with raw DOM, avoid interleaving reads and writes that cause layout thrashing.

## Many Elements

- Use stagger instead of separate tweens with manual delays
- For long lists, consider virtualization or animating only visible items
- Reuse timelines where possible

## quickTo() for Frequently Updated Properties

```javascript
let xTo = gsap.quickTo("#id", "x", { duration: 0.4, ease: "power3" });
let yTo = gsap.quickTo("#id", "y", { duration: 0.4, ease: "power3" });

element.addEventListener("mousemove", (e) => {
  xTo(e.pageX);
  yTo(e.pageY);
});
```

## ScrollTrigger Performance

- pin: true promotes the element; pin only what's needed
- scrub with small value (e.g. scrub: 1) reduces work during scroll
- Call ScrollTrigger.refresh() only when layout changes, debounce if possible

## Best Practices
- ✅ Animate transform and opacity; use will-change sparingly
- ✅ Use stagger instead of manual delays
- ✅ Use quickTo() for frequently updated properties (mouse followers)
- ✅ Clean up off-screen animations
- ❌ Never animate width/height for movement when x/y can do it
- ❌ Never set will-change on every element "just in case"
- ❌ Never create hundreds of overlapping tweens without testing
