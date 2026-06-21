import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScrollProgress } from './scroll-progress';

describe('ScrollProgress', () => {
  it('renders a progressbar element', () => {
    render(<ScrollProgress />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('applies height and position', () => {
    const { container } = render(<ScrollProgress height={6} position="bottom" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.height).toBe('6px');
    expect(wrapper.className).toContain('bottom-0');
  });

  it('uses provided color', () => {
    const { container } = render(<ScrollProgress color="#ff0000" />);
    const root = container.firstChild as HTMLElement;
    const bar = root.firstChild as HTMLElement;
    expect(bar.style.background).toMatch(/#ff0000|rgb\(255,\s*0,\s*0\)/);
  });
});
