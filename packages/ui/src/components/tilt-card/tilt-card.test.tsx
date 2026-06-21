import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TiltCard } from './tilt-card';

describe('TiltCard', () => {
  it('renders children content', () => {
    render(
      <TiltCard>
        <span>Card Content</span>
      </TiltCard>
    );
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <TiltCard className="custom-class">Content</TiltCard>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('accepts custom tiltDegree', () => {
    render(<TiltCard tiltDegree={20}>Content</TiltCard>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders with glare disabled', () => {
    render(<TiltCard glare={false}>No Glare</TiltCard>);
    expect(screen.getByText('No Glare')).toBeInTheDocument();
  });
});
