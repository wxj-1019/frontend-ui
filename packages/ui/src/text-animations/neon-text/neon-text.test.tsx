import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NeonText } from './neon-text';
import { expectNoA11yViolations } from '../../test-utils/axe';

describe('NeonText', () => {
  it('renders text content', () => {
    render(<NeonText text="Hello Neon" />);
    expect(screen.getByText('Hello Neon')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<NeonText text="Accessible Neon" />);
    await expectNoA11yViolations(container);
  });

  it('applies custom className', () => {
    const { container } = render(
      <NeonText text="Styled" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders with flicker disabled', () => {
    const { container } = render(
      <NeonText text="No Flicker" flicker={false} />
    );
    expect(container.firstChild).not.toHaveClass('animate-neon-flicker');
  });

  it('supports different render tags', () => {
    const { container } = render(<NeonText text="Heading" as="h1" />);
    expect(container.querySelector('h1')).toBeInTheDocument();
  });

  it('has aria-label for screen readers', () => {
    render(<NeonText text="Accessible" />);
    expect(screen.getByLabelText('Accessible')).toBeInTheDocument();
  });
});
