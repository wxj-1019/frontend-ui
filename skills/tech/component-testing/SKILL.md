---
name: component-testing
description: Frontend UI component testing methodology — unit tests, integration tests, animation tests, Canvas tests, and accessibility tests. Use when writing or reviewing tests for React components, especially animation components using Motion, GSAP, Canvas, or CSS transitions.
---

# Component Testing Methodology

Comprehensive testing guide for the Frontend UI component library, covering React Testing Library, Vitest, jest-axe, and animation-specific testing patterns.

## When to Use

- Writing new component tests
- Reviewing existing test coverage
- Testing animation components (Motion, GSAP, CSS)
- Testing Canvas/WebGL components
- Running accessibility audits in tests

---

## 1. Test Setup

### 1.1 Global Test Configuration

```typescript
// packages/ui/src/test-setup.ts
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Add jest-dom matchers (toBeInTheDocument, toHaveClass, etc.)
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver for scroll-triggered tests
class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});

// Mock ResizeObserver
class MockResizeObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}
Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: MockResizeObserver,
});
```

### 1.2 Vitest Configuration

```typescript
// packages/ui/vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.stories.tsx', 'src/test-setup.ts', 'src/test-utils/**'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

---

## 2. Basic Component Testing

### 2.1 Standard Component Test Template

```typescript
// packages/ui/src/text-animations/blur-text/blur-text.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BlurText } from './blur-text';

