---
name: threejs-animation
description: Three.js animation system — AnimationClip, AnimationMixer, skeletal animation, Morph Targets, animation blending. Use when building 3D animations with Three.js.
---

# Three.js Animation

Animation system patterns for Three.js.

## Setup

```javascript
import * as THREE from 'three';

// Create mixer for a 3D model
const mixer = new THREE.AnimationMixer(model);

// Play all animations
model.animations.forEach(clip => {
  mixer.clipAction(clip).play();
});
```

## Animation Loop

```javascript
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  mixer.update(delta); // update all active animations
  renderer.render(scene, camera);
}
```

## Control

```javascript
const action = mixer.clipAction(clip);
action.play();
action.pause();
action.stop();
action.fadeIn(0.5);     // smooth transition in
action.fadeOut(0.5);    // smooth transition out
action.crossFadeTo(otherAction, 0.5); // blend between animations
```

## Morph Targets

```javascript
// Animate between shapes
mesh.morphTargetInfluences[0] = 0; // first target at 0%
gsap.to(mesh.morphTargetInfluences, { 0: 1, duration: 2 });
```
