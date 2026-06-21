---
name: gsap-timeline
description: Official GSAP skill for Timelines — sequencing, position parameter, labels, nesting, playback control. Use when chaining multiple animations or building complex animation sequences.
license: MIT
---

# GSAP Timelines

## Why Timelines

Timelines sequence animations without chaining delays. They're easier to control (pause, reverse, seek) and more maintainable than delay-based chaining.

## Creating Timelines

```javascript
const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2" } });

tl.to(".a", { x: 100 })          // starts at time 0
  .to(".b", { y: 50 }, "+=0.2")  // 0.2s after previous ends
  .to(".c", { opacity: 0 }, "-=0.1"); // 0.1s before previous ends
```

## Position Parameter

| Value | Meaning |
|-------|---------|
| `0` (default) | Start at end of timeline |
| `"+=0.5"` | 0.5s after previous ends |
| `"-=0.2"` | 0.2s before previous ends |
| `"label"` | Start at named label |
| `"<"` | Start at start of previous |
| `">"` | Start at end of previous |

## Labels

```javascript
tl.add("intro")
  .to(".title", { opacity: 1 })
  .add("middle")
  .to(".body", { x: 100 });
tl.play("intro"); // jump to label
```

## Nesting Timelines

```javascript
const intro = gsap.timeline();
intro.to(".title", { opacity: 1 });

const main = gsap.timeline();
main.add(intro)           // nest at current position
    .add(intro, "+=1");   // nest with offset
```

## Playback Control

```javascript
tl.pause(); tl.play(); tl.reverse();
tl.seek(1.5); tl.progress(0.5);
tl.timeScale(2); // double speed
```

## Best Practices
- ✅ Use timelines for any sequence of 2+ animations
- ✅ Set defaults on the timeline for consistency
- ✅ Use labels for complex sequences
- ❌ Don't chain with manual delays when timelines exist
