import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Parallax } from './parallax';

describe('Parallax', () => {
  it('renders children content', () => {
    render(
      <Parallax speed={0.5}>
        <div>Parallax Content</div>
      </Parallax>
    );
    expect(screen.getByText('Parallax Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Parallax className="custom-class">
        <div>Content</div>
      </Parallax>
    );
    const root = container.firstChild as HTMLElement;
    expect(root.classList.contains('custom-class')).toBe(true);
  });

  it('accepts different axis prop', () => {
    render(
      <Parallax axis="x" speed={0.3}>
        <span>Horizontal</span>
      </Parallax>
    );
    expect(screen.getByText('Horizontal')).toBeInTheDocument();
  });
});
