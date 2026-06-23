import { defineConfig } from 'tsup';

const skipDts = process.env.SKIP_DTS === '1';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'text-animations/blur-text': 'src/text-animations/blur-text/index.ts',
    'text-animations/gradient-text':
      'src/text-animations/gradient-text/index.ts',
    'text-animations/split-text': 'src/text-animations/split-text/index.ts',
    'text-animations/typewriter': 'src/text-animations/typewriter/index.ts',
    'text-animations/scramble-text':
      'src/text-animations/scramble-text/index.ts',
    'text-animations/wave-text': 'src/text-animations/wave-text/index.ts',
    'text-animations/glitch-text': 'src/text-animations/glitch-text/index.ts',
    'text-animations/count-up': 'src/text-animations/count-up/index.ts',
    'text-animations/decrypted-text':
      'src/text-animations/decrypted-text/index.ts',
    'text-animations/spring-number':
      'src/text-animations/spring-number/index.ts',
    'text-animations/neon-text':
      'src/text-animations/neon-text/index.ts',
    'text-animations/shiny-text':
      'src/text-animations/shiny-text/index.ts',
    'text-animations/rotating-text':
      'src/text-animations/rotating-text/index.ts',
    'animations/magnet': 'src/animations/magnet/index.ts',
    'animations/fade-content': 'src/animations/fade-content/index.ts',
    'animations/draggable': 'src/animations/draggable/index.ts',
    'animations/click-spark': 'src/animations/click-spark/index.ts',
    'animations/flip-card': 'src/animations/flip-card/index.ts',
    'animations/accordion': 'src/animations/accordion/index.ts',
    'animations/tabs': 'src/animations/tabs/index.ts',
    'animations/modal': 'src/animations/modal/index.ts',
    'animations/toast': 'src/animations/toast/index.ts',
    'animations/blob-cursor': 'src/animations/blob-cursor/index.ts',
    'animations/crosshair-cursor':
      'src/animations/crosshair-cursor/index.ts',
    'animations/float-animation': 'src/animations/float-animation/index.ts',
    'animations/stagger-animation':
      'src/animations/stagger-animation/index.ts',
    'animations/svg-path-draw': 'src/animations/svg-path-draw/index.ts',
    'animations/spring-morph': 'src/animations/spring-morph/index.ts',
    'animations/morphing-svg': 'src/animations/morphing-svg/index.ts',
    'animations/magnetic-button':
      'src/animations/magnetic-button/index.ts',
    'animations/hover-scale': 'src/animations/hover-scale/index.ts',
    'animations/fluid-cursor': 'src/animations/fluid-cursor/index.ts',
    'animations/scroll-parallax': 'src/animations/scroll-parallax/index.ts',
    'gsap-animations/scroll-reveal':
      'src/gsap-animations/scroll-reveal/index.ts',
    'gsap-animations/text-reveal': 'src/gsap-animations/text-reveal/index.ts',
    'gsap-animations/parallax': 'src/gsap-animations/parallax/index.ts',
    'gsap-animations/timeline-sequence':
      'src/gsap-animations/timeline-sequence/index.ts',
    'gsap-animations/scroll-progress':
      'src/gsap-animations/scroll-progress/index.ts',
    'gsap-animations/pin-section': 'src/gsap-animations/pin-section/index.ts',
    'gsap-animations/horizontal-scroll':
      'src/gsap-animations/horizontal-scroll/index.ts',
    'backgrounds/aurora': 'src/backgrounds/aurora/index.ts',
    'backgrounds/particles': 'src/backgrounds/particles/index.ts',
    'backgrounds/starfield': 'src/backgrounds/starfield/index.ts',
    'backgrounds/mesh-gradient': 'src/backgrounds/mesh-gradient/index.ts',
    'backgrounds/noise-background':
      'src/backgrounds/noise-background/index.ts',
    'backgrounds/hyperspeed': 'src/backgrounds/hyperspeed/index.ts',
    'backgrounds/grid-motion': 'src/backgrounds/grid-motion/index.ts',
    'backgrounds/particle-ocean': 'src/backgrounds/particle-ocean/index.ts',
    'backgrounds/generative-background':
      'src/backgrounds/generative-background/index.ts',
    'blocks/hero-sections': 'src/blocks/hero-sections/index.ts',
    'blocks/bento-grids': 'src/blocks/bento-grids/index.ts',
    'blocks/feature-sections': 'src/blocks/feature-sections/index.ts',
    'blocks/pricing-sections': 'src/blocks/pricing-sections/index.ts',
    'blocks/cta-sections': 'src/blocks/cta-sections/index.ts',
    'components/spotlight-card': 'src/components/spotlight-card/index.ts',
    'components/dock': 'src/components/dock/index.ts',
    'components/masonry': 'src/components/masonry/index.ts',
    'components/carousel': 'src/components/carousel/index.ts',
    'components/stack-cards': 'src/components/stack-cards/index.ts',
    'components/tilt-card': 'src/components/tilt-card/index.ts',
    'components/glow-card': 'src/components/glow-card/index.ts',
    'components/bounce-cards': 'src/components/bounce-cards/index.ts',
    'components/card-3d': 'src/components/card-3d/index.ts',
    'components/glass-card': 'src/components/glass-card/index.ts',
    'components/glass-navbar': 'src/components/glass-navbar/index.ts',
    'components/glass-modal': 'src/components/glass-modal/index.ts',
    'hooks/use-mouse-position': 'src/hooks/use-mouse-position.ts',
    'hooks/smooth-scroll': 'src/hooks/smooth-scroll/index.ts',
    'three-scene': 'src/three-scene/index.ts',
    'high-perf-particles': 'src/high-perf-particles/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: !skipDts,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'tailwindcss',
    'gsap',
    'motion/react',
    '@react-spring/web',
    'animejs',
  ],
});
