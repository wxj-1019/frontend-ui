import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BlobCursor } from './blob-cursor';

describe('BlobCursor', () => {
  it('renders without crashing', () => {
    render(
      <BlobCursor>
        <div>Test Content</div>
      </BlobCursor>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <BlobCursor>
        <button>Click me</button>
      </BlobCursor>
    );
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <BlobCursor className="custom-class">
        <div>Content</div>
      </BlobCursor>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('hides cursor when hideCursor is true', () => {
    const { container } = render(
      <BlobCursor hideCursor={true}>
        <div>Content</div>
      </BlobCursor>
    );
    expect(container.firstChild).toHaveClass('cursor-none');
  });

  it('shows cursor when hideCursor is false', () => {
    const { container } = render(
      <BlobCursor hideCursor={false}>
        <div>Content</div>
      </BlobCursor>
    );
    expect(container.firstChild).toHaveClass('cursor-default');
  });

  it('has presentation role', () => {
    render(
      <BlobCursor>
        <div>Content</div>
      </BlobCursor>
    );
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  it('has aria-hidden on blob element', () => {
    const { container } = render(
      <BlobCursor>
        <div>Content</div>
      </BlobCursor>
    );
    const blob = container.querySelector('[aria-hidden="true"]');
    expect(blob).toBeInTheDocument();
  });
});
