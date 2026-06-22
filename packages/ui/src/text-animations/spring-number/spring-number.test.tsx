import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SpringNumber } from './spring-number';

describe('SpringNumber', () => {
  it('renders with value', () => {
    const { container } = render(<SpringNumber value={42} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with prefix and suffix starting from target', () => {
    render(<SpringNumber value={99} from={99} prefix="$" suffix=".00" />);
    expect(screen.getByText('$99.00')).toBeInTheDocument();
  });

  it('respects precision prop starting from target', () => {
    render(<SpringNumber value={3.14} from={3.14} precision={2} />);
    expect(screen.getByText('3.14')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<SpringNumber value={10} className="text-lg" />);
    expect(container.firstChild).toHaveClass('text-lg');
  });

  it('uses custom format function starting from target', () => {
    render(
      <SpringNumber
        value={1000}
        from={1000}
        format={(v) => `${v.toFixed(0)} users`}
      />
    );
    expect(screen.getByText('1000 users')).toBeInTheDocument();
  });
});
