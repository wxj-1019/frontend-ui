import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Starfield } from './starfield';

describe('Starfield', () => {
  it('renders canvas element', () => {
    const { container } = render(<Starfield />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Starfield className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
