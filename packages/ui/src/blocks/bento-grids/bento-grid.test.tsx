import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BentoGrid, BentoCard } from './index';

describe('BentoGrid', () => {
  it('renders children', () => {
    render(
      <BentoGrid>
        <BentoCard title="Card 1" description="First card" />
        <BentoCard title="Card 2" description="Second card" />
      </BentoGrid>
    );
    expect(screen.getByText('Card 1')).toBeDefined();
    expect(screen.getByText('Card 2')).toBeDefined();
    expect(screen.getByText('First card')).toBeDefined();
    expect(screen.getByText('Second card')).toBeDefined();
  });

  it('renders wide card', () => {
    render(
      <BentoGrid>
        <BentoCard wide title="Wide Card" />
        <BentoCard title="Normal Card" />
      </BentoGrid>
    );
    expect(screen.getByText('Wide Card')).toBeDefined();
    expect(screen.getByText('Normal Card')).toBeDefined();
  });

  it('renders with different variants', () => {
    render(
      <BentoGrid>
        <BentoCard title="Accent" variant="accent" />
        <BentoCard title="Subtle" variant="subtle" />
      </BentoGrid>
    );
    expect(screen.getByText('Accent')).toBeDefined();
    expect(screen.getByText('Subtle')).toBeDefined();
  });
});
