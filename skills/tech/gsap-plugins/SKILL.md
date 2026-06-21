---
name: gsap-plugins
description: Official GSAP skill for plugins — ScrollToPlugin, ScrollSmoother, Flip, Draggable, Inertia, Observer, SplitText, ScrambleText, MotionPath, MorphSVG, CustomEase, EasePack, GSDevTools.
license: MIT
---

# GSAP Plugins

## Available Plugins (all free)

| Plugin | Use Case |
|--------|----------|
| **ScrollToPlugin** | Smooth scroll to elements/positions |
| **ScrollSmoother** | Smooth scrolling with parallax effects |
| **Flip** | Animate layout changes (add/remove/reorder) seamlessly |
| **Draggable** | Drag-and-drop, rotation, throw inertia |
| **Inertia** | Realistic momentum tracking |
| **Observer** | Detect scroll/wheel/touch/pointer events |
| **SplitText** | Split text into chars/words/lines for animation |
| **ScrambleText** | Decrypt/scramble text effect |
| **MotionPath** | Animate along SVG/bezier paths |
| **MorphSVG** | Morph between SVG shapes |
| **CustomEase** | Create custom easing curves |
| **EasePack** | Additional easing functions |
| **GSDevTools** | Debug timeline visualization |

## Quick Examples

### ScrollToPlugin
```javascript
gsap.to(window, { duration: 1, scrollTo: "#section2" });
```

### Flip
```javascript
const state = Flip.getState(".cards");
// ... change DOM ...
Flip.from(state, { duration: 0.6, stagger: 0.1 });
```

### SplitText
```javascript
const split = new SplitText(".title", { type: "chars,words" });
gsap.from(split.chars, { opacity: 0, y: 20, stagger: 0.02 });
```

### MotionPath
```javascript
gsap.to(".dot", {
  motionPath: { path: "#path", align: "#path" },
  duration: 3
});
```

## Registration
```javascript
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
```
