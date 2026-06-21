import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CTASection } from './cta-section';

describe('CTASection', () => {
  it('renders title and description', () => {
    render(
      <CTASection
        title="Get Started"
        description="Start building today"
        prefersReducedMotion
      />
    );
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByText('Start building today')).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(
      <CTASection
        title="CTA"
        actions={[
          { label: 'Primary Action', variant: 'primary' },
          { label: 'Secondary', variant: 'secondary' },
        ]}
        prefersReducedMotion
      />
    );
    expect(screen.getByText('Primary Action')).toBeInTheDocument();
    expect(screen.getByText('Secondary')).toBeInTheDocument();
  });

  it('renders with gradient variant', () => {
    render(<CTASection title="Test" variant="gradient" prefersReducedMotion />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('renders with minimal variant', () => {
    render(<CTASection title="Test" variant="minimal" prefersReducedMotion />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('renders with accent variant', () => {
    render(<CTASection title="Test" variant="accent" prefersReducedMotion />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
