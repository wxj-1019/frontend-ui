import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GlassNavbar } from './glass-navbar';

describe('GlassNavbar', () => {
  it('renders with children', () => {
    render(<GlassNavbar>Nav Content</GlassNavbar>);
    expect(screen.getByText('Nav Content')).toBeInTheDocument();
  });

  it('uses nav element', () => {
    const { container } = render(<GlassNavbar>Content</GlassNavbar>);
    expect(container.querySelector('nav')).toBeInTheDocument();
  });
});
