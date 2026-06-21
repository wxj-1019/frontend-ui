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
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Our features')).toBeInTheDocument();
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
    expect(screen.getByText('Feature A')).toBeInTheDocument();
    expect(screen.getByText('Feature B')).toBeInTheDocument();
    expect(screen.getByText('Feature C')).toBeInTheDocument();
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
    expect(screen.getByText('Feature A')).toBeInTheDocument();
    expect(screen.getByText('Feature B')).toBeInTheDocument();
    expect(screen.getByText('Feature C')).toBeInTheDocument();
  });

  it('renders feature descriptions', () => {
    render(
      <FeatureSection
        title="Features"
        features={mockFeatures}
        prefersReducedMotion
      />
    );
    expect(screen.getByText('Description A')).toBeInTheDocument();
    expect(screen.getByText('Description B')).toBeInTheDocument();
    expect(screen.getByText('Description C')).toBeInTheDocument();
  });
});
