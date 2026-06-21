import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScrollReveal } from './scroll-reveal';

describe('ScrollReveal', () => {
  it('renders children content', () => {
    render(
      <ScrollReveal>
        <span>Revealed Content</span>
      </ScrollReveal>
    );
    expect(screen.getByText('Revealed Content')).toBeInTheDocument();
  });

  it('accepts direction prop', () => {
    render(
      <ScrollReveal direction="left">
        <span>Slide In</span>
      </ScrollReveal>
    );
    expect(screen.getByText('Slide In')).toBeInTheDocument();
  });

  it('accepts duration and delay props', () => {
    render(
      <ScrollReveal duration={0.8} delay={0.2}>
        <span>Timed</span>
      </ScrollReveal>
    );
    expect(screen.getByText('Timed')).toBeInTheDocument();
  });
});
