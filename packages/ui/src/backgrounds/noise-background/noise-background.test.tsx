import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { NoiseBackground } from './noise-background';

describe('NoiseBackground', () => {
  it('renders canvas element', () => {
    const { container } = render(<NoiseBackground />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<NoiseBackground className="custom-noise" />);
    expect(container.firstChild).toHaveClass('custom-noise');
  });

  it('renders without animation', () => {
    const { container } = render(<NoiseBackground animated={false} />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });
});
