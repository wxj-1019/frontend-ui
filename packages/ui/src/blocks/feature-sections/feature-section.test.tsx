import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FeatureSection } from './index';

const mockFeatures = [
  { title: 'Feature A', description: 'Description A' },
  { title: 'Feature B', description: 'Description B' },
  { title: 'Feature C', description: 'Description C' },
];

describe('FeatureSection', () => {
  it('renders title and subtitle', () => {
    render(
      <FeatureSection
        title="Features"
        subtitle="Our features"
        features={mockFeatures}
        prefersReducedMotion
      />
    );
    expect(screen.getByText('Features')).toBeDefined();
    expect(screen.getByText('Our features')).toBeDefined();
  });

  it('renders all features in center layout', () => {
    render(
      <FeatureSection
        title="Features"
        features={mockFeatures}
        layout="center"
        prefersReducedMotion
      />
    );
    expect(screen.getByText('Feature A')).toBeDefined();
    expect(screen.getByText('Feature B')).toBeDefined();
    expect(screen.getByText('Feature C')).toBeDefined();
  });

  it('renders all features in alternating layout', () => {
    render(
      <FeatureSection
        title="Features"
        features={mockFeatures}
        layout="alternating"
        prefersReducedMotion
      />
    );
    expect(screen.getByText('Feature A')).toBeDefined();
    expect(screen.getByText('Feature B')).toBeDefined();
    expect(screen.getByText('Feature C')).toBeDefined();
  });

  it('renders feature descriptions', () => {
    render(
      <FeatureSection
        title="Features"
        features={mockFeatures}
        prefersReducedMotion
      />
    );
    expect(screen.getByText('Description A')).toBeDefined();
    expect(screen.getByText('Description B')).toBeDefined();
    expect(screen.getByText('Description C')).toBeDefined();
  });
});
