import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Particles } from './particles';

describe('Particles', () => {
  it('renders canvas element', () => {
    const { container } = render(<Particles />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });
});
