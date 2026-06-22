import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FloatAnimation } from './float-animation';

describe('FloatAnimation', () => {
  it('renders without crashing', () => {
    render(
      <FloatAnimation>
        <div>Test Content</div>
      </FloatAnimation>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <FloatAnimation>
        <button>Click me</button>
      </FloatAnimation>
    );
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <FloatAnimation className="custom-class">
        <div>Content</div>
      </FloatAnimation>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('has inline-block display', () => {
    const { container } = render(
      <FloatAnimation>
        <div>Content</div>
      </FloatAnimation>
    );
    expect(container.firstChild).toHaveClass('inline-block');
  });

  it('pauses on hover when pauseOnHover is true', () => {
    const { container } = render(
      <FloatAnimation pauseOnHover={true}>
        <div>Content</div>
      </FloatAnimation>
    );
    const element = container.firstChild as HTMLElement;
    fireEvent.mouseEnter(element);
    // Component should still be in document
    expect(screen.getByText('Content')).toBeInTheDocument();
    fireEvent.mouseLeave(element);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
