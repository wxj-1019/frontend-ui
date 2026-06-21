import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TextReveal } from './text-reveal';

describe('TextReveal', () => {
  it('renders without crashing', () => {
    const { container } = render(<TextReveal text="Hello World" />);
    expect(container).toBeTruthy();
  });

  it('accepts mode and stagger props', () => {
    const { container } = render(
      <TextReveal text="Word Mode" mode="words" stagger={0.1} />
    );
    expect(container).toBeTruthy();
  });

  it('accepts custom from values', () => {
    const { container } = render(
      <TextReveal text="Custom" from={{ y: 50, opacity: 0 }} />
    );
    expect(container).toBeTruthy();
  });
});
