---
name: gsap-react
description: Official GSAP skill for React — useGSAP hook, refs, gsap.context(), cleanup. Use when the user wants animation in React or Next.js, or asks about GSAP with React, useGSAP, or cleanup on unmount.
license: MIT
---

# GSAP with React

## Installation

```bash
npm install gsap @gsap/react
```

## useGSAP() Hook (Preferred)

```javascript
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

const containerRef = useRef(null);

useGSAP(() => {
  gsap.to(".box", { x: 100 });
  gsap.from(".item", { opacity: 0, stagger: 0.1 });
}, { scope: containerRef });
```

- ✅ Pass **scope** (ref or element) so selectors are scoped to that root
- ✅ Cleanup (reverting animations/ScrollTriggers) runs automatically on unmount
- ✅ Use **contextSafe** for callbacks so they no-op after unmount

## useGSAP Config

```javascript
useGSAP(() => {
  // gsap code here
}, { 
  dependencies: [endX],   // dependency array
  scope: container,       // scope selector
  revertOnUpdate: true    // revert + re-run on dependency change
});
```

## gsap.context() in useEffect (without useGSAP)

```javascript
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to(".box", { x: 100 });
  }, containerRef);
  return () => ctx.revert(); // ALWAYS cleanup!
}, []);
```

## contextSafe for Event Handlers

Animations created in event handlers AFTER useGSAP runs won't auto-cleanup. Wrap with contextSafe:

```javascript
useGSAP((context, contextSafe) => {
  const onClick = contextSafe(() => {
    gsap.to(goodRef.current, { rotation: 180 });
  });
  goodRef.current.addEventListener('click', onClick);
  return () => goodRef.current.removeEventListener('click', onClick);
});
```

## SSR (Next.js)

- GSAP runs only in browser. useGSAP/useEffect ensures client-only execution.
- Never call gsap.* or ScrollTrigger.* during SSR.

## Best Practices
- ✅ Prefer useGSAP() from @gsap/react
- ✅ Use refs for targets, pass scope
- ✅ Always cleanup (ctx.revert() or useGSAP auto-cleanup)
- ❌ Never target by selector without scope
- ❌ Never skip cleanup
- ❌ Never run GSAP during SSR
