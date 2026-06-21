import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SpotlightCard } from './spotlight-card';

describe('SpotlightCard', () => {
  it('renders children content', () => {
    render(<SpotlightCard><span>Test Content</span></SpotlightCard>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
