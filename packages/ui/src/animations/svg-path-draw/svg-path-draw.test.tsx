import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SvgPathDraw } from './svg-path-draw';

describe('SvgPathDraw', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <SvgPathDraw path="M10 10 H 190 V 190 H 10 Z" />
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('path')).toBeInTheDocument();
  });

  it('accepts custom className', () => {
    const { container } = render(
      <SvgPathDraw path="M10 10 H 190 V 190 H 10 Z" className="custom-svg" />
    );
    expect(container.querySelector('svg')).toHaveClass('custom-svg');
  });

  it('renders with different stroke widths', () => {
    const { container } = render(
      <SvgPathDraw path="M10 10 H 190 V 190 H 10 Z" strokeWidth={4} />
    );
    expect(container.querySelector('path')).toHaveAttribute('stroke-width', '4');
  });
});
