---
name: gsap-frameworks
description: Official GSAP skill for Vue, Svelte, and other frameworks — lifecycle integration, scoping selectors, cleanup on unmount. Use when using GSAP outside React.
license: MIT
---

# GSAP with Other Frameworks

## Vue 3

```javascript
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';

const boxRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.to(boxRef.value, { x: 100 });
  }, boxRef.value);
});

onUnmounted(() => ctx.revert());
</script>
```

## Svelte

```javascript
<script>
import { onMount } from 'svelte';
import gsap from 'gsap';

let box;
let ctx;

onMount(() => {
  ctx = gsap.context(() => {
    gsap.to(box, { x: 100 });
  });
  return () => ctx.revert();
});
</script>
```

## Universal Pattern

Every framework follows the same pattern:
1. Get element reference (ref, template ref, etc.)
2. Create `gsap.context()` scoped to that element
3. Call `ctx.revert()` on unmount/destroy

This ensures animations and ScrollTriggers are properly cleaned up.
