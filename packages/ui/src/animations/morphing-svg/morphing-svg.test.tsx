import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MorphingSVG } from './morphing-svg';

const paths = [
  "M100 20 A80 80 0 1 0 100 180 A80 80 0 1 0 100 20",
  "M100 10 L120 70 L180 70 L130 110 L150 170 L100 140 L50 170 L70 110 L20 70 L80 70 Z",
];

describe('MorphingSVG', () => {
  it('renders without crashing', () => {
    const { container } = render(<MorphingSVG paths={paths} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('path')).toBeInTheDocument();
  });

  it('renders with single path', () => {
    const { container } = render(<MorphingSVG paths={[paths[0]]} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(
      <MorphingSVG paths={paths} className="custom" />
    );
    expect(container.querySelector('svg')).toHaveClass('custom');
  });

  it('sets initial path d attribute', () => {
    const { container } = render(<MorphingSVG paths={paths} />);
    const path = container.querySelector('path');
    expect(path?.getAttribute('d')).toBe(paths[0]);
  });
});
