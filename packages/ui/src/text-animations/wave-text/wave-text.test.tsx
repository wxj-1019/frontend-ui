import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { WaveText } from './wave-text';

describe('WaveText', () => {
  it('renders text correctly', () => {
    const { container } = render(<WaveText text="Hello" />);
    const spans = container.querySelectorAll('.inline-block');
    expect(spans.length).toBe(5);
  });

  it('applies custom className', () => {
    const { container } = render(
      <WaveText text="Test" className="text-xl font-bold" />
    );
    const span = container.querySelector('.inline');
    expect(span?.className).toContain('text-xl');
    expect(span?.className).toContain('font-bold');
  });

  it('renders each character in a span', () => {
    const { container } = render(<WaveText text="Hi" />);
    const spans = container.querySelectorAll('.inline-block');
    expect(spans.length).toBe(2);
  });
});
