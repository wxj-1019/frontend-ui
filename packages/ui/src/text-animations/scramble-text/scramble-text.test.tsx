import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ScrambleText } from './scramble-text';

describe('ScrambleText', () => {
  it('renders text correctly', () => {
    render(<ScrambleText text="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ScrambleText text="Test" className="text-xl font-bold" />
    );
    const span = container.querySelector('.inline');
    expect(span?.className).toContain('text-xl');
    expect(span?.className).toContain('font-bold');
  });

  it('renders with custom chars', () => {
    const { container } = render(
      <ScrambleText text="Test" chars="ABC" />
    );
    const span = container.querySelector('.inline');
    expect(span).toBeInTheDocument();
  });
});
