import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ClickSpark } from './click-spark';

describe('ClickSpark', () => {
  it('renders children content', () => {
    render(
      <ClickSpark>
        <span>Click Me</span>
      </ClickSpark>
    );
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ClickSpark className="custom-wrapper">Content</ClickSpark>
    );
    expect(container.firstChild).toHaveClass('custom-wrapper');
  });

  it('renders with custom particleCount', () => {
    render(<ClickSpark particleCount={50}>More Particles</ClickSpark>);
    expect(screen.getByText('More Particles')).toBeInTheDocument();
  });

  it('renders with custom colors', () => {
    render(
      <ClickSpark colors={['#ff0000', '#00ff00', '#0000ff']}>
        Custom Colors
      </ClickSpark>
    );
    expect(screen.getByText('Custom Colors')).toBeInTheDocument();
  });

  it('has canvas element', () => {
    const { container } = render(<ClickSpark>Has Canvas</ClickSpark>);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });
});