describe('BlurText', () => {
  it('renders with default props', () => {
    render(<BlurText text="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<BlurText text="Hello" className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders with as prop (different HTML tag)', () => {
    render(<BlurText text="Hello" as="h1" />);
    expect(screen.getByText('Hello').tagName).toBe('H1');
  });

  it('matches snapshot', () => {
    const { container } = render(<BlurText text="Hello" />);
    expect(container).toMatchSnapshot();
  });
});
```

### 2.2 Testing Props and Variants

```typescript
// packages/ui/src/components/button/button.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders all variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-secondary');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const { user } = render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## 3. Animation Component Testing

### 3.1 Motion (Framer Motion) Components

```typescript
// packages/ui/src/animations/fade-content/fade-content.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { FadeContent } from './fade-content';

describe('FadeContent', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders children', () => {
    render(
      <FadeContent>
        <div data-testid="child">Content</div>
      </FadeContent>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('animates from hidden to visible', async () => {
    const { container } = render(
      <FadeContent>
        <div>Animated</div>
      </FadeContent>
    );

    // Initial state: opacity should be 0 (or low)
    const element = container.firstChild as HTMLElement;
    
    // Advance timers to complete animation
    vi.advanceTimersByTime(600);
    
    await waitFor(() => {
      expect(element).toHaveStyle('opacity: 1');
    });
  });

  it('respects delay prop', async () => {
    render(<FadeContent delay={0.5}>Content</FadeContent>);
    
    // At 400ms, animation should not have started
    vi.advanceTimersByTime(400);
    // Element might still be invisible
    
    // At 600ms, animation should be complete
    vi.advanceTimersByTime(200);
    await waitFor(() => {
      expect(screen.getByText('Content')).toBeVisible();
    });
  });
});
```

### 3.2 GSAP Components

```typescript
// packages/ui/src/gsap-animations/scroll-reveal/scroll-reveal.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScrollReveal } from './scroll-reveal';

// Mock GSAP
ci.mock('gsap', () => ({
  __esModule: true,
  default: {
    registerPlugin: vi.fn(),
    from: vi.fn(() => ({ kill: vi.fn() })),
    to: vi.fn(() => ({ kill: vi.fn() })),
    matchMedia: vi.fn(() => ({
      add: vi.fn(() => vi.fn()),
      revert: vi.fn(),
    })),
  },
}));

ci.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn(),
    refresh: vi.fn(),
  },
}));

describe('ScrollReveal', () => {
  it('renders children', () => {
    render(
      <ScrollReveal>
        <div data-testid="content">Revealed Content</div>
      </ScrollReveal>
    );
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('applies direction-based offset', () => {
    const { container } = render(
      <ScrollReveal direction="up">
        <div>Content</div>
      </ScrollReveal>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('cleans up on unmount', () => {
    const { unmount } = render(
      <ScrollReveal>
        <div>Content</div>
      </ScrollReveal>
    );
    expect(() => unmount()).not.toThrow();
  });
});
```

### 3.3 CSS Animation Components

```typescript
// packages/ui/src/text-animations/typewriter/typewriter.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Typewriter } from './typewriter';

describe('Typewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders text character by character', async () => {
    render(<Typewriter text="Hello" speed={100} />);
    
    // Initially empty or first character
    vi.advanceTimersByTime(50);
    
    // After 500ms, should show more characters
    vi.advanceTimersByTime(500);
    await waitFor(() => {
      const text = screen.getByText('Hello');
      expect(text).toBeInTheDocument();
    });
  });

  it('calls onComplete when typing finishes', async () => {
    const onComplete = vi.fn();
    render(<Typewriter text="Hi" speed={50} onComplete={onComplete} />);
    
    vi.advanceTimersByTime(200);
    
    await waitFor(() => {
      expect(onComplete).toHaveBeenCalled();
    });
  });
});
```

---

## 4. Canvas Component Testing

### 4.1 Canvas Mock Setup

```typescript
// Add to test-setup.ts
class MockCanvasRenderingContext2D {
  fillStyle = '';
  strokeStyle = '';
  lineWidth = 1;
  globalAlpha = 1;
  
  fillRect = vi.fn();
  strokeRect = vi.fn();
  clearRect = vi.fn();
  beginPath = vi.fn();
  moveTo = vi.fn();
  lineTo = vi.fn();
  arc = vi.fn();
  fill = vi.fn();
  stroke = vi.fn();
  save = vi.fn();
  restore = vi.fn();
  translate = vi.fn();
  rotate = vi.fn();
  scale = vi.fn();
  getImageData = vi.fn(() => ({ data: new Uint8ClampedArray(4) }));
  putImageData = vi.fn();
  createLinearGradient = vi.fn(() => ({
    addColorStop: vi.fn(),
  }));
  createRadialGradient = vi.fn(() => ({
    addColorStop: vi.fn(),
  }));
  measureText = vi.fn(() => ({ width: 0 }));
  fillText = vi.fn();
  
  canvas = { width: 0, height: 0 };
}

// Mock HTMLCanvasElement
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: vi.fn((contextId: string) => {
    if (contextId === '2d') {
      return new MockCanvasRenderingContext2D();
    }
    return null;
  }),
});

Object.defineProperty(HTMLCanvasElement.prototype, 'toDataURL', {
  value: vi.fn(() => 'data:image/png;base64,'),
});
```

### 4.2 Canvas Component Test

```typescript
// packages/ui/src/backgrounds/particles/particles.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Particles } from './particles';

describe('Particles', () => {
  it('renders canvas element', () => {
    const { container } = render(<Particles />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Particles className="custom-particles" />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toHaveClass('custom-particles');
  });

  it('respects count prop', () => {
    const { container } = render(<Particles count={50} />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    // Note: Actual particle count verification requires canvas snapshot testing
  });

  it('cleans up animation frame on unmount', () => {
    const cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame');
    const { unmount } = render(<Particles />);
    unmount();
    expect(cancelAnimationFrameSpy).toHaveBeenCalled();
    cancelAnimationFrameSpy.mockRestore();
  });
});
```

---

## 5. Accessibility Testing

### 5.1 jest-axe Integration

```typescript
// packages/ui/src/test-utils/axe.ts
import { configureToMatchJestA11y } from 'jest-axe';

export const toMatchJestA11y = configureToMatchJestA11y();

// Usage in test-setup.ts
// expect.extend({ toMatchJestA11y });
```

### 5.2 Accessibility Test Patterns

```typescript
// packages/ui/src/components/modal/modal.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './modal';
import { toHaveNoViolations } from 'jest-axe';
import { axe } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Modal', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <Modal open title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('traps focus within the modal', async () => {
    const user = userEvent.setup();
    render(
      <Modal open title="Focus Test">
        <button>First</button>
        <button>Second</button>
      </Modal>
    );

    const firstButton = screen.getByRole('button', { name: 'First' });
    const secondButton = screen.getByRole('button', { name: 'Second' });

    // Tab should cycle between buttons
    await user.tab();
    expect(firstButton).toHaveFocus();
    
    await user.tab();
    expect(secondButton).toHaveFocus();
  });

  it('closes on Escape key', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<Modal open title="Escape Test" onClose={onClose} />);
    
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('has correct ARIA attributes', () => {
    render(<Modal open title="ARIA Test" />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby');
  });
});
```

### 5.3 prefers-reduced-motion Testing

```typescript
// packages/ui/src/animations/magnet/magnet.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Magnet } from './magnet';

describe('Magnet', () => {
  it('respects prefers-reduced-motion', () => {
    // Mock matchMedia to return reduced motion preference
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { container } = render(
      <Magnet>
        <button>Magnet</button>
      </Magnet>
    );

    // In reduced motion mode, transforms should be minimal or none
    expect(container.firstChild).toBeInTheDocument();
  });
});
```

---

## 6. Event and Interaction Testing

### 6.1 Mouse Interactions

```typescript
// packages/ui/src/components/spotlight-card/spotlight-card.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SpotlightCard } from './spotlight-card';

describe('SpotlightCard', () => {
  it('tracks mouse position on hover', () => {
    const { container } = render(
      <SpotlightCard>
        <div>Card Content</div>
      </SpotlightCard>
    );

    const card = container.firstChild as HTMLElement;
    
    fireEvent.mouseMove(card, { clientX: 100, clientY: 100 });
    
    // Verify spotlight position updates (CSS variable or inline style)
    expect(card).toHaveStyle('--mouse-x: 100px');
  });

  it('removes spotlight on mouse leave', () => {
    const { container } = render(
      <SpotlightCard>
        <div>Card Content</div>
      </SpotlightCard>
    );

    const card = container.firstChild as HTMLElement;
    fireEvent.mouseMove(card, { clientX: 100, clientY: 100 });
    fireEvent.mouseLeave(card);
    
    // Spotlight should be hidden or reset
    expect(card).toHaveStyle('--mouse-opacity: 0');
  });
});
```

### 6.2 Touch and Drag Interactions

```typescript
// packages/ui/src/animations/draggable/draggable.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Draggable } from './draggable';

describe('Draggable', () => {
  it('drags element with mouse', () => {
    const { container } = render(
      <Draggable>
        <div data-testid="draggable">Drag me</div>
      </Draggable>
    );

    const element = screen.getByTestId('draggable');
    
    fireEvent.mouseDown(element, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(element, { clientX: 100, clientY: 50 });
    fireEvent.mouseUp(element);
    
    // Verify position change
    expect(element).toHaveStyle('transform: translate(100px, 50px)');
  });

  it('respects boundary constraints', () => {
    const { container } = render(
      <Draggable boundary="parent">
        <div data-testid="draggable">Drag me</div>
      </Draggable>
    );

    const element = screen.getByTestId('draggable');
    
    // Try to drag outside boundary
    fireEvent.mouseDown(element, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(element, { clientX: 9999, clientY: 9999 });
    fireEvent.mouseUp(element);
    
    // Should be constrained within parent
    // (exact assertion depends on implementation)
  });
});
```

---

## 7. Hook Testing

### 7.1 Custom Hook Test Pattern

```typescript
// packages/ui/src/hooks/use-mouse-position/use-mouse-position.test.ts
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMousePosition } from './use-mouse-position';

describe('useMousePosition', () => {
  it('returns initial position (0, 0)', () => {
    const { result } = renderHook(() => useMousePosition());
    expect(result.current.x).toBe(0);
    expect(result.current.y).toBe(0);
  });

  it('updates position on mouse move', () => {
    const { result } = renderHook(() => useMousePosition());
    
    act(() => {
      window.dispatchEvent(
        new MouseEvent('mousemove', { clientX: 100, clientY: 200 })
      );
    });
    
    expect(result.current.x).toBe(100);
    expect(result.current.y).toBe(200);
  });

  it('cleans up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useMousePosition());
    
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
```

---

## 8. Snapshot and Visual Testing

### 8.1 Snapshot Testing Guidelines

```typescript
// Use snapshots for stable component markup
describe('Component Snapshot', () => {
  it('matches snapshot', () => {
    const { container } = render(<BlurText text="Snapshot" />);
    expect(container).toMatchSnapshot();
  });
});
```

### 8.2 When to Use Snapshots

| ✅ Use Snapshots | ❌ Avoid Snapshots |
|------------------|-------------------|
| Static markup structure | Dynamic/animated content |
| Component variants | Data-dependent renders |
| Theme token outputs | Random IDs or timestamps |

---

## 9. Coverage Targets

```typescript
// vitest.config.ts coverage targets
coverage: {
  thresholds: {
    statements: 85,
    branches: 80,
    functions: 85,
    lines: 85,
  },
}
```

### Coverage Priorities by Component Type

| Component Type | Target Coverage | Critical Tests |
|-----------------|-----------------|--------------|
| **Text Animations** | 90% | Props, animation completion, onComplete callback |
| **Animations** | 85% | Interaction events, state transitions, cleanup |
| **Components** | 90% | Accessibility, keyboard nav, focus management |
| **Backgrounds** | 70% | Canvas rendering, resize handling, cleanup |
| **GSAP Animations** | 75% | ScrollTrigger integration, timeline sequencing |
| **Blocks** | 80% | Layout, responsive behavior, content rendering |
| **Hooks** | 95% | All return values, cleanup, edge cases |

---

## 10. Common Test Pitfalls

### ❌ Don't Do This

```typescript
// BAD: Testing implementation details
expect(element.style.transform).toBe('translateX(100px)');

// BAD: Testing internal state
expect(componentInstance.state.isOpen).toBe(true);

// BAD: Relying on setTimeout without fake timers
setTimeout(() => {
  expect(screen.getByText('Done')).toBeInTheDocument();
}, 1000);
```

### ✅ Do This Instead

```typescript
// GOOD: Test visible behavior
expect(element).toHaveStyle('transform: translateX(100px)');

// GOOD: Test user-visible outcomes
expect(screen.getByRole('dialog')).toBeVisible();

// GOOD: Use fake timers
vi.useFakeTimers();
vi.advanceTimersByTime(1000);
expect(screen.getByText('Done')).toBeInTheDocument();
```

---

## 11. Test Utilities

```typescript
// packages/ui/src/test-utils/index.ts
export * from '@testing-library/react';
export { userEvent } from '@testing-library/user-event';
export { axe } from 'jest-axe';

// Custom render with providers if needed
export function renderWithProviders(ui: React.ReactElement) {
  return render(ui);
}

// Helper for animation completion
export async function waitForAnimation() {
  vi.advanceTimersByTime(1000);
  await new Promise(resolve => setTimeout(resolve, 0));
}
```

---

## 12. Test Naming Conventions

```
describe('[ComponentName]', () => {
  it('renders [element] with [condition]', () => { ... });
  it('applies [prop] when [condition]', () => { ... });
  it('calls [callback] when [event]', () => { ... });
  it('respects [accessibility feature]', () => { ... });
  it('cleans up [resource] on unmount', () => { ... });
});
```

---

*Version: 1.0.0 | For Frontend UI Component Library*
