import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Hyperspeed } from './hyperspeed';

describe('Hyperspeed', () => {
  it('renders canvas element', () => {
    const { container } = render(<Hyperspeed />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Hyperspeed className="warp-bg" />);
    expect(container.firstChild).toHaveClass('warp-bg');
  });

  it('accepts custom props', () => {
    const { container } = render(
      <Hyperspeed speed={5} count={50} color="#ff00ff" trailLength={0.3} />
    );
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });
});
