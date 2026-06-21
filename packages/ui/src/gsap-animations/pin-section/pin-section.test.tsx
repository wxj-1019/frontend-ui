import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PinSection } from './pin-section';

describe('PinSection', () => {
  it('renders children content', () => {
    render(
      <PinSection>
        <div>Pinned Content</div>
      </PinSection>
    );
    expect(screen.getByText('Pinned Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <PinSection className="custom-class">
        <div>Content</div>
      </PinSection>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('custom-class');
  });
});
