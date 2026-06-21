import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GlitchText } from './glitch-text';

describe('GlitchText', () => {
  it('renders the visible text layer', () => {
    render(<GlitchText text="Glitch" />);
    const visible = screen.getByText('Glitch', { selector: '.relative.z-10' });
    expect(visible).toBeInTheDocument();
  });

  it('creates glitch overlay elements', () => {
    const { container } = render(<GlitchText text="Error" />);
    const overlays = container.querySelectorAll('[aria-hidden="true"]');
    expect(overlays.length).toBe(2);
  });

  it('has aria-label for accessibility', () => {
    render(<GlitchText text="Error" />);
    expect(screen.getByLabelText('Error')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<GlitchText text="Test" className="custom-class" />);
    const span = container.firstChild as HTMLElement;
    expect(span.classList.contains('custom-class')).toBe(true);
  });
});
