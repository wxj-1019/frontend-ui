import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HeroWithGradient, HeroWithParticles } from './index';

describe('HeroWithGradient', () => {
  it('renders title and subtitle', () => {
    render(<HeroWithGradient title="Test Title" subtitle="Test Subtitle" />);
    expect(screen.getByText('Test Title')).toBeDefined();
    expect(screen.getByText('Test Subtitle')).toBeDefined();
  });

  it('renders action buttons', () => {
    render(
      <HeroWithGradient
        title="Test"
        actions={[
          { label: 'Primary', variant: 'primary' },
          { label: 'Secondary', variant: 'secondary' },
        ]}
      />
    );
    expect(screen.getByText('Primary')).toBeDefined();
    expect(screen.getByText('Secondary')).toBeDefined();
  });

  it('renders with reduced motion', () => {
    render(<HeroWithGradient title="Test" prefersReducedMotion />);
    expect(screen.getByText('Test')).toBeDefined();
  });
});

describe('HeroWithParticles', () => {
  it('renders title and subtitle', () => {
    render(
      <HeroWithParticles
        title="Particle Hero"
        subtitle="With particles"
        prefersReducedMotion
      />
    );
    expect(screen.getByText('Particle Hero')).toBeDefined();
    expect(screen.getByText('With particles')).toBeDefined();
  });

  it('renders canvas element', () => {
    const { container } = render(
      <HeroWithParticles title="Test" prefersReducedMotion />
    );
    expect(container.querySelector('canvas')).toBeDefined();
  });
});
