import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GlassModal } from './glass-modal';

describe('GlassModal', () => {
  it('renders when open', () => {
    render(
      <GlassModal isOpen onClose={() => {}}>
        Modal Content
      </GlassModal>
    );
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    const { container } = render(
      <GlassModal isOpen={false} onClose={() => {}}>
        Modal Content
      </GlassModal>
    );
    expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();
  });
});
