import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CrosshairCursor } from './crosshair-cursor';

describe('CrosshairCursor', () => {
  it('renders without crashing', () => {
    render(
      <CrosshairCursor>
        <div>Test Content</div>
      </CrosshairCursor>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <CrosshairCursor>
        <button>Click me</button>
      </CrosshairCursor>
    );
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <CrosshairCursor className="custom-class">
        <div>Content</div>
      </CrosshairCursor>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('has cursor-none class', () => {
    const { container } = render(
      <CrosshairCursor>
        <div>Content</div>
      </CrosshairCursor>
    );
    expect(container.firstChild).toHaveClass('cursor-none');
  });

  it('has presentation role', () => {
    render(
      <CrosshairCursor>
        <div>Content</div>
      </CrosshairCursor>
    );
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  it('has aria-hidden on crosshair elements', () => {
    const { container } = render(
      <CrosshairCursor>
        <div>Content</div>
      </CrosshairCursor>
    );
    const hiddenElements = container.querySelectorAll('[aria-hidden="true"]');
    expect(hiddenElements.length).toBeGreaterThanOrEqual(1);
  });

  it('shows center dot by default', () => {
    const { container } = render(
      <CrosshairCursor>
        <div>Content</div>
      </CrosshairCursor>
    );
    // Center dot should have rounded-full class
    const centerDot = container.querySelector('.rounded-full');
    expect(centerDot).toBeInTheDocument();
  });

  it('hides center dot when showCenter is false', () => {
    const { container } = render(
      <CrosshairCursor showCenter={false}>
        <div>Content</div>
      </CrosshairCursor>
    );
    const centerDot = container.querySelector('.rounded-full');
    expect(centerDot).not.toBeInTheDocument();
  });
});
