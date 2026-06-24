import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThreeScene } from './three-scene';

describe('ThreeScene', () => {
  it('renders with children', () => {
    render(<ThreeScene>Content</ThreeScene>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<ThreeScene className="custom-class">Content</ThreeScene>);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
