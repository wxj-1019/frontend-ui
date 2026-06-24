import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { HighPerfParticles } from './high-perf-particles';

describe('HighPerfParticles', () => {
  it('renders canvas element', () => {
    const { container } = render(<HighPerfParticles className="h-64 w-96" />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<HighPerfParticles className="custom-class" />);
    expect(container.querySelector('canvas')).toHaveClass('custom-class');
  });
});
