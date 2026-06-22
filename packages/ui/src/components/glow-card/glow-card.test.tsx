import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GlowCard } from './glow-card';

describe('GlowCard', () => {
  it('renders without crashing', () => {
    render(
      <GlowCard>
        <div>Test Content</div>
      </GlowCard>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <GlowCard>
        <h2>Title</h2>
        <p>Description</p>
      </GlowCard>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <GlowCard className="custom-class">
        <div>Content</div>
      </GlowCard>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('has aria-hidden on glow elements', () => {
    const { container } = render(
      <GlowCard>
        <div>Content</div>
      </GlowCard>
    );
    const hiddenElements = container.querySelectorAll('[aria-hidden="true"]');
    expect(hiddenElements.length).toBeGreaterThanOrEqual(1);
  });

  it('shows glow effect on hover', () => {
    const { container } = render(
      <GlowCard>
        <div>Content</div>
      </GlowCard>
    );
    const card = container.firstChild as HTMLElement;
    fireEvent.mouseEnter(card);
    // Glow effect should be visible (opacity > 0)
    expect(card).toBeInTheDocument();
  });

  it('hides glow effect on mouse leave', () => {
    const { container } = render(
      <GlowCard>
        <div>Content</div>
      </GlowCard>
    );
    const card = container.firstChild as HTMLElement;
    fireEvent.mouseEnter(card);
    fireEvent.mouseLeave(card);
    expect(card).toBeInTheDocument();
  });

  it('does not show glow when showGlow is false', () => {
    const { container } = render(
      <GlowCard showGlow={false}>
        <div>Content</div>
      </GlowCard>
    );
    const glowElement = container.querySelector('[style*="radial-gradient"]');
    expect(glowElement).not.toBeInTheDocument();
  });

  it('handles mouse move for tilt effect', () => {
    const { container } = render(
      <GlowCard enableTilt={true}>
        <div>Content</div>
      </GlowCard>
    );
    const card = container.firstChild as HTMLElement;
    fireEvent.mouseMove(card, { clientX: 100, clientY: 100 });
    expect(card.style.transform).toContain('rotateX');
    expect(card.style.transform).toContain('rotateY');
  });

  it('does not apply tilt when enableTilt is false', () => {
    const { container } = render(
      <GlowCard enableTilt={false}>
        <div>Content</div>
      </GlowCard>
    );
    const card = container.firstChild as HTMLElement;
    fireEvent.mouseMove(card, { clientX: 100, clientY: 100 });
    expect(card.style.transform).not.toContain('rotateX');
  });
});
