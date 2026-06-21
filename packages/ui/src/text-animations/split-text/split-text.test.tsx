import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SplitText } from './split-text';

describe('SplitText', () => {
  it('renders all characters', () => {
    const { container } = render(<SplitText text="Hello" />);
    expect(container.textContent).toBe('Hello');
  });

  it('renders motion spans for each character', () => {
    const { container } = render(<SplitText text="ABC" />);
    const motionSpans = container.querySelectorAll('span > span');
    expect(motionSpans.length).toBe(3);
  });

  it('renders words separately when splitBy is words', () => {
    const { container } = render(<SplitText text="Hello World" splitBy="words" />);
    expect(container.textContent).toBe('Hello\u00A0World');
  });
});
