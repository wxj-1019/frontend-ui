import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PricingSection } from './pricing-section';

const mockPlans = [
  {
    name: 'Starter',
    price: '$19',
    interval: 'month' as const,
    features: ['Feature 1', 'Feature 2'],
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    price: '$49',
    interval: 'month' as const,
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    cta: 'Go Pro',
    highlighted: true,
  },
];

describe('PricingSection', () => {
  it('renders title and subtitle', () => {
    render(
      <PricingSection
        title="Pricing"
        subtitle="Choose your plan"
        plans={mockPlans}
        prefersReducedMotion
      />
    );
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Choose your plan')).toBeInTheDocument();
  });

  it('renders all plan names', () => {
    render(
      <PricingSection title="Pricing" plans={mockPlans} prefersReducedMotion />
    );
    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
  });

  it('renders plan features', () => {
    render(
      <PricingSection title="Pricing" plans={mockPlans} prefersReducedMotion />
    );
    // "Feature 1" appears in multiple plans, use getAllByText
    expect(screen.getAllByText('Feature 1')).toHaveLength(2);
    // "Feature 3" is unique to Pro plan
    expect(screen.getByText('Feature 3')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(
      <PricingSection title="Pricing" plans={mockPlans} prefersReducedMotion />
    );
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByText('Go Pro')).toBeInTheDocument();
  });

  it('renders plan prices', () => {
    render(
      <PricingSection title="Pricing" plans={mockPlans} prefersReducedMotion />
    );
    expect(screen.getByText('$19')).toBeInTheDocument();
    expect(screen.getByText('$49')).toBeInTheDocument();
  });
});
