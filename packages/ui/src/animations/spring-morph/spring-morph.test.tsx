import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SpringMorph } from './spring-morph';

describe('SpringMorph', () => {
  it('renders children', () => {
    render(<SpringMorph morphKey="a"><div>Content</div></SpringMorph>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(
      <SpringMorph morphKey="a" className="custom">
        <div>X</div>
      </SpringMorph>
    );
    expect(container.firstChild).toHaveClass('custom');
  });
});
