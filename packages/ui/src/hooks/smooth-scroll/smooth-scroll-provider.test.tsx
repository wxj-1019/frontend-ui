import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SmoothScrollProvider } from './smooth-scroll-provider';

describe('SmoothScrollProvider', () => {
  it('renders children', () => {
    render(
      <SmoothScrollProvider>
        <div>Scroll Content</div>
      </SmoothScrollProvider>
    );
    expect(screen.getByText('Scroll Content')).toBeInTheDocument();
  });

  it('renders with custom options', () => {
    render(
      <SmoothScrollProvider options={{ lerp: 0.2, duration: 2 }}>
        <div>Custom Scroll</div>
      </SmoothScrollProvider>
    );
    expect(screen.getByText('Custom Scroll')).toBeInTheDocument();
  });
});
