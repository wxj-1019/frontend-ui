import { render, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Typewriter } from './typewriter';

describe('Typewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders with cursor by default', () => {
    const { container } = render(<Typewriter text="Hello" />);
    const cursor = container.querySelector('[aria-hidden="true"]');
    expect(cursor).toBeInTheDocument();
  });

  it('hides cursor when cursor prop is false', () => {
    const { container } = render(<Typewriter text="Test" cursor={false} />);
    const cursor = container.querySelector('[aria-hidden="true"]');
    expect(cursor).not.toBeInTheDocument();
  });

  it('starts typing after delay', async () => {
    const { container } = render(<Typewriter text="A" delay={100} speed={50} />);
    const span = container.querySelector('.inline');
    
    await act(async () => {
      vi.advanceTimersByTime(50);
    });
    expect(span?.textContent).toBe('');

    await act(async () => {
      vi.advanceTimersByTime(100);
    });
    expect(span?.textContent).toBe('A');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Typewriter text="Test" className="text-xl font-bold" />
    );
    const span = container.querySelector('.inline');
    expect(span?.className).toContain('text-xl');
    expect(span?.className).toContain('font-bold');
  });
});
